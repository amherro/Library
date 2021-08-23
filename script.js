function Library() {
    let addBtn = document.querySelector('.addBtn');
    let libraryTitle = document.querySelector('.libraryTitle')
    let submitBook = document.querySelector('.submitBook');
    let newBookForm = document.querySelector('.newBookForm')
    let bookDisplay = document.querySelector('.displayArea')

    addBtn.addEventListener('click', () => {
        newBookForm.style.display = 'block';
        addBtn.style.display = 'none';
        libraryTitle.style.marginTop = '70px'
    })

    const library = [];

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
        let book = new Book(bookTitle, bookAuthor, bookPages, bookRead)
        
        
        function addBook() { 
            //Add a New Book to Library
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

            bookDisplay.appendChild(newBook); 

            library.push(newBook.textContent);

            //Toggle Read Status
            let readSection = document.createElement('button')
            if(bookRead.checked == true){
                readSection.classList.add('readToggle')
                readSection.textContent = 'Read';
                newBook.appendChild(readSection);
            } else {
                readSection.classList.add('readToggle')
                readSection.textContent = 'Not Read';
                newBook.appendChild(readSection);
            }
            readSection.addEventListener('click', () => {
                if(readSection.textContent === 'Read') {
                    readSection.textContent = 'Not Read'
                } else if (readSection.textContent === 'Not Read') {
                    readSection.textContent = 'Read'
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
        }
        addBook();


        function clearInput() {
            document.querySelector('.title').value = '';
            document.querySelector('.author').value = '';
            document.querySelector('.pages').value = '';
        }
        clearInput();
    })}

Library();