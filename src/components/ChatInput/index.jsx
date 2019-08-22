import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SendIcon from '@material-ui/icons/Send'

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

  return (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
      <Paper square className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
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
  )
}

export default ChatInput
