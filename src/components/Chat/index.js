import React from 'react'
import { MessageList, Button, Input } from 'react-chat-elements'
import AppBar from '@material-ui/core/AppBar'
import 'react-chat-elements/dist/main.css'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 55,
  },
})
export default function AlignItemsList() {
  const classes = useStyles()
  return (
    <>
      <MessageList
        className="message-list"
        lockable
        toBottomHeight="100%"
        dataSource={[
          {
            position: 'right',
            type: 'text',
            text: 'How is BTC right now?',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: 'very good!',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text:
              'Do you want a rating system that fully owned by the community?',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
        ]}
      />
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
    </>
  )
}
