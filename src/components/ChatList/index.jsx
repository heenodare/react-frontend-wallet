import React, { useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ChatItem from 'components/ChatItem'
import * as dgraph from 'dgraph-js-http'

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

export default function AlignItemsList(props) {
  const { type } = props
  const classes = useStyles()
  const [messages, setMessages] = React.useState([])
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  function RefreshMessage() {
    setMessages([])
    const urlParams = new URLSearchParams(window.location.search);
    const clientStub = new dgraph.DgraphClientStub(
      // addr: optional, default: "http://localhost:8080"
      "http://25.27.157.248:8080",
      // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    dgraphClient.newTxn().query(`
    { 
      total(func: gt(count(~replyTo), 5)) { count(uid) } 
    }`).then((res, err) => {
      if(err){
        return
      }
      return Promise.resolve(res.data.total[0].count)
    }).then((res, err)=>{
    var query = ''
    switch (type) {
      case "latest":
        query = `{
      latestChats(func: gt(count(~replyTo), 5) ,orderdesc: time, first: 15)			
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
        var offset = getRandomInt(0,res-15)
        query = `{
      latestChats(func: gt(count(~replyTo), 5) , first: 15, offset: `+offset+`)
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
      latestChats(func: gt(count(~replyTo), 5) ,orderdesc: time, first: 15)			
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
      console.log(err)
      const re = res.data;
      // console.log(re)
      setMessages(re.latestChats)
      // console.log(messages)
      forceUpdate()
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

  return (
    <List className={classes.root}>
      {ChatList(messages)}
    </List>
  )
}
