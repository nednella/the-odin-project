// JavaScript

const createBtn = document.getElementById('create-btn')
const inputs = document.getElementById('signup').querySelectorAll('input')

createBtn.addEventListener('click', () => {
    inputs.forEach(input => {
        input.addEventListener('invalid', () => {
            input.classList.add('invalid')
        })             
    })
})