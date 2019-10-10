import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Comment from '@material-ui/icons/Comment'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { navigate } from '@reach/router'

const timeDifference = time => {
  const sPerMinute = 60
  const sPerHour = sPerMinute * 60
  const sPerDay = sPerHour * 24
  const now = Math.trunc(Date.now() / 1000)
  const elapsed = now - time
  if (elapsed < sPerMinute) {
    return `${Math.round(elapsed)} seconds ago`
  }
  if (elapsed < sPerHour) {
    return `${Math.round(elapsed / sPerMinute)} minutes ago`
  }
  if (elapsed < sPerDay) {
    return `${Math.round(elapsed / sPerHour)} hours ago`
  }
  return new Date(time * 1000).toLocaleDateString()
}

function ChatItem(item) {
  const {
    ID,
    text,
    count,
    time,
    address,
    avatarUrl,
  } = item.item
  return (
    <ListItem
      style={{ flexDirection: 'column' }}
      alignItems="center"
      button
      divider
      onClick={() => {
        navigate('/chat?id='+ID)
      }}
    >
      <ListItem>
        <ListItemText
          primary={<React.Fragment>{"#"+ID+"  "+text}</React.Fragment>}
          secondary={<>
          {address}
          {"     .     "}
          {timeDifference(time)}</>}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ThumbUp />
        </ListItemIcon>
        0
        <ListItemIcon>
          <ThumbDown />
        </ListItemIcon>
        0
        <ListItemIcon>
          <Comment />
        </ListItemIcon>
        {count}
      </ListItem>
    </ListItem>
  )
}

export default ChatItem
