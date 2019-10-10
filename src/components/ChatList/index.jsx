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

export default function AlignItemsList() {
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

    const query = `{
      latestChats(func: gt(count(~replyTo), 5) ,orderasc: time, first: 15)			
        {
          ID,
          text,
          count: count(~replyTo)
        }
      }  
    `;

    dgraphClient.newTxn().query(query).then((res, err) => {
      const re = res.data;
      // console.log(re)
      setMessages(re.latestChats)
      // console.log(messages)
      forceUpdate()
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
