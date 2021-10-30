// Book Class
class Book {
    constructor(title, author, pages, boookRead) {
        this.title = title;
        this.author = author; 
        this.pages = pages;
        this.boookRead = boookRead;
    }
}

//Library Class
class Library {
    static showBook = () => {

        // Call .getBook() method from UserStorage class

        const storedBooks = [
            {
                title: 'Harry Potter',
                author: 'JK Rowling',
                pages: '597',
                bookRead: true,
            },
            {
                title: 'A Game of Thrones',
                author: 'George RR Martin',
                pages: '997',
                bookRead: false,
            }
        ]
        const bookList = storedBooks

        bookList.forEach((book) => Library.addBook(book))
    }
    static addBook = (book) => {
        const displayArea = document.querySelector('.displayArea');
        let newBook = document.createElement('div');
        newBook.classList.add('newEntry');

        let newTitle = document.createElement('div')
        newTitle.classList.add('newTitle', 'cardItem');
        newBook.appendChild(newTitle);
        newTitle.textContent = `Title: ${book.title}`

        let newAuthor = document.createElement('div')
        newAuthor.classList.add('newAuthor', 'cardItem');
        newBook.appendChild(newAuthor);
        newAuthor.textContent = `Author: ${book.author}`
        
        let newPages = document.createElement('div')
        newPages.classList.add('newPages', 'cardItem');
        newPages.textContent = `Pages: ${book.pages}`
        newBook.appendChild(newPages);

        const bookRead = document.querySelector('.hasRead').checked;
        let readSection = document.createElement('button')
        readSection.classList.add('readToggle')
        if(bookRead == true){
            readSection.textContent = 'Read';
        } else {
            readSection.textContent = 'Not Read';
        }
        newBook.appendChild(readSection);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'X';
        newBook.appendChild(deleteBtn);

        displayArea.appendChild(newBook); 
    }
    static clearInput = () => {
        document.querySelector('.title').value = '';
        document.querySelector('.author').value = '';
        document.querySelector('.pages').value = '';
        document.querySelector('.hasRead').value = '';
    }

    static deleteBook = (item) => {
        if(item.classList.contains('deleteBtn')) {
            item.parentElement.remove() 
        }
    }
    static toggleBookRead = (button) => {
        if(button.classList.contains('readToggle')) {
            if(button.textContent === 'Read') {
                button.textContent = 'Not Read'
            } else if (button.textContent === 'Not Read') {
                button.textContent = 'Read'
            }
        }
    }
}

//Storage Class
// class UserStorage {
//     getBook = () => {

//     }
//     addBook = () => {

//     }
//     updateReadStatus = () => {

//     }
//     removeBook = () => {

//     }
// }

// Display book in library
document.addEventListener('DOMContentLoaded', Library.showBook)

// Toggle Add Button
const addButton = document.querySelector('.addBtn');
addButton.addEventListener('click', () => {
    addButton.style.display = 'none';
    document.querySelector('.addBook').style.display = 'block';
})

// Close Button
const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', () => {
    document.querySelector('.addBook').style.display = 'none';
    addButton.style.display = 'block';
})

// Add book
document.querySelector('.submitBook').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('[data-title]').value;
    const author = document.querySelector('[data-author]').value;
    const pages = document.querySelector('[data-pages]').value;
    const bookRead = document.querySelector('.hasRead').checked;

    const book = new Book(title, author, pages, bookRead)

    Library.addBook(book)

    Library.clearInput();
})

// Delete book
document.querySelector('.displayArea').addEventListener('click', (e) => {
    e.preventDefault();
    Library.deleteBook(e.target)
})

// Mark book as Read/Not Read
document.querySelector('.displayArea').addEventListener('click', (e) => {
    e.preventDefault();
    Library.toggleBookRead(e.target);
})