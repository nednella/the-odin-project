import { content } from '../index'

function render() {

    const div = () => document.createElement('div')
    const h1 = () => document.createElement('h1')
    const h2 = () => document.createElement('h2')
    const hr = () => document.createElement('hr')
    const btn = () => document.createElement('button')

    const home = div()
    home.className = 'home'

    home.appendChild(div()).className = 'home-title'
    home.appendChild(hr())
    home.appendChild(div()).className = 'home-buttons'

    const homeTitle = home.querySelector('.home-title')
    homeTitle.appendChild(h1()).textContent = 'Restaurant'
    homeTitle.appendChild(h2()).textContent = 'NAME'

    const homeBtns = home.querySelector('.home-buttons')
    homeBtns.appendChild(btn()).append('MENU')
    homeBtns.appendChild(btn()).append('RESERVE')

    content.append(home)
}

export { render as home }