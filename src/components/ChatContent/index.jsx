import React, { useEffect, createRef, useCallback } from 'react'
import ChatMessage from 'components/ChatMessage'
import InfiniteScroll from 'react-infinite-scroller'
import * as dgraph from 'dgraph-js-http'
import omit from 'object.omit';
import { connect } from 'react-redux'
import { setCurrentChat } from '../../redux/Chat/action'

const mapStateToProps = state => {
  return {
    CurrentChat: state.chatData.CurrentChat,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentChatConnect: chatitem => {
      dispatch(setCurrentChat(chatitem))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContent)



function ChatContent(props) {
  const messagesEnd = createRef()
  const [messages, setMessages] = React.useState([])
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const { setCurrentChatConnect } = props

  function MessageList(items) {
    return items.map(item => {
      return (
        <ChatMessage
          key={item.ID}
          timeStamp={item.time}
          address={item.address}
          tags={item.tags}
          type={item.type}
          data={item.data}
          message={item.text}
          ReplyTo={item.replyTo}
        />
      )
    })
  }
  function scrollToBottom() {
    messagesEnd.current.scrollIntoView({ alignToTop: false })

  }

  function MessagesToArray(message) {
    var tmpMessages = messages;
    tmpMessages.push(omit(message, 'replys'));
    setMessages(tmpMessages);
    message.replys.forEach((item, index)=>{
      if(item.replys != undefined){
        MessagesToArray(item)
      }
    })
  }

  function RefreshMessages(){
    setCurrentChatConnect({ title: "Loading", id: -1 })
    setMessages([])
    const urlParams = new URLSearchParams(window.location.search);
    const clientStub = new dgraph.DgraphClientStub(
      // addr: optional, default: "http://localhost:8080"
      "http://25.27.157.248:8080",
      // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query getMessages($id: string) {
      getMessages(func: eq(ID, $id)) @recurse {
        replys:~replyTo,
          ID,
          text,
          data,
          address,
          time,
          signature,
          type,
          tags,
      }
      }`;
    const vars = { "$id": urlParams.get('id') };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      const re = res.data;
      var root = re.getMessages[0];
      setCurrentChatConnect({ title: root.text, id: root.ID })
      MessagesToArray(root)
      var tmpMessages = messages;
      tmpMessages.sort((a, b) => (a.time > b.time) ? 1 : -1)
      setMessages(tmpMessages)
      // console.log(messages)
      forceUpdate()
    })
  }

  useEffect(() => {
    RefreshMessages()
  },[])


  return (
    // <InfiniteScroll
    //   pageStart={0}
    //   loadMore={loadFunc}
    //   hasMore={false}
    //   loader={
    //     <div className="loader" key={0}>
    //       Loading ...
    //     </div>
    //   }
    //   useWindow={false}
    //   // isReverse
    // >
    <>
      {MessageList(messages)}
      </>
      // <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
    // </InfiniteScroll>
  )
}
