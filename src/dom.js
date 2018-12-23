const isSVG = element => {
    const patt = new RegExp(`^${element}$`, 'i')
    const SVGTags = ['path', 'svg', 'use', 'g']

    return SVGTags.some(tag => patt.test(tag))
}

const objectToStyleString = (styles = {}) => {
    return Object.keys(styles)
        .map(prop => `${prop}: ${styles[prop]}`)
        .join(';')
}

const addAttributes = (element, attrs = {}) => {
    const props = Object.keys(attrs)

    props.forEach(prop => {
        if (prop === 'style') {
            // e.g. origin: <element style={{ prop: value }} />
            element.style.cssText = objectToStyleString(attrs[prop])
        } else if (prop === 'ref' && typeof attrs.ref === 'function') {
            attrs.ref(element, attrs)
        } else if (prop === 'className') {
            element.setAttribute('class', attrs[prop])
        } else if (prop === 'xlinkHref') {
            element.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                attrs[prop]
            )
        } else if (prop === 'dangerouslySetInnerHTML') {
            // eslint-disable-next-line no-underscore-dangle
            element.innerHTML = attrs[prop].__html
        } else {
            // any other prop will be set as attribute
            element.setAttribute(prop, attrs[prop])
        }
    })

    return element
}

const createFragmentFrom = children => {
    // fragments will help later to append multiple children to the initial node
    const fragment = document.createDocumentFragment()

    function processDOMNodes(child) {
        if (
            child instanceof HTMLElement ||
            child instanceof SVGElement ||
            child instanceof Comment ||
            child instanceof DocumentFragment
        ) {
            fragment.appendChild(child)
        } else if (typeof child === 'string' || typeof child === 'number') {
            const textnode = document.createTextNode(child)
            fragment.appendChild(textnode)
        } else if (child instanceof Array) {
            child.forEach(processDOMNodes)
        } else if (child === false || child === null) {
            // expression evaluated as false e.g. {false && <Elem />}
            // expression evaluated as false e.g. {null && <Elem />}
        } else if (process.env.NODE_ENV === 'development') {
            // later other things could not be HTMLElement nor strings
            console.log(child, 'is not appendable')
        }
    }

    children instanceof Array
        ? children.forEach(processDOMNodes)
        : processDOMNodes(children)

    return fragment
}

const dom = (tagName, attrs, children) => {
    const element = isSVG(tagName)
        ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
        : document.createElement(tagName)

    // one or multiple will be evaluated to append as string or HTMLElement
    const fragment = createFragmentFrom(children)

    element.appendChild(fragment)

    return addAttributes(element, attrs)
}

export default dom
