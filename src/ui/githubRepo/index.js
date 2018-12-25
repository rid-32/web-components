import dom from 'dom'
import Component from 'utils/component'

class githubRepo extends Component {
    state = {
        value: 0,
    }

    repo = {
        owner: {
            avatar_url: 'https://avatars1.githubusercontent.com/u/4588060?v=4',
        },
        full_name: this.props.name,
        description: 'A Modular CSS Library',
    }

    incValue = () => {
        this.setState({ ...this.state, value: this.state.value + 1 })
    }

    decValue = () => {
        if (this.state.value > 0)
            this.setState({ ...this.state, value: this.state.value - 1 })
    }

    render() {
        return (
            <div class="Card">
                <aside>
                    <img
                        width="48"
                        height="48"
                        class="Avatar"
                        src={this.repo.owner.avatar_url}
                    />
                    {this.props.children}
                </aside>
                <header>
                    <h2 class="Card__title">{this.repo.full_name}</h2>
                    <span class="Card__meta">{this.repo.description}</span>
                </header>
                <button onClick={this.decValue}>Dec</button>
                <span>{this.state.value}</span>
                <button onClick={this.incValue}>Inc</button>
            </div>
        )
    }
}

window.customElements.define('github-repo', githubRepo)
