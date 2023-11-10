class Library {

    #initialized;

    init() {

        if (this.#initialized) { throw new TypeError("Library already initialized") }

        console.log("Welcome! Type 'library' and press enter to see what's inside.");
        this.#initialized = true;
        this.#bindEvents();

    }

    #books = [];

    #submitBookButton = document.querySelector(".add-book");
    #booksContainer = document.querySelector('#books-container');
    #newBookButton = document.querySelector('.new-book');
    #newBookIcon = document.querySelector('.add-icon');
    #dialog = document.querySelector('dialog');
    #form = document.querySelector('form');
    #numberInputs = document.querySelectorAll('input[type="number"');
    #closeFormButton = document.querySelector('.close-button');
    #deleteIcon = document.querySelector('#delete-icon');

    get booksContainer() { return this.#booksContainer; };
    get deleteIcon() { return this.#deleteIcon };

    #bindEvents() {

        this.#newBookButton.addEventListener('click', this.#showForm.bind(this));
        this.#closeFormButton.addEventListener('click', this.#closeForm.bind(this));
        this.#submitBookButton.addEventListener('click', this.#addToLibrary.bind(this));

        this.#numberInputs.forEach((input) => {

            let valueBeforeInput = input.value;
            input.addEventListener('input', this.#limitInput);

        })

    }

    #showForm() {

        this.#newBookIcon.style.transform = "rotate(90deg)";

        setTimeout(() => {

            this.#dialog.showModal();
            this.#newBookIcon.style.transform = "rotate(0)";

        }, 500);

    }

    #closeForm() {

        this.#dialog.close();
        this.#form.reset();
        this.#newBookButton.blur();

    }

    #limitInput(e) {

        if (e.target.value.length > e.target.maxLength) { e.target.value = this.valueBeforeInput };
        this.valueBeforeInput = e.target.value;

    }

    #addToLibrary() { }

}

class Book {

    #container

    #title;
    #author;
    #publicationYear;
    #pages;
    #readState;

    constructor(title, author, publicationYear, pages, readState) {

        this.#container = document.createElement('div');

        this.#title = title ? title : "No title";
        this.#author = author ? author : "Unknown author";
        this.#publicationYear = publicationYear ? Number(publicationYear) : "Unknown year of publication";
        this.#pages = pages ? Number(pages) : "Unknown number of pages";
        this.#readState = readState;

    }

    render() {

        this.#container.dataset.count = library.booksContainer.children.length;
        this.#create(this.#container, 'book', '', library.booksContainer);

    }

    #create(element, elementClass, elementTextContent, elementParent) {

        if (elementClass !== '') { element.classList.add(elementClass); }
        if (elementTextContent !== '') { element.textContent = elementTextContent };
        elementParent.appendChild(element);

    };

    #renderTitle() {

        const titleElement = document.createElement('h3');
        this.#create(titleElement, 'title', this.#title, this.#container);

    }

    #renderAuthor() {

        const authorElement = document.createElement('div');

        if (this.#author == "Unknown author") { return this.#create(authorElement, 'author', this.#author, this.#container); }

        this.#create(authorElement, 'author', '', this.#container);

        const authorText = document.createElement('span');
        this.#create(authorText, 'author-text', 'By:', authorElement);

        const authorValue = document.createElement('span');
        this.#create(authorValue, '', this.#author, authorElement);

    }

    #renderPublicationYear() {

        const publicationYearElement = document.createElement('div');

        if (this.#publicationYear == "Unknown year of publication") { return this.#create(publicationYearElement, 'publication-year', this.#publicationYear, this.#container); }

        this.#create(publicationYearElement, 'publication-year', '', this.#container);

        const publicationYearText = document.createElement('span');
        this.#create(publicationYearText, 'publication-year_text', 'Year of publication: ', publicationYearElement);

        const publicationYearValue = document.createElement('span');
        this.#create(publicationYearValue, '', this.#publicationYear, publicationYearElement);

    }

    #renderPages() {

        const pagesElement = document.createElement('div');

        if (this.#pages == "Unknown number of pages") { return this.#create(pagesElement, 'pages', this.#pages, this.#container) }

        this.#create(pagesElement, 'pages', '', this.#container);

        const pagesValue = document.createElement('span');
        this.#create(pagesValue, 'pages-value', this.#pages, pagesElement);

        const pagesText = document.createElement('span');
        this.#create(pagesText, '', 'pages', pagesElement);

    }

}

const library = new Library;