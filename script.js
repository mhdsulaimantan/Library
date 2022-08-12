// DOM elements
const newBookBtn = document.querySelector('.add');
const displayTableBtn = document.querySelector('.display');
const fieldset = document.querySelector('fieldset');
const table = document.querySelector('table');
const form = document.querySelector('.new-book')
const add = document.querySelector('#submit')

// data retrieve from form
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numOfPages = document.querySelector('#pages');
const read = document.querySelector('#read');

// listener for new book button 
newBookBtn.addEventListener('click', () => {
    if (fieldset.hasAttribute('hidden')) fieldset.removeAttribute('hidden');
    else fieldset.setAttribute('hidden', true);
});

// listener for display books button
displayTableBtn.addEventListener('click', () => {
    if (table.hasAttribute('hidden')) table.removeAttribute('hidden');
    else table.setAttribute('hidden', true);
});

// listener for the add button in the new book form
add.addEventListener('click', addBookToLibrary);

let myLibrary = [];

// Constructor book
function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read
}

// change the status of read
Book.prototype.changeRead = function () {
    this.read ? this.read = false : this.read = true;
}

function addBookToLibrary() {
    const book = new Book(title.value,
        author.value,
        numOfPages.value,
        read.checked ? true : false);

    myLibrary.push(book);
    form.reset();
    addToTable(book);
    alert('Book added successfully');
}

// adding new book for the books table
function addToTable(bookInfo) {
    row = table.insertRow();

    colTitle = row.insertCell(0);
    colTitle.textContent = bookInfo.title;
    
    colAuthor = row.insertCell(1);
    colAuthor.textContent = bookInfo.author;
    
    colPages = row.insertCell(2);
    colPages.textContent = bookInfo.numOfPages;

    colRead = row.insertCell(3);
    colRead.textContent = bookInfo.read ? 'Yes' : 'No';
    // add and input type checkbox to change the status of the book read in future
    const inputCheckBox = document.createElement('input');
    inputCheckBox.type = "checkbox";
    inputCheckBox.checked = bookInfo.read;
    inputCheckBox.classList.add('checkbox-read');
    colRead.appendChild(inputCheckBox);

    // create a delete button to delete a book from the table
    colDelete = row.insertCell(4);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete');
    colDelete.appendChild(delBtn);

    tableChange();
}

// every time a change in the table happen 
function tableChange() {
    let checkboxList = document.querySelectorAll('.checkbox-read');
    let deleteBtns = document.querySelectorAll('.delete');

    // listener for all the checkbox inputs in the table 
    checkboxList.forEach((box, index) => box.addEventListener('change', () => {
        let bookInfo = myLibrary[index];
        if (bookInfo != null) {
            bookInfo.changeRead();
            colRead = table.rows[index + 1].cells[3];
            colRead.textContent = bookInfo.read ? 'Yes' : 'No';
            const inputCheckBox = document.createElement('input');
            inputCheckBox.type = "checkbox";
            inputCheckBox.checked = bookInfo.read;
            inputCheckBox.classList.add('checkbox-read');
            colRead.appendChild(inputCheckBox);
            tableChange();
        }
    }));

    // listener for all the delete buttons in the table
    deleteBtns.forEach((btn, index) => btn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        row = btn.parentNode.parentNode;
        if (row.parentNode != null) row.parentNode.removeChild(row);

        tableChange();
    }));
}