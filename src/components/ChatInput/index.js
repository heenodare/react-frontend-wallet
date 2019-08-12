import React from 'react'
import { Button, Input } from 'react-chat-elements'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 100,
  },
})

function ChatInput() {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Input
        className={classes.appBar}
        placeholder="Type here..."
        multiline
        rightButtons={
          <Button color="white" backgroundColor="black" text="Send" />
        }
      />
    </AppBar>
  )
}

export default ChatInput
