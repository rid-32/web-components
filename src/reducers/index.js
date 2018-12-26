import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

export const customElementsReducer = combineReducers({
    elements: handleActions(
        {
            FETCHING_STARTED: state => ({
                ...state,
                isFetching: true,
            }),
            FETCHING_SUCCESS: (state, { payload }) => ({
                isFetching: false,
                payload,
            }),
        },
        {
            isFetching: false,
            payload: null,
        }
    ),
})
