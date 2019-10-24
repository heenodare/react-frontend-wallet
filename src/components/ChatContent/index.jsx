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

const mapStateToProps = state => {
  return {
    
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
  const { setCurrentChatConnect } = props
  const [End, setEnd] = React.useState(10)
  const [Start, setStart] = React.useState(0)
  var promises = [];

  //create a list of ref for each list item
  const refs = messages.reduce((acc, value) => {
    acc[value.ID] = createRef();
    return acc;
  }, {});

  //scroll to the corresponding list item
  const handleClick = id =>{
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })};
  
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
          handleClick={handleClick}
          ref={refs[item.ID]}
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

  //set the IDList state from a nested ID tree to an array
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

  useEffect(() => {    
    getIDList()
  },[])

  //get the list of message ID and text from Dgraph
  function getIDList(){
    setLoading(true)
    setIDList([])
    const urlParams = new URLSearchParams(window.location.search);
    const clientStub = new dgraph.DgraphClientStub(
      "http://25.27.157.248:8080",
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
        setLoading(false)
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
      })
    })
  }

  //load the messages with in the range between Start and End
  function LoadMessages(){
    setLoading(true)
    var allLoad = []
    var tmpMessages = messages
    IDList.slice(Start, End).forEach((item)=>{
      const clientStub = new dgraph.DgraphClientStub(
        "http://25.27.157.248:8080",
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
          setLoading(false)
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
  
  //return a button to load more messages or End of messages if it reaches the end
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
  
  //return a button to load more messages or loading indicator when loading
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
    <> 
      {MessageList(messages)}
      {content()}
      <div style={{ float: 'left', clear: 'both' }} id="test" ref={messagesEnd} /> 
    </>
  )
}
