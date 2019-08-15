import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { navigate } from 'gatsby'

export default function CommentItem(item) {
  const { value } = item
  return (
    <>
      <ListItem alignItems="center" button onClick={() => navigate('/chat')}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>I am a most Liked Message. </React.Fragment>}
          secondary={
            <React.Fragment>
              <ListItemIcon>
                <ThumbUp />
              </ListItemIcon>
              {value.key}
              <ListItemIcon>
                <ThumbDown />
              </ListItemIcon>
              {value.key}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}