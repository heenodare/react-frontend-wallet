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

export default function AlignItemsList(props) {
  const { type } = props
  const classes = useStyles()
  const [messages, setMessages] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [QueryPage, setPage] = React.useState(1)
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  function RefreshMessage(refresh) {
    setLoading(true)
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
      if (err) {
        return
      }
      return Promise.resolve(res.data.total[0].count)
    }).then((res, err) => {
      var query = ''
      switch (type) {
        case "latest":
          query = `{
      latestChats(func: gt(count(~replyTo), 5) ,orderdesc: time, first: 15, offset: `+ QueryPage*15 +`)			
        {
          ID,
          text,
          time,
          address,
          count: count(~replyTo)
        }
      }  
    `;
        var tmpPage = QueryPage + 1
        setPage(tmpPage);

          break;
        case "random":
          var offset = getRandomInt(0, res - 15)
          query = `{
      latestChats(func: gt(count(~replyTo), 5) , first: 15, offset: `+ offset + `)
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
      latestChats(func: gt(count(~replyTo), 5) ,orderdesc: time, first: 15, offset: `+ QueryPage*15 +`)			
        {
          ID,
          text,
          time,
          address,
          count: count(~replyTo)
        }
      }  
    `;
    var tmpPage = QueryPage + 1
    setPage(tmpPage);
          break;
      }
      dgraphClient.newTxn().query(query).then((res, err) => {

        const re = res.data;
        // console.log(re)
        var tmpMessages = messages
        re.latestChats.forEach((item)=>{
          if(!tmpMessages.includes(item)){
            tmpMessages.push(item)
          }
        })
        console.log(tmpMessages)
        setMessages(tmpMessages)

        // console.log(messages)
        setLoading(false)
        // forceUpdate()
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
