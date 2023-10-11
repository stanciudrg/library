const libraryArray = [];
const submitButton = document.querySelector(".add-book").addEventListener('click', addBookToLibrary);
const booksContainer = document.querySelector('#books-container').addEventListener('click', bookActions);

const showForm = document.querySelector('.new-book').addEventListener('click', (e) => document.querySelector('dialog').showModal());

const closeForm = document.querySelector('.close-button').addEventListener('click', (e) => {

    e.preventDefault();
    document.querySelector('dialog').close();
    document.querySelector('form').reset();

})

function Book(title, author, publicationYear, pages, readState) {

    this.bookElement = document.createElement('div');
    this.bookElement.classList.add('book');
    this.bookElement.dataset.count = libraryArray.length;

    this.title = title ? title : "No title"
    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('title');
    this.titleElement.textContent = this.title;

    this.author = author;
    this.authorElement = document.createElement('div');
    this.authorElement.classList.add('author');

    if (!this.author) {
        this.authorElement.textContent = "Unknown author";
    } else {
        this.authorText = document.createElement('span');
        this.authorText.textContent = 'By:';
        this.authorText.style.fontWeight = '600';
        this.authorValue = document.createElement('span');
        this.authorValue.textContent = this.author;
        this.authorElement.appendChild(this.authorText);
        this.authorElement.appendChild(this.authorValue);
    }

    this.publicationYear = Number(publicationYear);
    this.publicationYearElement = document.createElement('div');
    this.publicationYearElement.classList.add('publication-year');
    this.publicationYearText = document.createElement('span');
    this.publicationYearText.textContent = 'Year of publication: ';
    this.publicationYearValue = document.createElement('span');
    this.publicationYearValue.textContent = publicationYear;

    if (!this.publicationYear) {
        this.publicationYearElement.textContent = "Unknown year of publication"
    } else {
        this.publicationYearText = document.createElement('span');
        this.publicationYearText.textContent = 'Year of publication:';
        this.publicationYearText.style.fontWeight = '600';
        this.publicationYearValue = document.createElement('span');
        this.publicationYearValue.textContent = publicationYear;
        this.publicationYearElement.appendChild(this.publicationYearText);
        this.publicationYearElement.appendChild(this.publicationYearValue);
    }

    this.pages = Number(pages);
    this.pagesElement = document.createElement('div');
    this.pagesElement.classList.add('pages');
    this.pagesValue = document.createElement('span');
    this.pagesValue.textContent = this.pages;
    this.pagesText = document.createElement('span');
    this.pagesText.textContent = 'pages';

    if (!this.pages) {
        this.pagesElement.textContent = "Unknown number of pages";
    } else {
        this.pagesValue = document.createElement('span');
        this.pagesValue.textContent = this.pages;
        this.pagesValue.style.fontWeight = '600';
        this.pagesText = document.createElement('span');
        this.pagesText.textContent = 'pages';
        this.pagesElement.appendChild(this.pagesValue);
        this.pagesElement.appendChild(this.pagesText);
    }


    this.readState = readState ? true : false;
    this.readStateToggler = document.createElement('button');
    this.readStateToggler.classList.add('read-state_toggler');
    this.readState ? this.readStateToggler.textContent = "Read" : this.readStateToggler.textContent = "Not read yet";
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
    this.bookElement.appendChild(this.publicationYearElement);
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
    const bookObject = new Book(formData.get("title"), formData.get("author"), formData.get("publication-year"), formData.get("pages-number"), formData.get("read-state"));

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