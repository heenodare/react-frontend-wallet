import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


export default function CustomizedInputBase() {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState([])
  const [offset, setOffset] = React.useState(15)

  function ChatList(items) {
    return (
      <>
        {items.map(item => (
          <ChatItem key={item.ID} item={item} />
        ))}
      </>
    )
  }

  function searchMessages(value) {
    setLoading(true)
    setOffset(15)
    const clientStub = new dgraph.DgraphClientStub(
      // addr: optional, default: "http://localhost:8080"
      "http://25.27.157.248:8080",
      // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query search($search: string) {
        search(func: allofterms(text, $search), first: 15) {
                ID,
                text,
                time,
                address,
                count: count(~replyTo)
        }
      }`;
    const vars = { "$search": value };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      setMessages(res.data.search)
      setLoading(false)
    })
  }

  function loadMoreMessages(value) {
    setLoading(true)
    setOffset(offset+15)
    const clientStub = new dgraph.DgraphClientStub(
      // addr: optional, default: "http://localhost:8080"
      "http://25.27.157.248:8080",
      // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query search($search: string) {
        search(func: allofterms(text, $search), first: 15, offset: `+ offset +`) {
                ID,
                text,
                time,
                address,
                count: count(~replyTo)
        }
      }`;
    const vars = { "$search": value };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      var tmpMessages = messages
      res.data.search.forEach((item)=>{
        if(!tmpMessages.includes(item)){
          tmpMessages.push(item)
        }
      })
      setMessages(tmpMessages)
      setLoading(false)
    })
  }

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

  return (
    <>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search Chat"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event) => {
            setSearch(event.target.value)
            searchMessages(event.target.value)
          }}
        />
      </Paper>
      {ChatList(messages)}
      {MoreButton()}
    </>
  );
}