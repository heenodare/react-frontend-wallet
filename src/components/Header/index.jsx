import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SearchIcon from '@material-ui/icons/Search'
import { navigate } from 'gatsby'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose(dest) {
    setAnchorEl(null)
    switch (dest) {
      case 'profile':
        navigate('/profile')
        break
      default:
        break
    }
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('profile')}>Profile</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Avatar
            style={{ marginRight: 10 }}
            src="https://avatars3.githubusercontent.com/u/53857129?s=400&u=9d891a2c20c247d98b5d9c391f5e0f9ca4f52184&v=4"
          />
          <div className={classes.grow} />
          <IconButton
            edge="start"
            aria-label="search"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={()=>{navigate('/search')}}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            onClick={()=>{navigate('/profile')}}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  )
}
