import { combineReducers } from 'redux'
import footer from '../components/Footer/reducer'
import chatData from '../util/setCurrentChat/reducer'

export default combineReducers({ footer, chatData })
