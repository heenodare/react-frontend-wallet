import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Comment from '@material-ui/icons/Comment'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { navigate } from '@reach/router'
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

function ChatItem(item) {
  const {
    title,
    lastMessage,
    upvotes,
    downvotes,
    comments,
    avatarUrl,
  } = item.item
  const { setCurrentChatConnect } = item

  return (
    <ListItem
      style={{ flexDirection: 'column' }}
      alignItems="center"
      button
      divider
      onClick={() => {
        setCurrentChatConnect({ title, id: Math.random() })
        navigate(`/chat`)
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="avator" src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>{title}</React.Fragment>}
          secondary={<>{lastMessage}</>}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ThumbUp />
        </ListItemIcon>
        {upvotes}
        <ListItemIcon>
          <ThumbDown />
        </ListItemIcon>
        {downvotes}
        <ListItemIcon>
          <Comment />
        </ListItemIcon>
        {comments}
      </ListItem>
    </ListItem>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatItem)
