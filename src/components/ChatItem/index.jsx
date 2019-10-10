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


function ChatItem(item) {
  const {
    ID,
    text,
    count,
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
        <ListItemAvatar>
          <Avatar alt="avator" src={"https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg"} />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>{text}</React.Fragment>}
          // secondary={<>{lastMessage}</>}
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
