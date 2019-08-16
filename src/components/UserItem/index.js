import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { navigate } from 'gatsby'

export default function UserItem(item) {
  const { userName, followers, mostActive, lastJoined, avatarUrl } = item.item

  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        onClick={() =>
          navigate('/profile', {
            state: item.item,
          })
        }
      >
        <ListItemAvatar>
          <Avatar src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={userName}
          secondary={
            <React.Fragment>
              {followers} {'followers'}
              <br />
              {'Most Active Group - '} {mostActive}
              <br />
              {'Last Joined Chat - '} {lastJoined}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
