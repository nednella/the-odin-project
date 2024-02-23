import { content } from '../index'

let menu = [
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    },
    {
        image: '',
        name: 'item name',
        price: '£0.00',
        description: 'item description',
    }
]

function render() {

    const div = () => document.createElement('div')
    const btn = () => document.createElement('button')

    const menuNav = div()
    menuNav.className = 'menu-nav'
    menuNav.appendChild(btn()).append('BRUNCH')
    menuNav.appendChild(btn()).append('DISHES')
    menuNav.appendChild(btn()).append('DRINKS')

    const menuScroll = div()
    menuScroll.className = 'menu-scroll'
    menuScroll.appendChild(div()).className = 'menu'

    const menuContainer = menuScroll.querySelector('.menu')
    menu.forEach((item, index) => {
        menuContainer
            .appendChild(div())
            .className = `menu-item item-${index + 1}`

        const itemContainer = menuContainer.querySelector(`.item-${index + 1}`)

        itemContainer
            .append(Object.assign(itemContainer.appendChild(div()),
                {
                    className: 'item-image',
                    textContent: item.image,
                }
        ))
        itemContainer
            .append(Object.assign(itemContainer.appendChild(div()),
                {
                    className: 'item-name',
                    textContent: item.name,
                }
        ))
        itemContainer
            .append(Object.assign(itemContainer.appendChild(div()),
                {
                    className: 'item-price',
                    textContent: item.price,
                }
        ))
        itemContainer
            .append(Object.assign(itemContainer.appendChild(div()),
                {
                    className: 'item-description',
                    textContent: item.description,
                }
        ))
    })

    content.append(menuNav, menuScroll)
}

export { render as menu }