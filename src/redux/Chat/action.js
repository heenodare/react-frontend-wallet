export const setCurrentChat = chat => {
  return {
    type: 'setCurrentChat',
    value: chat,
  }
}

export const setChatMessages = messages =>{
  return {
    type: 'setChatMessages',
    value: messages
  }
}