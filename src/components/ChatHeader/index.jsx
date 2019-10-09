import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import MoreIcon from '@material-ui/icons/MoreVert'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    CurrentChat: state.chatData.CurrentChat,
  }
}

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    fontSize: 17,
  },
}))

ChatHeader.propTypes = {
  CurrentChat: PropTypes.object.isRequired,
}

function ChatHeader(props) {
  const { CurrentChat } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate('/branches')
          handleMenuClose()
        }}
      >
        Branches
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>Filter</MenuItem> */}
    </Menu>
  )

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="go back"
            onClick={() => window.history.back()}
          >
            <ArrowBack />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {CurrentChat.title}
          </Typography>
          <div className={classes.grow} />
          <IconButton
            edge="end"
            aria-label="more"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  )
}

export default connect(mapStateToProps)(ChatHeader)
