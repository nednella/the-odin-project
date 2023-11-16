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



// Library Display
function reloadLibrary() {
    tableBody.innerHTML = ''
    let arrayIndex = 0
    myLibrary.forEach(book => {
        let newRow = tableBody.insertRow(-1)
        for (property in book) {
            let newCell = newRow.insertCell(-1)
            if (property == 'read') {
                if (book[property] == true) {
                    newCell.innerHTML = `<span class="material-symbols-outlined book-read" data-key="${arrayIndex}">check</span>`
                } else {
                    newCell.innerHTML = `<span class="material-symbols-outlined book-unread" data-key="${arrayIndex}">close</span>`
                }
            } else {
                newCell.innerHTML = book[property]
            }
        }
        newCell = newRow.insertCell(-1)
        newCell.innerHTML = `<span class="material-symbols-outlined book-remove" data-key="${arrayIndex}">delete</span>`
        arrayIndex++
    })
    // let testing = tableBody.rows[1]
    // console.log(testing)
}



// Refresh Library
window.onload = () => {
    reloadLibrary()
}
