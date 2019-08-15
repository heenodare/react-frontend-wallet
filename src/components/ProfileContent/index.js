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
            <ListItemText
              id="switch-list-label-darkMode"
              primary="User Name Here"
            />
          </ListItem>
          <Avatar
            alt="Remy Sharp"
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
            primary="It is my personal Bio"
          />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader>Most Liked Comment</ListSubheader>}
        className={classes.root}
      >
        <CommentItem key={1} value={{ key: 1 }} />
      </List>
    </>
  )
}
