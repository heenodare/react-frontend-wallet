import React from 'react'
import ChatMessage from 'components/ChatMessage'

export default function AlignItemsList() {
  function MessageList(items) {
    return items.map(item => {
      return (
        <ChatMessage
          key={Math.random()}
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
    <>
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
    </>
  )
}
