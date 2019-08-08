import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Chat from '@material-ui/icons/Chat'
import Settings from '@material-ui/icons/Settings'
import BubbleChart from '@material-ui/icons/BubbleChart'
import FindReplace from '@material-ui/icons/FindReplace'
import AppBar from '@material-ui/core/AppBar'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { setCurrentPage } from './action'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
})

LabelBottomNavigation.propTypes = {
  setCurrentPageConnect: PropTypes.func.isRequired,
  CurrentPage: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    CurrentPage: state.footer.CurrentPage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPageConnect: page => {
      dispatch(setCurrentPage(page))
    },
  }
}

function LabelBottomNavigation(props) {
  const classes = useStyles()
  const { CurrentPage, setCurrentPageConnect } = props

  function handleChange(event, newValue) {
    setCurrentPageConnect(newValue)
    switch (newValue) {
      case 'discover':
        navigate('/')
        break
      case 'chat':
        navigate('/page-2/')
        break
      default:
        break
    }
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <BottomNavigation
        value={CurrentPage}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Discover"
          value="discover"
          icon={<FindReplace />}
        />
        <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
        <BottomNavigationAction
          label="Following"
          value="following"
          icon={<BubbleChart />}
        />
        <BottomNavigationAction
          label="Folder"
          value="setting"
          icon={<Settings />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelBottomNavigation)
