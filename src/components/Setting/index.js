import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import WbSunny from '@material-ui/icons/WbSunny'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function SwitchListSecondary() {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  function handleClick() {
    setOpen(!open)
  }

  return (
    <Container maxWidth="md">
      <List
        subheader={<ListSubheader>Settings</ListSubheader>}
        className={classes.root}
      >
        <ListItem>
          <ListItemIcon>
            <WbSunny />
          </ListItemIcon>
          <ListItemText id="switch-list-label-darkMode" primary="DarkMode" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('darkMode')}
              checked={checked.indexOf('darkMode') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-darkMode' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Language" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="English" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="中文" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="German" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader>General</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemText primary="Version" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Container>
  )
}
