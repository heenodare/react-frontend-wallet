import React, { useEffect } from 'react'
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
import MoreIcon from '@material-ui/icons/MoreVert'
import { gzip, ungzip } from 'node-gzip';
import ReplyIcon from '@material-ui/icons/Reply';

Message.propTypes = {
  timeStamp: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  data: PropTypes.string,
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
    data,
    ReplyTo,
    preview,
    position,
  } = props
  const chatID = new URLSearchParams(window.location.search).get('id');
  const classes = useStyles()
  const [previewImg, setPreview] = React.useState(""); //preview img of image or video thumbnail
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

  useEffect(() => {
    //decompress the preview image and set the image
    if (preview != "") {
      ungzip(Uint8Array.from(atob(preview), c => c.charCodeAt(0)))
        .then((decompressed) => {
          setPreview(decompressed.toString())
        });
    }
  }, [])

  // the header of message
  function messageHeader() {
    return (<>
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
      <Typography
        variant="caption"
        display="inline"
        align="left"
        style={{ fontSize: 10, color: 'grey', paddingLeft: 10 }}
      >
        {ReplyTo.ID.toString() == chatID ? "" : "Replying to #" + ReplyTo.ID.toString()}
      </Typography>
      <IconButton
        edge="end"
        aria-label="more"
        aria-haspopup="true"
        color="inherit"
      >
        <MoreIcon style={{ width: 20, height: 20 }} />
      </IconButton>
    </>
    )
  }

  //show the messages that it replys to, if it is not replying to the root message
  function ReplyMessages(){
    if(ReplyTo.ID.toString() == chatID){
      return
    }
    else{    
      return(
        <>
        <div style={{paddingLeft: 20}}>
        <ReplyIcon color="disabled" fontSize="small" style={{paddingTop: 2}}/>
        <Typography
        variant="caption"
        display="inline"
        align="left"
        style={{ fontSize: 12 , paddingLeft: 5 }}
      >
        {ReplyTo.text}
        </Typography>
        </div>
        <Divider/>
        </>
    )
    }
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

  // download the torrenrt data
  function downloadtorrent() {
    setDownloading(true)
    var torrentId = data
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
      })
    });
  }

  //render the downloaded file/download button with preview/loading indicator if downloading
  function downloadbutton() {
    if (!downloaded) {
      if (!downloading) {
        return (
          <>
            <img src={previewImg}></img>
            <IconButton aria-label="download" onClick={downloadtorrent}>
              <GetAppIcon />
            </IconButton>
          </>
        )
      }
      else {
        return (
          <CircularProgress style={{ display: "block" }} color="secondary" />
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
                {messageHeader()}
                <Divider />
                {ReplyMessages()}
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
                {messageHeader()}
                <Divider />
                {ReplyMessages()}
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
                {messageHeader()}
                <Divider />
                {ReplyMessages()}
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
        </>
      )
  }
}
