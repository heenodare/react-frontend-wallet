import React, { useState, useEffect }from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SendIcon from '@material-ui/icons/Send'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Resizer from 'react-image-file-resizer';
import { gzip, ungzip } from 'node-gzip';
import WebTorrent from 'webtorrent'

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})

function ChatInput() {
  const classes = useStyles()
  const [fileSelector, setFileSelector] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  
  useEffect(() => {
    setFileSelector(buildFileSelector())
  }, [])


  function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    return fileSelector;
  }

  function handleFileSelect() {
    fileSelector.click();
  }

  //handle the uploaded file
  function fileChangedHandler(event, type) {
    var fileInput = false
    if (event.target.files[0]) {
      fileInput = true
    }
    if (fileInput) {

      var client = new WebTorrent()
      client.seed(event.target.files[0], function (torrent,err) {
        if(err){
          console.log(err)
          return
        }
        console.log('Client is seeding:', torrent.magnetURI)
      })
      
      //generate preview image and compress it in gzip format 
      if (type == "image") {
        Resizer.imageFileResizer(
          event.target.files[0],
          320,
          240,
          'JPEG',
          2,
          0,
          uri => {
            console.log(uri)
            gzip(uri)
              .then((compressed) => {
                var b64encoded = btoa(String.fromCharCode.apply(null, compressed));
                console.log(b64encoded)
                // return ungzip(compressed);
              })
              // .then((decompressed) => {
              //   console.log(decompressed.toString()); 
              // });
          },
          'base64'
        );
      }
      else if (type == "video") {
        var video = document.createElement('video');
        video.width = 320;
        video.height = 240;

        var canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 240;
        var context = canvas.getContext('2d');
        video.setAttribute('src', URL.createObjectURL(event.target.files[0]));
        video.load();
        video.play();

        video.addEventListener('loadeddata', function () {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          var dataURI = canvas.toDataURL('image/jpeg', 0.02);
          console.log(dataURI)
          gzip(dataURI)
          .then((compressed) => {
            var b64encoded = btoa(String.fromCharCode.apply(null, compressed));
            console.log(b64encoded)
          })
        });
      }
    }
  }


  function handleInputMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
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
      <MenuItem onClick={() => {
        handleMenuClose();
        fileSelector.setAttribute('accept', 'image/*');
        fileSelector.onchange = (event) => { fileChangedHandler(event, "image") };
        handleFileSelect();
      }}>Image</MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose();
        fileSelector.setAttribute('accept', 'video/*');
        fileSelector.onchange = (event) => { fileChangedHandler(event, "video") };
        handleFileSelect();
      }}>Video</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>Audio</MenuItem> */}
    </Menu>
  )

  return (
    <>
      <AppBar position="sticky" color="primary" className={classes.appBar}>
        <Paper square className={classes.root}>
          <IconButton
            className={classes.iconButton}
            aria-label="menu"
            onClick={handleInputMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Your Message Here..."
            inputProps={{ 'aria-label': 'Message Input' }}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="send"
            style={{ marginLeft: 'auto' }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </AppBar>
      {renderMenu}
    </>
  )
}

export default ChatInput
