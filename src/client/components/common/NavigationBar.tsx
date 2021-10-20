import React, {useCallback, FunctionComponent} from 'react';

import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import {SvgIconTypeMap} from '@mui/material/SvgIcon';


import {Page} from './../../types';
import PageHeader from './PageHeader';

import NavItem  from './NavItem';

export const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({
  pageHeader,
  setPage,
  setPageHeader,
}: {
  pageHeader: string,
  setPage: (nextPage: Page) => void,
  setPageHeader: (header: string) => void,
}): JSX.Element {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant='h4' mr={3}>gimbap</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />
        <NavItem title='Metrics' isActive={false} icon={InboxIcon} subLinks={['Clusters Time-Series', 'Routes Time-Series']} />
        <NavItem title='Clusters' isActive={false} icon={InboxIcon} subLinks={['What is this', 'I dont know']} />
        {/* <List>
          {[
            {title:'Clusters', icon:'InboxIcon'},
            {title:'Metrics', icon:'InboxIcon', sublinks:['Clusters Time-Series', 'Routes Time-Series']},
            {title: 'Documentation', icon:'InboxIcon', sublinks: ['Introduction', 'Installation', 'Getting Started', 'Clusters', 'NPM Package', 'FAQs']}
          ].map(({title, subLinks}) => (
            <ListItem button key={title}>
              <ListItemText primary={title} />
            </ListItem>

          ))}

        </List> */}
      </Drawer>

      <PageHeader
        open = {open}
        header = {pageHeader}
        handleDrawerOpen = {handleDrawerOpen}
      />

    </Box>
  );
}
