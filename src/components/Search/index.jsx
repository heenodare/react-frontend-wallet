import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import * as dgraph from 'dgraph-js-http'
import ChatItem from 'components/ChatItem'
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Search() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState([])
  const [offset, setOffset] = React.useState(15)
  const [order, setOrder] = React.useState("orderdesc: time,")
  var timeout = null;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function ChatList(items) {
    return (
      <>
        {items.map(item => (
          <ChatItem key={item.ID} item={item} />
        ))}
      </>
    )
  }

  //get the search results from input
  function searchMessages(value) {
    setLoading(true)
    const clientStub = new dgraph.DgraphClientStub(
      "http://25.27.157.248:8080",
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query search($search: string) {
        search(func: allofterms(text, $search), `+order+` first: 15) {
                ID,
                text,
                time,
                address,
                count: count(~replyTo)
        }
      }`;
    const vars = { "$search": value };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      if(err){
        console.log(err)
        setLoading(false)
        return
      }
      setOffset(15)
      setMessages(res.data.search)
      setLoading(false)
    })
  }

  useEffect(() => {
    searchMessages(search)
  }, [order]);

  //load more messages and set the offset
  function loadMoreMessages(value) {
    setLoading(true)
    const clientStub = new dgraph.DgraphClientStub(
      "http://25.27.157.248:8080",
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query search($search: string) {
        search(func: allofterms(text, $search),`+order+` first: 15, offset: `+ offset +`) {
                ID,
                text,
                time,
                address,
                count: count(~replyTo)
        }
      }`;
    const vars = { "$search": value };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      if(err){
        setLoading(false)
        console.log(err)
        return
      }
      var tmpMessages = messages
      res.data.search.forEach((item)=>{
        if(!tmpMessages.includes(item)){
          tmpMessages.push(item)
        }
      })
      setOffset(offset+15)
      setMessages(tmpMessages)
      setLoading(false)
    })
  }

  //return a button to load more messages or loading indicator
  function MoreButton() {
    if (loading) {
      return (
        <CircularProgress style={{ margin: "0 auto", display: "block" }} color="secondary" />
      )
    }
    else{
      return(
        <ListItem
        button
        onClick={() => {
          loadMoreMessages(search)
        }}
      >
        <ListItemIcon style={{ paddingTop: 10, margin: "0 auto", display: "block" }}>
          <AddIcon />
        </ListItemIcon>
      </ListItem>
      )
    }
  }

  function MenuIconSwitch(){
    switch (order){
      case "orderdesc: time,":
        return <ArrowDownwardIcon/>
      case "orderasc: time,":
        return <ArrowUpwardIcon/>
      default:
      return <MenuIcon/>
    }
  }

  function Menu(){
    return (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={()=>{
          setOrder("orderdesc: time,")
          setMessages([])
          handleClose()
        }}>
          <ListItemText primary="by time(newest to oldest)" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{
          setOrder("orderasc: time,")
          setMessages([])
          handleClose()
        }}>
          <ListItemText primary="by time(oldest to newest)" />
        </StyledMenuItem>
      </StyledMenu>
    )
  }
  
  return (
    <>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu" onClick={handleClick}>
          {MenuIconSwitch()}
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search Chat"
          inputProps={{ 'aria-label': 'search google maps' }}
          // onChange={(event) => {
          //   setSearch(event.target.value)
          //   searchMessages(event.target.value)
          // }}
          onKeyUp={(event)=>{
            clearTimeout(timeout);
            var text = event.target.value
            // Make a new timeout set to go off in 800ms
            timeout = setTimeout(function () {
                console.log('Input Value:', text);
                setSearch(text)
                searchMessages(text)
            }, 300);
          }}
        />
        <IconButton className={classes.iconButton} aria-label="menu" onClick={()=>{
          searchMessages(search)}}
          >
          <SearchIcon/>
        </IconButton>
      </Paper>
      {Menu()}
      {ChatList(messages)}
      {MoreButton()}
    </>
  );
}