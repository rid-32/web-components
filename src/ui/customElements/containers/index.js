import { bindActionCreators } from 'redux'

import dom from 'dom'
import Component from 'utils/component'
import store from 'store'
import * as actions from 'actions'

const mapState = state => ({
    isFetching: state.elements.isFetching,
})

const bindedActions = {
    actions: bindActionCreators(actions, store.dispatch),
}

class customElementsContainer extends Component {
    componentDidMount() {
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

window.customElements.define(
    'custom-elements-container',
    customElementsContainer
)
