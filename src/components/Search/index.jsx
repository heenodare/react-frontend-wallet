import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import * as dgraph from 'dgraph-js-http'
import ChatItem from 'components/ChatItem'

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
  function ChatList(items) {
    return (
      <>
        {items.map(item => (
          <ChatItem key={item.ID} item={item} />
        ))}
      </>
    )
  }

  function searchMessages(value, offset) {
    setLoading(true)
    const clientStub = new dgraph.DgraphClientStub(
      // addr: optional, default: "http://localhost:8080"
      "http://25.27.157.248:8080",
      // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query search($search: string) {
        search(func: allofterms(text, $search), first: 15, offset:`+ offset +`) {
                ID,
                text,
                time,
                address,
                count: count(~replyTo)
        }
      }`;
    const vars = { "$search": value };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      console.log(res)
      setMessages(res.data.search)
      setLoading(false)
    })

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
            searchMessages(event.target.value , 0)
          }}
        />
        {/* <IconButton className={classes.iconButton} aria-label="search" onClick={()=>{searchMessages()}}>
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="filter">
          <FilterListIcon />
        </IconButton> */}
      </Paper>
      {ChatList(messages)}
    </>
  );
}