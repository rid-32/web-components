import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import * as actions from 'actions'

const mapState = state => ({
    isFetching: state.elements.isFetching,
})

const bindedActions = {
    actions: bindActionCreators(actions, store.dispatch),
}

class customElementsContainer extends Component {
    state = { value: 0 }

    componentDidMount() {
        // this will update component`s shadow dom if store is changed
        store.subscribe(this.update)
    }

    fetchElements = () => {
        const { actions } = bindedActions

        actions.fetchCustomElements()
    }

    render() {
        // you should get state inside of the render method
        const { isFetching } = mapState(store.getState())

        return (
            <custom-elements
                id="hello"
                isFetching={isFetching}
                fetchElements={this.fetchElements}
                state={this.state}
                {...this.props}
            />
        )
    }
}

// Check that the element hasn't already been registered
if (!window.customElements.get('custom-elements-container'))
    window.customElements.define(
        'custom-elements-container',
        customElementsContainer
    )
