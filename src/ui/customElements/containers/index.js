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
    // if you want to use custom element inside of render method of other custom
    // element, you should know, that state of this element will be reset after
    // rerender. To avoid this, you should pass state and setState function from
    // custom element, that can`t be rerender - root custom element
    componentDidMount() {
        // this will update component`s shadow dom if store is changed
        store.subscribe(this.update)

        this.fetchElements()
    }

    fetchElements = () => {
        const { actions } = bindedActions

        actions.fetchCustomElements()
    }

    render() {
        // you should get state inside of the render method
        const { isFetching } = mapState(store.getState())
        const { children } = this.props

        return (
            <custom-elements
                isFetching={isFetching}
                fetchElements={this.fetchElements}
                {...this.props}
            >
                {children}
            </custom-elements>
        )
    }
}

// Check that the element hasn't already been registered
if (!window.customElements.get('custom-elements-container'))
    window.customElements.define(
        'custom-elements-container',
        customElementsContainer
    )
