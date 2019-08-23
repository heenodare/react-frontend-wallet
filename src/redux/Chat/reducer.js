const initialState = {
  CurrentChat: { title: 'Unknown', id: 0 },
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'setCurrentChat':
      return { ...state, CurrentChat: action.value }
    default:
      return state
  }
}
