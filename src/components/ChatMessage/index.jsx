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
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';

Message.propTypes = {
  timeStamp: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  data: PropTypes.string,
  // ReplyTo: PropTypes.number.isRequired,
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
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
}))

export default function Message(props) {
  const {
    ID,
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
  const [downloaded, setDownloaded] = React.useState(false)
  const [downloading, setDownloading] = React.useState(false)
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

  function downloadtorrent() {
    setDownloading(true)
    // console.log("test" + ID);
    var torrentId = data
    //var torrentId = 'magnet:?xt=urn:btih:69aac798fafb9a98be9c621ab04bb59b1366e771&dn=bitcoin-kG--621x414%40LiveMint.jpg&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
    // var torrentId = 'magnet:?xt=urn:btih:eb919f2ec6fc08f9b9aff8e8ea14992d2c85caa5&dn=Screen+Recording+2019-10-11+at+3.18.50+PM.mov&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
    var WebTorrent = require('webtorrent');
    var client = new WebTorrent();

    client.on('error', err => {
      console.log('[+] Webtorrent error: ' + err.message);
    });

    client.add(torrentId, (torrent) => {
      // console.log('Client is downloading:', torrent.infoHash)

      console.log(torrent.files)
      torrent.on('done', () => {
        console.log('Progress: 100%');
      })
      torrent.files.forEach(function (file) {
        // Display the file by appending it to the DOM. Supports video, audio, images, and
        // more. Specify a container element (CSS selector or reference to DOM node).
        setDownloaded(true)
        setDownloading(false)
        file.renderTo("#file" + ID.toString())
        // setFilePath(file.path)
      })
    });
  }
  function downloadbutton() {
    if (!downloaded) {
      if(!downloading){
      return (
        <>
        <IconButton aria-label="download" onClick={downloadtorrent}>
          <GetAppIcon />
        </IconButton>
        </>
      )
      }
      else{
        return(
          <CircularProgress style={{ display: "block"}} color="secondary" />
        )
      }
    }
    else {
      switch (type) {
        case "image":
          return (
            <img id={"file" + ID} alt={"loading"} style={{ maxHeight: 150 }} />
          )
        case "video":
          return (
            <video id={"file" + ID} width="320" height="240" autoPlay></video>
          )
        default:
          return <></>
      }
    }
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
                  {/* <Divider />
                  <MenuItem onClick={handleClose}>Join Chat</MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ThumbUp />
                    Like
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ThumbDown />
                    Dislike
                  </MenuItem> */}
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
              style={{ float: position, minWidth: '100%', maxWidth: '100%', maxHeight: '10%' }}
              role="presentation"
              onClick={handleToggle}
              onKeyPress={() => { }}
              ref={anchorRef}
            >
              <Paper className={classes.paper}>
                <Typography
                  variant="caption"
                  display="inline"
                  align="left"
                  style={{ fontSize: 14 }}
                >
                  {"#" + ID + " " + address}
                </Typography>
                <Typography
                  variant="caption"
                  display="inline"
                  align="left"
                  style={{ fontSize: 10, color: 'grey', paddingLeft: 10 }}
                >
                  {timeDifference(timeStamp)}
                </Typography>
                <Divider/>
                <Typography
                  variant="body2"
                  display="block"
                  style={{ paddingRight: 10 }}
                >
                  {message}
                </Typography>
              </Paper>
            </div>
          </Grid>
          {/* {PoperMenu()} */}
        </Grid>
      )
    case 'image':
      return (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div
              style={{ float: position, minWidth: '100%', maxWidth: '100%', maxHeight: '10%' }}
              role="presentation"
              onClick={handleToggle}
              onKeyPress={() => { }}
              ref={anchorRef}
            >
              <Paper className={classes.paper}>
                <Typography
                  variant="caption"
                  display="inline"
                  align="left"
                  style={{ fontSize: 14 }}
                >
                  {"#" + ID + " " + address}
                </Typography>
                <Typography
                  variant="caption"
                  display="inline"
                  align="left"
                  style={{ fontSize: 10, color: 'grey', paddingLeft: 10 }}
                >
                  {timeDifference(timeStamp)}
                </Typography>
                <Divider />
                {downloadbutton()}
                <Divider />
                <Typography
                  variant="body2"
                  display="block"
                  style={{ paddingRight: 10 }}
                >
                  {message}
                </Typography>
              </Paper>
            </div>
          </Grid>
          {/* {PoperMenu()} */}
        </Grid>
      )
    case "video":
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div
            style={{ float: position, minWidth: '100%', maxWidth: '100%', maxHeight: '10%' }}
            role="presentation"
            onClick={handleToggle}
            onKeyPress={() => { }}
            ref={anchorRef}
          >
            <Paper className={classes.paper}>
              <Typography
                variant="caption"
                display="inline"
                align="left"
                style={{ fontSize: 14 }}
              >
                {"#" + ID + " " + address}
              </Typography>
              <Typography
                variant="caption"
                display="inline"
                align="left"
                style={{ fontSize: 10, color: 'grey', paddingLeft: 10 }}
              >
                {timeDifference(timeStamp)}
              </Typography>
              <Divider />
              {downloadbutton()}
              <Divider />
              <Typography
                variant="body2"
                display="block"
                style={{ paddingRight: 10 }}
              >
                {message}
              </Typography>
            </Paper>
          </div>
        </Grid>
        {/* {PoperMenu()} */}
      </Grid>
    )
    default:
      return (
        <>
          {tags}
          {ReplyTo}
        </>
      )
  }
}
