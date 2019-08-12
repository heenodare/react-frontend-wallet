import React from 'react'
import { MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'

export default function AlignItemsList() {
  return (
    <>
      <MessageList
        className="message-list"
        lockable
        toBottomHeight="100%"
        dataSource={[
          {
            position: 'right',
            type: 'text',
            text: 'How is BTC right now?',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: 'very good!',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text:
              'Do you want a rating system that fully owned by the community?',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: '+1',
            date: new Date(),
          },
        ]}
      />
    </>
  )
}
