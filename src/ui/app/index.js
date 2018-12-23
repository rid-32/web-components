import dom from 'dom'

import 'ui/githubRepo'

const names = [
    'charliewilco/obsidian',
    'charliewilco/level.css',
    'charliewilco/react-branches',
    'charliewilco/react-gluejar',
    'charliewilco/dotfiles',
]

const attrs = {
    hello: 'hello',
}

export default (
    <div class="Wrapper">
        {names.map(name => (
            <github-repo name={name} {...attrs}>
                <b>Strong</b>
                <i>Italic</i>
                Simple
            </github-repo>
        ))}
    </div>
)
