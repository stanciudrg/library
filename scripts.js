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

    #create(element, elementClass, elementTextContent, elementParent) {

        if (elementClass !== '') { element.classList.add(elementClass); }
        if (elementTextContent !== '') { element.textContent = elementTextContent };
        elementParent.appendChild(element);

    };

}