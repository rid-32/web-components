import dom from 'dom'

class githubRepo extends HTMLElement {
    constructor() {
        super()

        this.repoDetails = null
    }

    async connectedCallback() {
        const name = this.getAttribute('name')

        this.repoDetails = {
            owner: {
                avatar_url:
                    'https://avatars1.githubusercontent.com/u/4588060?v=4',
            },
            full_name: name,
            description: 'A Modular CSS Library',
        }

        this.initShadowDOM()
    }

    initShadowDOM() {
        let shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.appendChild(this.template)
    }

    get template() {
        const repo = this.repoDetails
        const children = Array.prototype.slice.call(this.childNodes)

        if (repo.message) {
            return <div class="Card Card--error">Error: {repo.message}</div>
        } else {
            return (
                <div class="Card">
                    <aside>
                        <img
                            width="48"
                            height="48"
                            class="Avatar"
                            src={repo.owner.avatar_url}
                        />
                        {children}
                    </aside>
                    <header>
                        <h2 class="Card__title">{repo.full_name}</h2>
                        <span class="Card__meta">{repo.description}</span>
                    </header>
                </div>
            )
        }
    }
}

window.customElements.define('github-repo', githubRepo)
