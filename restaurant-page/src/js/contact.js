import { content } from '../index'

function render() {

    const div = () => document.createElement('div')
    const h3 = () => document.createElement('h3')
    const p = () => document.createElement('p')
    const br = () => document.createElement('br')
    const i = () => document.createElement('i')
    const form = () => document.createElement('form')
    const label = () => document.createElement('label')
    const input = () => document.createElement('input')
    const textarea = () => document.createElement('textarea')
    const btn = () => document.createElement('button')

    const contact = div()
    contact.className = 'contact'

    contact.appendChild(div()).className = 'info'
    contact.appendChild(div()).className = 'message'
    
    const info = contact.querySelector('.info')
    info.appendChild(div()).className = 'location'
    info.appendChild(div()).className = 'opening-times'
    info.appendChild(div()).className = 'get-in-touch'
    info.appendChild(div()).className = 'socials'
    
    const location = info.querySelector('.location')
    location.appendChild(h3()).textContent = 'location'
    location.appendChild(p()).textContent = '27 Moseley Street'
    location.appendChild(p()).textContent = 'Newcastle Upon Tyne'
    location.appendChild(p()).textContent = 'NE1 1DF'

    const openingTimes = info.querySelector('.opening-times')
    openingTimes.appendChild(h3()).textContent = 'opening times'
    openingTimes.appendChild(p()).textContent = 'Mon - Fri'
    openingTimes.appendChild(p()).textContent = '12:00 - 23:00'
    openingTimes.appendChild(br())
    openingTimes.appendChild(p()).textContent = 'Sat - Sun'
    openingTimes.appendChild(p()).textContent = '12:00 - 01:00'

    const phone = info.querySelector('.get-in-touch')
    phone.appendChild(h3()).textContent = 'get in touch'
    phone.appendChild(p()).textContent = '0191 261 2027'

    const socials = info.querySelector('.socials')
    socials.appendChild(i()).className = 'fab fa-brands fa-facebook'
    socials.appendChild(i()).className = 'fab fa-brands fa-twitter'
    socials.appendChild(i()).className = 'fab fa-brands fa-instagram'


    const message = contact.querySelector('.message')
    message.appendChild(h3()).textContent = 'send us a message,'
    message
        .append(Object.assign(message.appendChild(form()),
            {
                action: '#',
                method: '#',
                id: 'contactForm',
            }
        ))
    
    const myForm = message.querySelector('#contactForm')
    for (let i = 1; i <= 4; i++) {
        if (i == 4) {
            myForm 
                .append(Object.assign(myForm.appendChild(btn()),
                    {
                        id: 'submit',
                        textContent: 'Submit',
                    }
                ))  
        } else {
            myForm  
            .appendChild(div())
            .className = `form-input input-${i}`
        
            const formBox = myForm.querySelector(`.input-${i}`)
            if (i == 1) {
                formBox.appendChild(label()).for = 'name'
                formBox.append(Object.assign(formBox.appendChild(input()),
                    {
                        required: true,
                        placeholder: 'John Smith',
                        type: 'text',
                        id: 'name',
                    }
                ))
            } else if (i == 2) {
                formBox.appendChild(label()).for = 'email'
                formBox.append(Object.assign(formBox.appendChild(input()),
                    {
                        required: true,
                        placeholder: 'your@email.com',
                        type: 'email',
                        id: 'email',
                        pattern: '\\S+@\\S+',
                    }
                ))
            } else {
                formBox.appendChild(label()).for = 'email'
                formBox.append(Object.assign(formBox.appendChild(textarea()),
                    {
                        required: true,
                        placeholder: 'Let us know how we can help!',
                        id: 'message',
                    }
                ))
            }
        } 
    }

    content.append(contact)
}

export { render as contact }