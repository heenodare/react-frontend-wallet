import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
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
    <>
      <ListItem alignItems="center" button onClick={() => navigate('/chat')}>
        <ListItemAvatar>
          <Avatar alt="avator" src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>{title}</React.Fragment>}
          secondary={
            <>
              {lastMessage}
              <br />
              <ListItemIcon>
                <ThumbUp />
              </ListItemIcon>
              {upvotes}
              <ListItemIcon>
                <ThumbDown />
              </ListItemIcon>
              {downvotes}
              <ListItemIcon>
                <Comment />
              </ListItemIcon>
              {comments}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
