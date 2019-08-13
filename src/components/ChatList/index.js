import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Comment from '@material-ui/icons/Comment'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

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

  function ChatItem(item) {
    const { value } = item
    return (
      <>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => console.log('test')}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={<React.Fragment>Chat Title</React.Fragment>}
            secondary={
              <React.Fragment>
                {' I am the lateset message........'}
                <br />
                <ThumbUp />
                {value.key}
                <ThumbDown />
                {value.key}
                <Comment />
                {123}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    )
  }

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
    <List className={classes.root}>
      {ChatList([
        { key: 1 },
        { key: 2 },
        { key: 3 },
        { key: 3 },
        { key: 3 },
        { key: 3 },
        { key: 3 },
        { key: 3 },
        { key: 3 },
        { key: 3 },
      ])}
    </List>
  )
}
