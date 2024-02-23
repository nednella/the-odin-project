import { content } from '../index'

function render() {

    const div = () => document.createElement('div')
    const h1 = () => document.createElement('h1')
    const h2 = () => document.createElement('h2')
    const hr = () => document.createElement('hr')
    const p = () => document.createElement('p')

    const about = div()
    about.className = 'about'

    about.appendChild(div()).className = 'about-title'
    about.appendChild(hr())
    about.appendChild(p())
         .append(
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam. Aliquam ultrices sagittis orci a scelerisque purus. Pulvinar elementum integer enim neque volutpat ac. Mattis nunc sed blandit libero volutpat sed. Libero id faucibus nisl tincidunt. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Suscipit tellus mauris a diam maecenas sed enim ut sem. Vel turpis nunc eget lorem. Sed risus ultricies tristique nulla aliquet enim. Vestibulum lectus mauris ultrices eros. Massa tempor nec feugiat nisl pretium.'
         )

    const aboutTitle = about.querySelector('.about-title')
    aboutTitle.appendChild(h1()).textContent = 'About'
    aboutTitle.appendChild(h2()).textContent = 'US'

    content.append(about)

}

export { render as about }