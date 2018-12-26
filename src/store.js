import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { customElementsReducer } from 'reducers'

const store = createStore(
    customElementsReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store
