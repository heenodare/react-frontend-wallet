import React, { useEffect, createRef, useCallback } from 'react'
import ChatMessage from 'components/ChatMessage'
import * as dgraph from 'dgraph-js-http'
import omit from 'object.omit';
import { connect } from 'react-redux'
import { setCurrentChat } from '../../redux/Chat/action'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import { setSyntheticTrailingComments } from 'typescript';

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
  const [IDList, setIDList] = React.useState([])
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const { setCurrentChatConnect, CurrentChat } = props
  const [End, setEnd] = React.useState(10)
  const [Start, setStart] = React.useState(0)
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
          ReplyTo={item.replyTo[0]}
          preview={item.preview}
        />
      )
    })
  }
  function scrollToBottom() {
    if(messagesEnd.current == null){
      console.log(1)
    }
    else{
      console.log(2)
      messagesEnd.current.scrollIntoView({ alignToTop: false })
    }
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

  function IDToArray(ID) {
    ID.replys.forEach((item)=>{
      var tmpID = IDList;
      tmpID.push(omit(item, 'replys'));
      setIDList(tmpID);
      if(item.replys != undefined){
        promises.push(IDToArray(item))
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
          preview,
      }
      }`;
    const vars = { "$id": urlParams.get('id') };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      if(err){
        console.log(err)
        return
      }
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
        // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      })
    })
  }

  useEffect(() => {
    // RefreshMessages()
    getIDList()
  },[])

  function getIDList(){
    setLoading(true)
    setIDList([])
    const urlParams = new URLSearchParams(window.location.search);
    const clientStub = new dgraph.DgraphClientStub(
      // addr: optional, default: "http://localhost:8080"
      "http://25.27.157.248:8080",
      // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
      false,
    );
    const dgraphClient = new dgraph.DgraphClient(clientStub);

    const query = `	query getID($id: string) {
      getID(func: eq(ID, $id)) @recurse {
        replys:~replyTo,
          ID,
          text
      }
      }`;
    const vars = { "$id": urlParams.get('id') };
    dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
      if(err){
        console.log(err)
        return
      }
      if(res.data.getID.length == 0){
        setLoading(false)
        return
      }
      var root = res.data.getID[0];
      var tmpID = IDList;
      if(root.replys != undefined){
      tmpID.push(omit(root, 'replys'));
      setIDList(tmpID);
      promises.push(IDToArray(root))
      }
      else{
      tmpID.push(root);
      setIDList(tmpID);
      }
      Promise.all(promises).then(()=>{
        tmpID = IDList;
        tmpID.sort((a, b) => (a.ID > b.ID) ? 1 : -1)
        setCurrentChatConnect({ title: root.text, id: root.ID })
        setIDList(tmpID)
        LoadMessages()
        // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      })
    })
  }

  function LoadMessages(){
    setLoading(true)
    // console.log(IDList.slice(Start, End))
    var allLoad = []
    var tmpMessages = messages
    IDList.slice(Start, End).forEach((item)=>{
      const clientStub = new dgraph.DgraphClientStub(
        // addr: optional, default: "http://localhost:8080"
        "http://25.27.157.248:8080",
        // legacyApi: optional, default: false. Set to true when connecting to Dgraph v1.0.x
        false,
      );
      const dgraphClient = new dgraph.DgraphClient(clientStub);

      const query = `	query loadMessage($id: string) {
        loadMessage(func: eq(ID, $id)) {
            replyTo {
              ID,
              text
            },
            ID,
            text,
            data,
            address,
            time,
            signature,
            type,
            tags,
            preview,
        }
        }`;
      const vars = { "$id": item.ID.toString() };
      allLoad.push(dgraphClient.newTxn().queryWithVars(query, vars).then((res, err) => {
        if(err){
          console.log(err)
          return Promise.reject()
        }
        tmpMessages.push(res.data.loadMessage[0])
        return Promise.resolve()
      }))
    })
    Promise.all(allLoad).then(()=>{
      tmpMessages.sort((a, b) => (a.ID > b.ID) ? 1 : -1)
      setMessages(tmpMessages)
      setStart(Start+10)
      setEnd(End+10)
      setLoading(false)
    })
  }
      
  function addIcon(){
    if(End < IDList.length)
    return (
    <ListItem
      button
      onClick={() => {
          LoadMessages()
      }}
    >
      <ListItemIcon style={{paddingTop: 10,margin: "0 auto", display: "block"}}>
        <AddIcon />
      </ListItemIcon>
    </ListItem>)
    else{
      return <ListItem
    >
       <ListItemText
        secondary={"End of this chat"}
      />
    </ListItem>
    }
  }

  function content(){
    if(loading){
      return(
        <div>
        <CircularProgress style={{margin: "0 auto", display: "block"}} color="secondary" />
        </div>
      )
    }
    else{
      return(
        <>
        {addIcon()}
        </>
      )
    }
  }
  
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
      {MessageList(messages)}
      {content()}
      <div style={{ float: 'left', clear: 'both' }} id="test" ref={messagesEnd} /> 
    </>
      /* */
    // </InfiniteScroll>
  )
}
