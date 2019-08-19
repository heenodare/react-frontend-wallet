import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Comment from '@material-ui/icons/Comment'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { navigate } from 'gatsby'

export default function ChatItem(item) {
  const {
    title,
    lastMessage,
    upvotes,
    downvotes,
    comments,
    avatarUrl,
  } = item.item
  return (
    <ListItem
      style={{ flexDirection: 'column' }}
      alignItems="center"
      button
      divider
      onClick={() => navigate('/chat')}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="avator" src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>{title}</React.Fragment>}
          secondary={<>{lastMessage}</>}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ThumbUp />
          {upvotes}
        </ListItemIcon>

        <ListItemIcon>
          <ThumbDown />
          {downvotes}
        </ListItemIcon>

        <ListItemIcon>
          <Comment />
          {comments}
        </ListItemIcon>
      </ListItem>
    </ListItem>
  )
}
