import React from 'react'
import ChatLayout from 'components/ChatLayout'
import SEO from 'components/SEO'
import ChatContent from 'components/ChatContent/index'

function ChatPage() {
  return (
    <ChatLayout>
      <SEO title="Chat" />
      <ChatContent />
    </ChatLayout>
  )
}

export default ChatPage
