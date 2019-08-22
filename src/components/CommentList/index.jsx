import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import CommentItem from '../CommentItem'

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

  function CommentList(items) {
    return (
      <>
        {items.map(item => (
          <CommentItem key={item.key} item={item} />
        ))}
      </>
    )
  }

  return (
    <List className={classes.root}>
      {CommentList([
        {
          key: 1,
          message: " Why don'y you just buy a lot of ADA?",
          title: 'ADA',
          upvotes: 912351,
          downvotes: 76,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 2,
          message: 'I Love Heenadare!!!!',
          title: 'Hennadare',
          upvotes: 912123,
          downvotes: 0,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 3,
          message: 'Come on guys! Lets build the most decentralized coin!',
          title: 'Heenodare',
          upvotes: 22,
          downvotes: 6,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 4,
          message: 'I will use BTC to buy a Big Mac.',
          title: 'BTC',
          upvotes: 213,
          downvotes: 762,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 5,
          message: 'People are great.',
          title: 'Random',
          upvotes: 231,
          downvotes: 176,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 6,
          message: 'POPO POPO PO PO PO',
          title: 'News',
          upvotes: 915,
          downvotes: 2157,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 7,
          message: " Why don'y you just buy a lot of ADA?",
          title: 'ADA',
          upvotes: 912351,
          downvotes: 76,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 8,
          message: 'I Love Heenadare!!!!',
          title: 'Hennadare',
          upvotes: 912123,
          downvotes: 0,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 9,
          message: 'Come on guys! Lets build the most decentralized coin!',
          title: 'Heenodare',
          upvotes: 22,
          downvotes: 6,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 10,
          message: 'I will use BTC to buy a Big Mac.',
          title: 'BTC',
          upvotes: 213,
          downvotes: 762,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 11,
          message: 'People are great.',
          title: 'Random',
          upvotes: 231,
          downvotes: 176,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 12,
          message: 'POPO POPO PO PO PO',
          title: 'News',
          upvotes: 915,
          downvotes: 2157,
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
      ])}
    </List>
  )
}
