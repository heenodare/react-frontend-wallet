import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ChatItem from 'components/ChatItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import * as dgraph from 'dgraph-js-http'
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

export default function AlignItemsList() {
  const classes = useStyles()
  const [lower, setLower] = React.useState([])
  const [upper, setUpper] = React.useState(null)
  const [loading, setLoading] = React.useState(true)


  //get all the related branches in current chat
  function getBranches() {
    setLoading(true)
    const urlParams = new URLSearchParams(window.location.search);
    const clientStub = new dgraph.DgraphClientStub(
      "http://25.27.157.248:8080",
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    //get the upper branch and the lower branches with more than 4 replys
    const query = `	query getBranches($id: string) {
      getUpperBranch(func: eq(ID, $id)){
        replyTo{
          ID,
          time,
          text,
          address,
          count: count(~replyTo)
        }
      }
       getLowerBranches(func: eq(ID, $id)) {
          replys:~replyTo @filter(gt(count(~replyTo), 4)){
          ID,
          text,
          time,
          address,
          count: count(~replyTo)
          }
      }
      }`;
    const vars = { "$id": urlParams.get('id') };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      if(err){
        setLoading(false)
        console.log(err)
        return
      }
      // console.log(res)
      setUpper(res.data.getUpperBranch[0].replyTo[0])
      if (res.data.getLowerBranches.length != 0) {
        setLower(res.data.getLowerBranches[0].replys)
      }
      else {
        setLower([])
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    getBranches()
  }, [])

  //display the chat list
  function ChatList(items) {
    if (items.length == 0) {
      return (
        <ListItem>
          <ListItemText primary="None" />
        </ListItem>
      )
    }
    else {
      return (
        <>
          {items.map(item => (
            <ChatItem key={item.ID} item={item} />
          ))}
        </>
      )
    }
  }
  if (!loading) {
    return (
      <>
        <List
          subheader={<ListSubheader>Upper branch</ListSubheader>}
          className={classes.root}
        >
          <ChatItem
            key={upper.ID}
            item={upper}
          />
        </List>
        <List
          subheader={<ListSubheader>Related Branches</ListSubheader>}
          className={classes.root}
        >
            {ChatList(lower)}
        </List>
      </>
    )
  }
  else {
    return (
      <CircularProgress style={{ margin: "0 auto", display: "block" }} color="secondary" />
    )
  }
}
