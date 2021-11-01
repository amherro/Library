// Book Class
class Book {
    constructor(title, author, pages, bookRead) {
        this.title = title;
        this.author = author; 
        this.pages = pages;
        this.bookRead = bookRead;
    }
}

//Library Class
class Library {
    static showBook = () => {
        const bookList = UserStorage.getBooks();

        bookList.forEach((book) => Library.addBook(book))
    }
    static addBook = (book) => {
        const displayArea = document.querySelector('.displayArea');
        let newBook = document.createElement('div');
        newBook.classList.add('newEntry');

        let newTitle = document.createElement('div')
        newTitle.classList.add('newTitle', 'cardItem');
        newBook.appendChild(newTitle);
        newTitle.textContent = `${book.title}`

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

// Local Storage Class
class UserStorage {
    static getBooks = () => {
        let booksInStorage;

        if(localStorage.getItem('booksInStorage') === null) {
            booksInStorage = [];
        } else {
            booksInStorage = JSON.parse(localStorage.getItem('booksInStorage'));
        }
        return booksInStorage;
    }
    static addBook = (book) => {
        const currentBookList = UserStorage.getBooks();
        currentBookList.push(book);
        localStorage.setItem('booksInStorage', JSON.stringify(currentBookList));
    }
    static removeBook = (title) => {
        const currentBookList = UserStorage.getBooks();
        let index = currentBookList.findIndex((book) => {
            if(title === book.title) {
                return true;
            }
        })
        currentBookList.splice(index, 1)
        localStorage.setItem('booksInStorage', JSON.stringify(currentBookList));
    }
}

// Display book in library
document.addEventListener('DOMContentLoaded', Library.showBook)

// Toggle Add Button
const addButton = document.querySelector('.addBtn');
addButton.addEventListener('click', () => {
    addButton.style.display = 'none';
    document.querySelector('.addBook').style.display = 'block';
})

// Close Form Button
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

    // Add Book to UI
    Library.addBook(book)

    // Add Book to Local Storage
    UserStorage.addBook(book); 

    // Clear Input Fields
    Library.clearInput();
})


// Delete Book
document.querySelector('.displayArea').addEventListener('click', (e) => {
    e.preventDefault();
    Library.deleteBook(e.target);
    UserStorage.removeBook(`${e.target.parentElement.firstChild.textContent}`)
})

// Mark book as Read/Not Read
document.querySelector('.displayArea').addEventListener('click', (e) => {
    e.preventDefault();
    Library.toggleBookRead(e.target);
})