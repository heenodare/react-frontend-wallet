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
  const { value } = item
  return (
    <>
      <ListItem alignItems="center" button onClick={() => navigate('/chat')}>
        <ListItemAvatar>
          <Avatar
            alt="avator"
            src="https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>Chat Title</React.Fragment>}
          secondary={
            <React.Fragment>
              {' I am the lateset message........'}
              <br />
              <ListItemIcon>
                <ThumbUp />
              </ListItemIcon>
              {value.key}
              <ListItemIcon>
                <ThumbDown />
              </ListItemIcon>
              {value.key}
              <ListItemIcon>
                <Comment />
              </ListItemIcon>
              {123}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
