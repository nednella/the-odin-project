import './style.css'
import { home } from  './js/home'
import { about } from './js/about'
import { menu } from './js/menu'
import { contact } from './js/contact'

const navOptions = document.querySelectorAll('.nav-btn')
const content = document.getElementById('content')

setActive('home')
home()

function setActive(id) {
    navOptions.forEach(option => {
        if (option.classList.contains('active')) {
            option.classList.remove('active')
        }
        if (id == option.id) {
            option.classList.add('active')
        }
    })
}

function renderContent(id) {
    content.innerHTML = ''
    setActive(id)
    switch(id) {
        case 'home':
            console.log('render home')
            home()
            break
        case 'about':
            console.log('render about')
            about()
            break
        case 'menu':
            console.log('render menu')
            menu()
            break
        case 'contact':
            console.log('render contact')
            contact()
            break
    }
}

navOptions.forEach(option => {
    option.addEventListener('click', () => renderContent(option.id))
})

export { content }