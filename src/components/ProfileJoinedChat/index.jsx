import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ChatItem from 'components/ChatItem'
import ListSubheader from '@material-ui/core/ListSubheader'

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

  function ChatList(items) {
    return (
      <>
        {items.map(item => (
          <ChatItem key={item.key} item={item} />
        ))}
      </>
    )
  }

  return (
    <>
      <List
        subheader={<ListSubheader>Most Active Chat</ListSubheader>}
        className={classes.root}
      >
        <ChatItem
          key={1}
          item={{
            key: 1,
            title: 'Why BTC boosted so hard?',
            lastMessage:
              'Because of the current situation that the stock market is...',
            upvotes: 10,
            downvotes: 991,
            comments: 103292,
            avatarUrl:
              'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
          }}
        />
      </List>
      <List
        subheader={<ListSubheader>Recent Chat</ListSubheader>}
        className={classes.root}
      >
        <List className={classes.root}>
          {ChatList([
            {
              key: 1,
              title: 'Why BTC boosted so hard?',
              lastMessage:
                'Because of the current situation that the stock market is...',
              upvotes: 10,
              downvotes: 991,
              comments: 103292,
              avatarUrl:
                'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
            },
            {
              key: 2,
              title: 'How to make ADA strong again?',
              lastMessage: 'I love it, so I buy it...',
              upvotes: 1204,
              downvotes: 911,
              comments: 10,
              avatarUrl:
                'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
            },
            {
              key: 3,
              title: 'How to create a most decentralized coin?',
              lastMessage: 'You should trust the force...',
              upvotes: 461321,
              downvotes: 9131,
              comments: 11232,
              avatarUrl:
                'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
            },
            {
              key: 4,
              title: 'This is the reason why I trust Heenodare',
              lastMessage: 'I love it, so I use it...',
              upvotes: 104,
              downvotes: 91,
              comments: 102,
              avatarUrl:
                'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
            },
            {
              key: 5,
              title: 'I am holding 992135 BTC! I am satoshi!',
              lastMessage: 'No one trust you, please stop it...',
              upvotes: 0,
              downvotes: 91812351,
              comments: 101,
              avatarUrl:
                'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
            },
            {
              key: 6,
              title: 'I know who is trying to build this',
              lastMessage: 'The God...',
              upvotes: 14,
              downvotes: 1,
              comments: 97,
              avatarUrl:
                'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
            },
          ])}
        </List>
      </List>
    </>
  )
}
