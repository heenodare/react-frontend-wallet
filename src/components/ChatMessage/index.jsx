import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Divider from '@material-ui/core/Divider'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

Message.propTypes = {
  timeStamp: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  data: PropTypes.string,
  ReplyTo: PropTypes.number.isRequired,
  isSigned: PropTypes.bool.isRequired,
  isOnChain: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
}

Message.defaultProps = {
  data: 'no data',
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.primary,
  },
}))

export default function Message(props) {
  const {
    type,
    timeStamp,
    message,
    address,
    tags,
    data,
    ReplyTo,
    isOnChain,
    isSigned,
    position,
  } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const timeDifference = time => {
    const sPerMinute = 60
    const sPerHour = sPerMinute * 60
    const sPerDay = sPerHour * 24
    const now = Math.trunc(Date.now() / 1000)
    const elapsed = now - time
    if (elapsed < sPerMinute) {
      return `${Math.round(elapsed)} seconds ago`
    }
    if (elapsed < sPerHour) {
      return `${Math.round(elapsed / sPerMinute)} minutes ago`
    }
    if (elapsed < sPerDay) {
      return `${Math.round(elapsed / sPerHour)} hours ago`
    }
    return new Date(time * 1000).toLocaleDateString()
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen)
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function PoperMenu() {
    return (
      <Popper open={open} anchorEl={anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem onClick={handleClose}>Reply</MenuItem>
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Forward</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>Join Chat</MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ThumbUp />
                    Like
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ThumbDown />
                    Dislike
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    )
  }

  switch (type) {
    case 'text':
      return (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div
              style={{ float: position, maxWidth: '70%', maxHeight: '10%' }}
              role="presentation"
              onClick={handleToggle}
              onKeyPress={() => {}}
              ref={anchorRef}
            >
              <Paper className={classes.paper}>
                <Typography
                  variant="body2"
                  display="inline"
                  style={{ paddingRight: 10 }}
                >
                  {message}
                </Typography>
                <Typography
                  variant="caption"
                  display="inline"
                  gutterBottom
                  align="right"
                  style={{ fontSize: 10, color: 'grey' }}
                >
                  {timeDifference(timeStamp)}
                </Typography>
              </Paper>
            </div>
          </Grid>
          {PoperMenu()}
        </Grid>
      )
    case 'image':
      return (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div
              style={{ float: position, maxWidth: '70%', maxHeight: '10%' }}
              role="presentation"
              onClick={handleToggle}
              onKeyPress={() => {}}
              ref={anchorRef}
            >
              <Paper className={classes.paper}>
                <img src={data} alt={message} style={{ maxHeight: 150 }} />
                <Divider />
                <Typography
                  variant="body2"
                  display="inline"
                  style={{ paddingRight: 10 }}
                >
                  {message}
                </Typography>
                <Typography
                  variant="caption"
                  display="inline"
                  gutterBottom
                  align="right"
                  style={{ fontSize: 10, color: 'grey' }}
                >
                  {timeDifference(timeStamp)}
                </Typography>
              </Paper>
            </div>
          </Grid>
          {PoperMenu()}
        </Grid>
      )
    case 'youtube':
      return (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div
              style={{ float: position, maxWidth: '70%', maxHeight: '10%' }}
              role="presentation"
              onClick={handleToggle}
              onKeyPress={() => {}}
              ref={anchorRef}
            >
              <Paper className={classes.paper}>
                <iframe title="youtube video" width="100%" src={data} />
                <Divider />
                <Typography
                  variant="body2"
                  display="inline"
                  style={{ paddingRight: 10 }}
                >
                  {message}
                </Typography>
                <Typography
                  variant="caption"
                  display="inline"
                  gutterBottom
                  align="right"
                  style={{ fontSize: 10, color: 'grey' }}
                >
                  {timeDifference(timeStamp)}
                </Typography>
              </Paper>
            </div>
          </Grid>
          {PoperMenu()}
        </Grid>
      )
    default:
      return (
        <>
          {tags}
          {ReplyTo}
          {isOnChain}
          {isSigned}
          {address}
        </>
      )
  }
}