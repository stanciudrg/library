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
    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('title');
    this.titleElement.textContent = this.title;

    this.author = author ? author : "No author"
    this.authorElement = document.createElement('div');
    this.authorElement.classList.add('author');
    this.authorElement.textContent = `By: ${this.author}`;

    this.pages = pages ? Number(pages) : "No";
    this.pagesElement = document.createElement('div');
    this.pagesElement.classList.add('pages');
    this.pagesElement.textContent = `${this.pages} pages`;

    this.readState = readState ? true : false;
    this.readStateToggler = document.createElement('button');
    this.readStateToggler.classList.add('read-state_toggler');
    this.readState ? this.readStateToggler.textContent = "READ" : this.readStateToggler.textContent = "Not read yet";
    this.readState ? this.readStateToggler.classList.add('read') : this.readStateToggler.classList.remove('read');

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-button');
    this.deleteIcon = document.querySelector('#delete-icon').cloneNode(true);
    this.deleteIcon.style.display = "block";
    this.deleteButton.appendChild(this.deleteIcon);

    this.bookElement = document.createElement('div');
    this.bookElement.classList.add('book');
    this.bookElement.dataset.count = libraryArray.length;
    this.bookElement.appendChild(this.titleElement);
    this.bookElement.appendChild(this.deleteButton);
    this.bookElement.appendChild(this.authorElement);
    this.bookElement.appendChild(this.pagesElement);
    this.bookElement.appendChild(this.readStateToggler);

    document.querySelector('#books-container').appendChild(this.bookElement);

}

Book.prototype.toggleReadState = function () {

    this.readState == false ? this.readState = true : this.readState = false;
    this.readStateToggler.textContent = this.readState ? "Read" : "Not read yet";
    this.readStateToggler.classList.toggle('read')

}

Book.prototype.removeBook = function () {

    this.bookElement.style.opacity = "0";
    const removeElement = () => this.bookElement.remove();
    setTimeout(removeElement, 300);
    libraryArray.splice(this.bookElement.dataset.count, 1);

    libraryArray.forEach((object) => {
        object.bookElement.dataset.count = libraryArray.indexOf(object);
    })

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

    } else if (e.target.classList.contains('delete-button')) {

        const elementIndex = e.target.parentElement.dataset.count;
        libraryArray[elementIndex].removeBook();

    }

}