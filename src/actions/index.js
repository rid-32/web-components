import { createActions } from 'redux-actions'

import * as api from 'api/customElements'

export const fetchCustomElements = () => async dispatch => {
    const actions = createActions({
        FETCHING_STARTED: () => {},
        FETCHING_SUCCESS: data => data,
    })
    let response = {}

    try {
        dispatch(actions.fetchingStarted())

        response = await api.fetchElement()

        dispatch(actions.fetchingSuccess(response))
    } catch (error) {
        console.error(error)
    }
}
