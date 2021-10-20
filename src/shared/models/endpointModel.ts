import mongoose from 'mongoose';

import { Route } from './../../server/utils/endpoints';

// TODO abstract so it can work with either MongoDB or PostgreSQL depending on how setup is called.

export interface Endpoint { method: string, endpoint: string, callTime: number }

export const EndpointModel = mongoose.model<Endpoint>('Endpoint', new mongoose.Schema<Endpoint>({
  method: { type: String, required: true },
  endpoint: { type: String, required: true },
  callTime: { type: Number, required: true }, // unix timestamp
}));
// TODO add validation for call_time to be convertible to Date

/**
 * Log an endpoint request data point to external database.
 *
 * @param {String} method - HTTP method type
 * @param {String} endpoint - HTTP request relative endpoint
 * @param {number} callTime - UNIX timestamp of when request first communicated with the server
 *
 * @public
 */
export async function logEndpoint(method: string, endpoint: string, callTime: number): Promise<void> {
  // TODO validate inputs

  try {
    await EndpointModel.create({
      method,
      endpoint,
      callTime,
    });
  } catch (error) {
    console.error('\n\nERROR LOGGING RESPONSE TO DATABASE');
    console.error(error);
    console.log('\n\n');
  }
}

/**
 * Log an array of endpoint request data point to external database.
 *
 * @param {Endpoint[]} endpoints - Array of endpoints to be added to database.
 *
 * @public
 */
export async function logAllEndpoints(endpoints: Endpoint[]): Promise<void> {
  // TODO validate inputs

  try {
    await EndpointModel.insertMany(endpoints);
  } catch (error) {
    console.error('\n\nERROR LOGGING RESPONSES TO DATABASE - LOG MANY');
    console.error(error);
    console.log('\n\n');
  }
}

/**
 * Get a list of all endpoints. If no method or endpoint is specified, it will return all endpoints in the database.
 *
 * @param {String} method - (optional) HTTP method
 * @param {String} endpoint - (optional) HTTP request relative endpoint
 * @returns Promise of array of endpoints
 *
 * @public
 */
export async function getAllEndpoints(method?: string, endpoint?: string): Promise<Endpoint[]> {
  if (method && endpoint) return await EndpointModel.find({ method, endpoint });
  return await EndpointModel.find({});
}

/**
 * Get a distinct list of endpoints.
 *
 * @returns Promise of array of Route
 *
 * @public
 */
export async function getDistinctEndpoints(): Promise<Route[]> {
  return await EndpointModel.aggregate<Route>([
    // group by key, score to get distinct
    { '$group': { _id: { method: '$method', endpoint: '$endpoint' } } },
    // Clean up the output
    { '$project': { _id: 0, method: '$_id.method', endpoint: '$_id.endpoint' } }
  ]);
}
