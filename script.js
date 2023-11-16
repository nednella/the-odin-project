// JavaScript



// Modal
const modal = document.getElementById('modal')
const modalOpen = document.getElementById('modal-open')
const modalClose = document.getElementById('modal-close')
const addBookSubmit = document.getElementById('add-book-submit')

modalOpen.addEventListener('click', () => {
    modal.showModal()
})
modalClose.addEventListener('click', () => {
    modal.close()
})
modal.addEventListener('click', (e) => {
    if (e.target.nodeName == 'DIALOG') {
        modal.close()
    }
})
