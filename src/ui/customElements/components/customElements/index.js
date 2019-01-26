import jsx, { Component } from 'custom-elements-jsx'

class customElements extends Component {
    onClick = () => {
        this.props.state.value++

        this.update()
    }

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
                        <button onClick={this.onClick}>
                            {String(this.props.state.value)}
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

// Check that the element hasn't already been registered
if (!window.customElements.get('custom-elements'))
    window.customElements.define('custom-elements', customElements)
