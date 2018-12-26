import dom from 'dom'
import Component from 'utils/component'

class customElements extends Component {
    render() {
        const { isFetching, fetchElements, children } = this.props

        return (
            <div class="customElements">
                {isFetching ? (
                    <h3>Loading...</h3>
                ) : (
                    <div className="customElements-controller">
                        {children}
                        <br />
                        <button onClick={fetchElements}>Fetch Elements</button>
                    </div>
                )}
            </div>
        )
    }
}

window.customElements.define('custom-elements', customElements)
