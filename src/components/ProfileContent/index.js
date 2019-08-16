import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import CommentItem from 'components/CommentItem'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  bigAvatar: {
    margin: 10,
    minWidth: 200,
    width: '20%',
    height: '20%',
  },
}))

export default function SwitchListSecondary() {
  const classes = useStyles()
  return (
    <>
      <List className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <ListItem>
            <ListItemText id="switch-list-label-darkMode" primary="LouLouDev" />
          </ListItem>
          <Avatar
            src="https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg"
            className={classes.bigAvatar}
          />
        </Grid>
      </List>

      <Divider />
      <List
        subheader={<ListSubheader>Bio</ListSubheader>}
        className={classes.root}
      >
        <ListItem>
          <ListItemText
            id="switch-list-label-darkMode"
            primary="My mission is to create a transparent, community owned rating system and platform for people to exchange their opinion among everything."
          />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader>Most Liked Comment</ListSubheader>}
        className={classes.root}
      >
        <CommentItem
          key={1}
          item={{
            key: 1,
            message: " Why don'y you just buy a lot of ADA?",
            title: 'ADA',
            upvotes: 912351,
            downvotes: 76,
            avatarUrl:
              'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
          }}
        />
      </List>
    </>
  )
}
