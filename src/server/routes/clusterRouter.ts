
import { Router, Request, Response, NextFunction } from 'express';
import { getClusterList, getClusterLoadGraphData, getClusterTreeGraphData } from './../controllers/dataController';

const router = Router();

// To get list of all clusters
router.get('/',
  getClusterList,
  (req: Request, res: Response, next: NextFunction): void => {
    if (!res.locals.cluster) return next({
      status: 500,
      error: 'Middleware getClusterList did not return expected data.'
    });

    res.json(res.locals.cluster);
  }
);

// To get cluster load graph data
router.get('/load/:clusterId',
  getClusterLoadGraphData,
  (req: Request, res: Response, next: NextFunction): void => {
    if (!res.locals.cluster) return next({
      status: 500,
      error: 'Middleware getClusterLoadGraphData did not return expected data.'
    });

    res.json(res.locals.loadGraphData);
  }
);

// To get cluster tree graph data
router.get('/tree/:clusterId',
  getClusterTreeGraphData,
  (req: Request, res: Response, next: NextFunction): void => {
    if (!res.locals.cluster) return next({
      status: 500,
      error: 'Middleware getClusterTreeGraphData did not return expected data.'
    });

    res.json(res.locals.treeGraphData);
  }
);

export default router;
