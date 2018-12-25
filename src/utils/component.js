class Component extends HTMLElement {
    _componentShadowRoot = this.attachShadow({ mode: 'open' })

    state = {}

    _setChildren() {
        this.props.children = this.childNodes.length
            ? Array.prototype.slice.call(this.childNodes)
            : null
    }

    connectedCallback() {
        this._setChildren()

        this._componentShadowRoot.appendChild(this.render())
    }

    update() {
        if (this._componentShadowRoot.children.length) {
            this._componentShadowRoot.replaceChild(
                this.render(),
                this._componentShadowRoot.children[0]
            )
        }
    }

    setState(newState) {
        this.state = { ...newState }

        this.update()
    }

    render() {
        return null
    }
}

export default Component
