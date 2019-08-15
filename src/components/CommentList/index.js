import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import CommentItem from 'components/CommentItem'

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
          <CommentItem key={item.key} value={item} />
        ))}
      </>
    )
  }

  return (
    <List className={classes.root}>
      {CommentList([
        { key: 1 },
        { key: 2 },
        { key: 3 },
        { key: 4 },
        { key: 5 },
        { key: 6 },
        { key: 7 },
        { key: 73 },
        { key: 8 },
        { key: 9 },
      ])}
    </List>
  )
}
