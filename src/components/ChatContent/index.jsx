import React, { useEffect, createRef, useCallback } from 'react'
import ChatMessage from 'components/ChatMessage'
import InfiniteScroll from 'react-infinite-scroller'
import * as dgraph from 'dgraph-js-http'
import omit from 'object.omit';
import { connect } from 'react-redux'
import { setCurrentChat } from '../../redux/Chat/action'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  const [loading, setLoading] = React.useState(true)
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const { setCurrentChatConnect, CurrentChat } = props
  const [End, setEnd] = React.useState(10)
  var promises = [];

  function MessageList(items) {

    return items.map(item => {
      return (
        <ChatMessage
          key={item.ID}
          ID={item.ID}
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
    message.replys.forEach((item, index)=>{
      var tmpMessages = messages;
      tmpMessages.push(omit(item, 'replys'));
      setMessages(tmpMessages);
      if(item.replys != undefined){
        promises.push(MessagesToArray(item))
      }
    })
    return Promise.resolve()
  }

  function RefreshMessages(){
    setCurrentChatConnect({ title: "Loading", id: -1 })
    setLoading(true)
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
      var tmpMessages = messages;
      tmpMessages.push(omit(root, 'replys'));
      setMessages(tmpMessages);
      promises.push(MessagesToArray(root))
      Promise.all(promises).then(()=>{
        tmpMessages = messages;
        tmpMessages.sort((a, b) => (a.time > b.time) ? 1 : -1)
        setCurrentChatConnect({ title: root.text, id: root.ID })
        setMessages(tmpMessages)
        setLoading(false)
      })
    })
  }

  useEffect(() => {
    RefreshMessages()
  },[])

  if(loading){
    return(
      <div>
      <CircularProgress style={{margin: "0 auto", display: "block"}} color="secondary" />
      </div>
    )
  }
  else{
  return (
    // <InfiniteScroll
    //   pageStart={0}
    //   loadMore={()=>{
    //     if(loading){
    //       return
    //     }
    //     setLoading(true)
    //     if(!loading){
    //     console.log("reach end")
    //     End += 10;
    //     }
    //   }}
    //   hasMore={true}
    //   loader={
    //     <div className="loader" key={0}>
    //       Loading ...
    //     </div>
    //   }
    //   useWindow={true}
    //   // isReverse
    // >
    <> 
      {MessageList(messages.slice(0, End))}
      <ListItem
          button
          onClick={() => {
            if(End+10 > messages.length){
              alert("No more new messages")
            }
            else{
            setEnd(End+10)
            }
          }}
        >
          <ListItemIcon style={{paddingTop: 10,margin: "0 auto", display: "block"}}>
            <AddIcon />
          </ListItemIcon>
        </ListItem>
    </>
      /* <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} /> */
    // </InfiniteScroll>
  )
  }
}
