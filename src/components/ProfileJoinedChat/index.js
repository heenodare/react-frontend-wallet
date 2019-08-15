import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ChatItem from 'components/ChatItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

export default function AlignItemsList() {
  const classes = useStyles()

  function ChatList(items) {
    return (
      <>
        {items.map(item => (
          <ChatItem key={item.key} value={item} />
        ))}
      </>
    )
  }

  return (
    <>
      <List
        subheader={<ListSubheader>Most Active Chat</ListSubheader>}
        className={classes.root}
      >
        <ChatItem key={1} value={{ key: 1 }} />
      </List>
      <Divider />
      <List
        subheader={<ListSubheader>Recent Chat</ListSubheader>}
        className={classes.root}
      >
        <List className={classes.root}>
          {ChatList([
            { key: 1 },
            { key: 2 },
            { key: 3 },
            { key: 4 },
            { key: 5 },
            { key: 6 },
            { key: 7 },
            { key: 73 },
            { key: 8 },
            { key: 9 },
          ])}
        </List>
      </List>
    </>
  )
}
