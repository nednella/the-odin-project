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



// Library
const tableBody = document.getElementById('libraryTable').getElementsByTagName('tbody')[0]
const myLibrary = [
    {
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        pages: '300',
        read: true
    },
    {
        title: 'Lord of the Rings',
        author: 'J. R. R. Tolkien',
        pages: '900',
        read: false
    }
]

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}
