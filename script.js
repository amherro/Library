let addBtn = document.querySelector('.addBtn');
let submitBook = document.querySelector('.submitBook');
let newBookForm = document.querySelector('.newBookForm')
let bookDisplay = document.querySelector('.displayArea')

addBtn.addEventListener('click', () => {
    newBookForm.style.display = 'block';
})


function Book (title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}


submitBook.addEventListener('click', (e) => {
    e.preventDefault();

    let bookTitle = document.querySelector('[data-title]').value;
    let bookAuthor = document.querySelector('[data-author]').value;
    let bookPages = document.querySelector('[data-pages]').value;
    let bookRead = document.querySelector('.hasRead')
    let brandNewBook = new Book(bookTitle, bookAuthor, bookPages, bookRead)
    
    
    function addBook() { 
        //Add a New Book to Library
        let newBook = document.createElement('div');
        newBook.classList.add('newEntry');

        newBook.textContent = `Title: ${brandNewBook.title} Author: ${brandNewBook.author} 
        Pages: ${brandNewBook.pages}`

        //Toggle Read Status
        let readSection = document.createElement('button')
        if(bookRead.checked == true){
            readSection.classList.add('readToggle')
            readSection.textContent = 'I have read this book!';
            newBook.appendChild(readSection);
        } else {
            readSection.classList.add('readToggle')
            readSection.textContent = 'I have not read this book yet!';
            newBook.appendChild(readSection);
        }
        readSection.addEventListener('click', () => {
            if(readSection.textContent === 'I have read this book!') {
                readSection.textContent = 'I have not read this book yet!'
            } else if (readSection.textContent === 'I have not read this book yet!') {
                readSection.textContent = 'I have read this book!'
            }
        })

        //Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'X';
        newBook.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            newBook.style.display = 'none';
        })

        bookDisplay.appendChild(newBook); 
    }
    addBook();


    function clearInput() {
        document.querySelector('.title').value = '';
        document.querySelector('.author').value = '';
        document.querySelector('.pages').value = '';
    }
    clearInput();
})