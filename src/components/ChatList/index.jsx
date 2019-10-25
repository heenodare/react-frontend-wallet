import React, { useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ChatItem from 'components/ChatItem'
import * as dgraph from 'dgraph-js-http'
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ChatList(props) {
  const { type } = props
  const classes = useStyles()
  const [messages, setMessages] = React.useState([])  //messages to show
  const [loading, setLoading] = React.useState(true)  //loading indicator
  const [offset, setOffset] = React.useState(0)  //offset
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);


  //get the messages list from dgraph data base
  function RefreshMessage() {
    setLoading(true)
    const clientStub = new dgraph.DgraphClientStub(
      "http://25.27.157.248:8080",
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    dgraphClient.newTxn().query(`
    { 
      total(func: gt(count(~replyTo), 4)) { count(uid) } 
    }`).then((res, err) => {
      if(err){
        setLoading(false)
        console.log(err)
        return
      }
      return Promise.resolve(res.data.total[0].count)
    }).then((res, err) => {
      if(err){
        setLoading(false)
        console.log(err)
        return
      }
      var query = ''
      switch (type) {
        //get the latest mesages with more than 4 replys to it
        case "latest":
          query = `{
      latestChats(func: gt(count(~replyTo), 4) ,orderdesc: time, first: 15, offset: `+ offset +`)			
        {
          ID,
          text,
          time,
          address,
          count: count(~replyTo)
        }
      }  
    `;
          break;
        case "random":
        //get random messages with more than 4 replys to it
          query = `{
      latestChats(func: gt(count(~replyTo), 4) , first: 15, offset: `+ getRandomInt(0, res - 15) + `)
        {
          ID,
          text,
          time,
          address,
          count: count(~replyTo)
        }
      }  
    `;
          break;
        default:
          query = `{
      latestChats(func: gt(count(~replyTo), 4) ,orderdesc: time, first: 15, offset: `+ offset +`)			
        {
          ID,
          text,
          time,
          address,
          count: count(~replyTo)
        }
      }  
    `;
          break;
      }
      dgraphClient.newTxn().query(query).then((res, err) => {
        if(err){
          setLoading(false)
          console.log(err)
          return
        }
        const re = res.data;
        var tmpMessages = messages
        //prevent duplicate messages
        re.latestChats.forEach((item)=>{
          if(!tmpMessages.includes(item)){
            tmpMessages.push(item)
          }
        })
        //set the offset for next query
        setOffset(offset+15);
        setMessages(tmpMessages)
        setLoading(false)
      })

    })
  }

  useEffect(() => {
    RefreshMessage()
  }, [])


  function ChatList(items) {
    return (
      <>
        {items.map(item => (
          <ChatItem key={item.ID} item={item} />
        ))}
      </>
    )
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
          RefreshMessage()
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
    <List className={classes.root} >
      {ChatList(messages)}
      {MoreButton()}
    </List>
  )

}
