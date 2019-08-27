import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SendIcon from '@material-ui/icons/Send'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})

function ChatInput() {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  function handleInputMenuOpen(event) {
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
      <MenuItem onClick={handleMenuClose}>Image</MenuItem>
      <MenuItem onClick={handleMenuClose}>Video</MenuItem>
      <MenuItem onClick={handleMenuClose}>Audio</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="sticky" color="primary" className={classes.appBar}>
        <Paper square className={classes.root}>
          <IconButton
            className={classes.iconButton}
            aria-label="menu"
            onClick={handleInputMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Your Message Here..."
            inputProps={{ 'aria-label': 'Message Input' }}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="send"
            style={{ marginLeft: 'auto' }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </AppBar>
      {renderMenu}
    </>
  )
}

export default ChatInput
