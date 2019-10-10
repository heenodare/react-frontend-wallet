const initialState = {
  CurrentChat: { title: 'Loading', id: -1 },
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'setCurrentChat':
      return { ...state, CurrentChat: action.value }
    default:
      return state
  }
}
