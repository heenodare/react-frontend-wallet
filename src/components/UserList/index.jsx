import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import UserItem from 'components/UserItem'

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

  function UserList(items) {
    return (
      <>
        {items.map(item => (
          <UserItem key={item.key} item={item} />
        ))}
      </>
    )
  }

  return (
    <List className={classes.root}>
      {UserList([
        {
          key: 1,
          userName: 'LouLouDev',
          followers: 926,
          mostActive: 'BTC',
          lastJoined: 'Crazy price talk',
          avatarUrl:
            'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
        },
        {
          key: 2,
          userName: 'Crazy Mat',
          followers: 612,
          mostActive: 'TRON',
          lastJoined: 'MONERO',
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 3,
          userName: 'WhosMyDaddy',
          followers: 326,
          mostActive: 'War',
          lastJoined: 'Stock',
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 4,
          userName: 'Luke Skyrunner',
          followers: 261,
          mostActive: 'Jedi',
          lastJoined: 'Rebellion',
          avatarUrl:
            'https://img.huffingtonpost.com/asset/5bb4d0cc2400003100563000.jpeg?ops=scalefit_630_noupscale',
        },
        {
          key: 5,
          userName: 'Darth Rader',
          followers: 262,
          mostActive: 'Death Star',
          lastJoined: 'Empire',
          avatarUrl:
            'https://images.fatherly.com/wp-content/uploads/2018/12/darthvader-header.jpg?q=65&enable=upscale&w=600',
        },
        {
          key: 6,
          userName: 'Donald drum',
          followers: 216,
          mostActive: 'Tariff',
          lastJoined: 'My friend Xi',
          avatarUrl:
            'https://www.gannett-cdn.com/presto/2019/08/14/USAT/df2a4775-e46d-46fd-b214-d04c020249ee-AP_Trump_1.JPG?width=540&height=&fit=bounds&auto=webp',
        },
        {
          key: 7,
          userName: 'LouLouDev',
          followers: 926,
          mostActive: 'BTC',
          lastJoined: 'Crazy price talk',
          avatarUrl:
            'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
        },
        {
          key: 8,
          userName: 'Crazy Mat',
          followers: 612,
          mostActive: 'TRON',
          lastJoined: 'MONERO',
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 9,
          userName: 'WhosMyDaddy',
          followers: 326,
          mostActive: 'War',
          lastJoined: 'Stock',
          avatarUrl:
            'https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg',
        },
        {
          key: 10,
          userName: 'Luke Skyrunner',
          followers: 261,
          mostActive: 'Jedi',
          lastJoined: 'Rebellion',
          avatarUrl:
            'https://img.huffingtonpost.com/asset/5bb4d0cc2400003100563000.jpeg?ops=scalefit_630_noupscale',
        },
        {
          key: 11,
          userName: 'Darth Rader',
          followers: 262,
          mostActive: 'Death Star',
          lastJoined: 'Empire',
          avatarUrl:
            'https://images.fatherly.com/wp-content/uploads/2018/12/darthvader-header.jpg?q=65&enable=upscale&w=600',
        },
        {
          key: 12,
          userName: 'Donald drum',
          followers: 216,
          mostActive: 'Tariff',
          lastJoined: 'My friend Xi',
          avatarUrl:
            'https://www.gannett-cdn.com/presto/2019/08/14/USAT/df2a4775-e46d-46fd-b214-d04c020249ee-AP_Trump_1.JPG?width=540&height=&fit=bounds&auto=webp',
        },
      ])}
    </List>
  )
}
