const libraryArray = [];
const submitButton = document.querySelector(".add-book").addEventListener('click', addBookToLibrary);
const booksContainer = document.querySelector('#books-container').addEventListener('click', bookActions);

const showForm = document.querySelector('.new-book').addEventListener('click', (e) => document.querySelector('dialog').showModal());

const closeForm = document.querySelector('.close-button').addEventListener('click', (e) => {

    e.preventDefault();
    document.querySelector('dialog').close();
    document.querySelector('form').reset();

})

function Book(title, author, pages, readState) {

    this.title = title ? title : "No title"
    this.author = author ? author : "No author"
    this.pages = pages ? Number(pages) : "No";
    this.readState = readState ? true : false;

    this.bookElement = document.createElement('div');
    this.bookElement.classList.add('book');
    this.bookElement.dataset.count = libraryArray.length;

    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('title');
    this.titleElement.textContent = this.title;
    this.bookElement.appendChild(this.titleElement);

    this.authorElement = document.createElement('div');
    this.authorElement.classList.add('author');
    this.authorElement.textContent = `By: ${this.author}`;
    this.bookElement.appendChild(this.authorElement);

    this.pagesElement = document.createElement('div');
    this.pagesElement.classList.add('pages');
    this.pagesElement.textContent = `${this.pages} pages`;
    this.bookElement.appendChild(this.pagesElement);

    this.readStateElement = document.createElement('div');
    this.readStateElement.classList.add('read-state');
    this.readStateElement.textContent = this.readState ? "Read" : "Not read yet";
    this.bookElement.appendChild(this.readStateElement);

    this.readStateToggler = document.createElement('input');
    this.readStateToggler.classList.add('read-state_toggler');
    this.readStateToggler.setAttribute("type", "checkbox");
    this.readState ? this.readStateToggler.checked = true : this.readStateToggler.checked = false;
    this.bookElement.appendChild(this.readStateToggler);

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-button');
    this.deleteButton.textContent = "Remove book";
    this.bookElement.appendChild(this.deleteButton);

    document.querySelector('#books-container').appendChild(this.bookElement);

}

Book.prototype.toggleReadState = function () {

    this.readState == false ? this.readState = true : this.readState = false;
    this.readStateElement.textContent = this.readState ? "Read" : "Not read yet";

}

function addBookToLibrary(e) {

    e.preventDefault();

    const formData = new FormData(document.querySelector("form"));
    const bookObject = new Book(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read-state"));

    libraryArray.push(bookObject);
    document.querySelector('dialog').close();
    document.querySelector('form').reset();

}

function bookActions(e) {

    if (e.target.classList.contains('read-state_toggler')) {

        const elementIndex = e.target.parentElement.dataset.count;
        libraryArray[elementIndex].toggleReadState(e);

    }

}