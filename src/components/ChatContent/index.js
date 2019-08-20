import React from 'react'
import Grid from '@material-ui/core/Grid'
import ChatMessage from 'components/ChatMessage'
import Infinite from 'react-infinite'

export default function AlignItemsList() {
  function MessageList(items) {
    return items.map((item, i) => {
      return (
        <ChatMessage
          key={i}
          timeStamp={item.timeStamp}
          address={item.address}
          tags={item.tags}
          type={item.type}
          data={item.data}
          message={item.message}
          ReplyTo={item.ReplyTo}
          isSigned={item.isSigned}
          isOnChain={item.isOnChain}
          position={item.position}
        />
      )
    })
  }

  return (
    <Infinite
      useWindowAsScrollContainer
      elementHeight={300}
      displayBottomUpwards
    >
      {MessageList([
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: '2312312eda',
          tags: ['text', 'chat'],
          type: 'text',
          message: 'This is a text message',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'right',
        },
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: '2312312eda',
          tags: ['text', 'chat'],
          type: 'text',
          message:
            'This is a text message which is very loooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooonoooooooooooooooooooooong',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'left',
        },
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: 'asdasdascs',
          tags: ['fun', 'chat'],
          type: 'image',
          data:
            'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
          message: 'This is an image message with text',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'right',
        },
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: 'asdasdascs',
          tags: ['fun', 'chat'],
          type: 'image',
          data:
            'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
          message: 'This is an image message with text',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'right',
        },
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: 'asdasdascs',
          tags: ['fun', 'chat'],
          type: 'image',
          data:
            'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
          message: 'This is an image message with text',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'right',
        },
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: 'asdasdascs',
          tags: ['fun', 'chat'],
          type: 'image',
          data:
            'https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg',
          message: 'This is an image message with text',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'right',
        },
        {
          timeStamp: Math.trunc(Date.now() / 1000),
          address: 'asdasdascs',
          tags: ['fun', 'chat'],
          type: 'youtube',
          data: 'https://www.youtube.com/embed/un8FAjXWOBY',
          message: 'This is a youtube message with text',
          ReplyTo: 123123712,
          isSigned: true,
          isOnChain: true,
          position: 'left',
        },
      ])}
    </Infinite>
  )
}
