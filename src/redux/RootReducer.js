import { combineReducers } from 'redux'
import footer from './Footer/reducer'
import chatData from './Chat/reducer'

export default combineReducers({ footer, chatData })
