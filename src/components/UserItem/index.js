import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

export default function UserItem(item) {
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
          primary="User Name"
          secondary={
            <React.Fragment>
              {value.key} {'followers'}
              <br />
              {'Most Active Group - ADA '}
              <br />
              {'Last Joined CHat - BTC'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
