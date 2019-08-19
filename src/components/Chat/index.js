import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import ChatContent from 'components/ChatContent'
import UserList from 'components/UserList'
import CommentList from 'components/CommentList'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  yellow: {
    backgroundColor: 'yellow',
    minHeight: 500,
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()
  return (
    <Typography
      className={classes.typo}
      component="span"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function FullWidthTabs() {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  function handleChangeIndex(index) {
    setValue(index)
  }

  return (
    // <div className={classes.root}>
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Disscusion" {...a11yProps(0)} wrapped />
          <Tab label="User" {...a11yProps(1)} wrapped />
          <Tab label="Most Liked" {...a11yProps(2)} wrapped />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        containerStyle={{ height: '100%' }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ChatContent />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UserList />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CommentList />
        </TabPanel>
      </SwipeableViews>
    </>
    // </div>
  )
}
