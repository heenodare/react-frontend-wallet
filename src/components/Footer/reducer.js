const initialState = {
    CurrentPage: "discover",
};

export default function(state = initialState, action) {
    switch (action.type) {
      case "setCurrentPage": 
        return { ...state, CurrentPage: action.value };
      default:
        return state;
    }
  }
  