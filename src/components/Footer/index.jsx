import React from 'react'
import PropTypes from 'prop-types'

import { Box } from 'components/Grid'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chat from '@material-ui/icons/Chat';
import Settings from '@material-ui/icons/Settings';
import BubbleChart from '@material-ui/icons/BubbleChart';
import FindReplace from '@material-ui/icons/FindReplace';
import AppBar from '@material-ui/core/AppBar';
import { navigate } from "gatsby";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
});



export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('discover');

  function handleChange(event, newValue) {
    setValue(newValue);
    switch (newValue) {
      case "discover":
        navigate("/");
        break;
      case "chat":
        navigate("/page-2/");
        break;
      default:
        navigate("/");
        break;
    }
  }

  return (

    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Discover" value="discover" icon={<FindReplace />} />
        <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
        <BottomNavigationAction label="Following" value="following" icon={<BubbleChart />} />
        <BottomNavigationAction label="Folder" value="setting" icon={<Settings />} />
      </BottomNavigation>
    </AppBar>
  );
}