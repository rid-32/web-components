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

const addAttributes = (element, attrs) => {
    const props = Object.keys(attrs || {})

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
    const fragment = document.createDocumentFragment()

    function processDOMNodes(child) {
        if (typeof child === 'string' || typeof child === 'number') {
            const textnode = document.createTextNode(child)
            fragment.appendChild(textnode)
        } else if (child instanceof Array) {
            child.forEach(processDOMNodes)
        } else if (!child) {
            // child is false, null or undefined. we do nothing
        } else {
            fragment.appendChild(child)
        }
    }

    children.forEach(processDOMNodes)

    return fragment
}

const dom = (tagName, attrs, ...children) => {
    const element = isSVG(tagName)
        ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
        : document.createElement(tagName)

    // one or multiple will be evaluated to append as string or HTMLElement
    const fragment = createFragmentFrom(children)

    element.appendChild(fragment)

    return addAttributes(element, attrs)
}

export default dom
