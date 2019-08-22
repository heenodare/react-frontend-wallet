import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { navigate } from 'gatsby'

export default function CommentItem(item) {
  const { message, title, upvotes, downvotes, avatarUrl } = item.item
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
          <Avatar src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>{message} </React.Fragment>}
          secondary={
            <>
              {'From Chat - '}
              {title}
            </>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ThumbUp />
        </ListItemIcon>
        {upvotes}
        <ListItemIcon>
          <ThumbDown />
        </ListItemIcon>
        {downvotes}
      </ListItem>
    </ListItem>
  )
}
