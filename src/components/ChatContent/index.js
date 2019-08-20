import React from 'react'
import Grid from '@material-ui/core/Grid'
import ChatMessage from 'components/ChatMessage'

export default function AlignItemsList() {
  return (
    <>
      <Grid container spacing={1} style={{ paddingBottom: 5 }}>
        <ChatMessage
          timeStamp={Math.trunc(Date.now() / 1000)}
          address="2312312eda"
          tags={['2131', '123213']}
          type={0}
          data="dqwdbhqdqwdqw"
          message="This is a message"
          ReplyTo={123123712}
          isSigned
          isOnChain
        />
      </Grid>
    </>
  )
}
