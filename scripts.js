class Library {

    #initialized;

    init() {

        // init() method initializes the Library app by calling the bindEvents() function.
        // init() is automatically being called at the end of this document. An error
        // is thrown if attempting to initialize the app multiple times
        if (this.#initialized) { throw new TypeError("Library already initialized") }

        console.log("Welcome! Type 'library' and press enter to see what's inside.");
        this.#initialized = true;
        this.#bindEvents();

    }

    // The books array is where all Book objects created by the Book class
    // are stored. It is also used to connect the Book objects with their
    // visual DOM representation using the array index and dataset attribute
    #books = [];

    // Caching the DOM
    #submitBookButton = document.querySelector(".add-book");
    #booksContainer = document.querySelector('#books-container');
    #newBookButton = document.querySelector('.new-book');
    #newBookIcon = document.querySelector('.add-icon');
    #dialog = document.querySelector('dialog');
    #form = document.querySelector('form');
    #numberInputs = document.querySelectorAll('input[type="number"]');
    #closeFormButton = document.querySelector('.close-button');
    #deleteIcon = document.querySelector('#delete-icon');

    // Discover the DOM books container and the deleteIcon, as they will
    // be used by the Book objects to render their content and add the
    // functionality to remove the book from both the DOM and the books array
    get booksContainer() { return this.#booksContainer; };
    get deleteIcon() { return this.#deleteIcon };

    #bindEvents() {

        this.#newBookButton.addEventListener('click', this.#showForm.bind(this));
        this.#closeFormButton.addEventListener('click', this.#closeForm.bind(this));
        this.#submitBookButton.addEventListener('click', this.#addToLibrary.bind(this));
        // For each of the two number inputs, record their current value, then
        // call the limitInput function
        this.#numberInputs.forEach((input) => {

            let valueBeforeInput = input.value;
            input.addEventListener('input', this.#limitInput);

        })

    }

    #limitInput(e) {
        // This method takes advantage of the already stored valueBeforeInput to prevent
        // the user from entering additional characters into the input when the 
        // input value length reaches the input's maxlength value.
        if (e.target.value.length > e.target.maxLength) { e.target.value = this.valueBeforeInput };
        this.valueBeforeInput = e.target.value;

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

    #addToLibrary(e) {

        e.preventDefault();
        // Retrieve the value of each input
        const formData = new FormData(this.#form);
        // Create a new book object using the value of each input as arguments
        const book = new Book(formData.get("title"), formData.get("author"), formData.get("publication-year"), formData.get("pages-number"), false);
        // Run the render() method defined on the Book class to create and display the 
        // visual representation of the Book object
        book.render();
        // Add the book object in the books array
        this.#books.push(book);
        this.#dialog.close();
        this.#newBookButton.blur();
        this.#form.reset();

    }

    removeBook(target) {
        // Prevents deleting non book elements
        if (target == undefined || target.parentElement !== this.#booksContainer) { throw new TypeError("The argument must contain an already existing DOM element") }

        target.style.opacity = "0";
        // Remove the book element from the DOM...
        setTimeout(() => { target.remove() }, 300);
        // ...and also remove the book Object from the array...
        this.#books.splice(target.dataset.count, 1);
        // ...and refresh the index of each Book object and the dataset of each book element
        // to keep them connected
        this.#books.forEach((book, index) => { book.container.dataset.count = index; })

    }

}

class Book {

    #container

    #title;
    #author;
    #publicationYear;
    #pages;
    #readState;

    constructor(title, author, publicationYear, pages, readState) {

        // The book element itself, the father of all DOM elements created by this class
        this.#container = document.createElement('div');

        this.#title = title ? title : "No title";
        this.#author = author ? author : "Unknown author";
        this.#publicationYear = publicationYear ? Number(publicationYear) : "Unknown year of publication";
        this.#pages = pages ? Number(pages) : "Unknown number of pages";
        this.#readState = readState;

    }

    // Discover the book element in order to be used as argument
    // for calling the removeBook method of the Library class (see bellow);
    get container() { return this.#container; }

    render() {

        // Use the 'count' dataset attribute to add an index number to each
        // instance of the Book class, which is used by the Library class
        // to connect each Book object with their DOM visual representation by
        // synchronizing the index of the object within the array with the
        // dataset number of the book element within its container
        this.#container.dataset.count = library.booksContainer.children.length;
        // Then call the helper create function to add a class to the book element
        // and append it to the booksContainer DOM element
        this.#create(this.#container, 'book', '', library.booksContainer);

        // After the book element is created and appended, create and append all its children
        this.#renderTitle();
        this.#renderDeleteButton();
        this.#renderAuthor();
        this.#renderPublicationYear();
        this.#renderPages();
        this.#renderReadState();

    }

    #create(element, elementClass, elementTextContent, elementParent) {
        // Helper function to simplify the process of manipulating the DOM
        // and keeping things DRY
        if (elementClass !== '') { element.classList.add(elementClass); }
        if (elementTextContent !== '') { element.textContent = elementTextContent };
        elementParent.appendChild(element);

    };

    // The remove method which further calls the removeBook method of the Library class
    // while passing the current book element as the argument
    #remove() { library.removeBook(this.#container); }

    #toggleReadState() {
        // Toggle the readState value of the Book object and the 'read' class of the book element
        this.#readState == false ? this.#readState = true : this.#readState = false;
        this.#container.classList.toggle('read');

    }

    #renderTitle() {
        // Render the title element
        const titleElement = document.createElement('h3');
        this.#create(titleElement, 'title', this.#title, this.#container);

    }

    #renderDeleteButton() {
        // Render the delete button and add a click event listener which
        // calls the remove() method defined above
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('aria-label', 'Delete book');
        deleteButton.addEventListener('click', this.#remove.bind(this))
        this.#create(deleteButton, 'delete-button', '', this.#container);
        // Clone an already existing deleteIcon which is hidden from view and
        // add it to each book element. This method is used to eliminate the need
        // of manually creating and inserting the SVG on each instance of the Book class.
        // Please note: this project was focused solely on practicing JavaScript Classes.
        // While working on this project, I was not yet aware about JavaScript modules and the import and
        // export syntax. This is the workaround that came into my mind at that point in time.
        const deleteIcon = library.deleteIcon.cloneNode(true);
        deleteIcon.style.display = 'block';
        this.#create(deleteIcon, '', '', deleteButton);

    }

    #renderAuthor() {

        const authorElement = document.createElement('div');

        // If the author is unknown (not provided), just create the element 
        // and add the "Unknown author" text inside it
        if (this.#author == "Unknown author") { return this.#create(authorElement, 'author', this.#author, this.#container); }
        // Otherwise create two spans, one containing the 'By: ' static text and one containing
        // the author name
        this.#create(authorElement, 'author', '', this.#container);

        const authorText = document.createElement('span');
        this.#create(authorText, 'author-text', 'By:', authorElement);

        const authorValue = document.createElement('span');
        this.#create(authorValue, '', this.#author, authorElement);

    }

    #renderPublicationYear() {

        const publicationYearElement = document.createElement('div');

        // If the publicationYear is unknown (not provided), just create the element
        // and add the "Unknown year of publication" text inside it
        if (this.#publicationYear == "Unknown year of publication") { return this.#create(publicationYearElement, 'publication-year', this.#publicationYear, this.#container); }

        // Otherwise create two spans, one containing the 'Year of publication: ' static text and one containing
        // the publication year
        this.#create(publicationYearElement, 'publication-year', '', this.#container);

        const publicationYearText = document.createElement('span');
        this.#create(publicationYearText, 'publication-year_text', 'Year of publication: ', publicationYearElement);

        const publicationYearValue = document.createElement('span');
        this.#create(publicationYearValue, '', this.#publicationYear, publicationYearElement);

    }

    #renderPages() {

        const pagesElement = document.createElement('div');

        // If the number of pages is unknown (not provided), just create the element
        // and add the "Unknown number of pages" text inside it
        if (this.#pages == "Unknown number of pages") { return this.#create(pagesElement, 'pages', this.#pages, this.#container) }

        // Otherwise create two spans, one containing the number of pages and one containing the 'pages' static text
        this.#create(pagesElement, 'pages', '', this.#container);

        const pagesValue = document.createElement('span');
        this.#create(pagesValue, 'pages-value', this.#pages, pagesElement);

        const pagesText = document.createElement('span');
        this.#create(pagesText, '', 'pages', pagesElement);

    }

    #renderReadState() {

        const readStateElement = document.createElement('div');
        this.#create(readStateElement, 'read-state_toggler', '', this.#container);

        // This is the skeleton for the custom toggler designed using CSS
        // The toggler has an event listener attached, which calls the toggleReadState
        // defined above.
        const readStateText = document.createElement('span');
        this.#create(readStateText, '', 'Mark as read', readStateElement);

        const readStateLabel = document.createElement('label');
        this.#create(readStateLabel, '', '', readStateElement);

        const readStateInput = document.createElement('input');
        readStateInput.addEventListener('change', this.#toggleReadState.bind(this));
        readStateInput.setAttribute('type', 'checkbox');
        readStateInput.setAttribute('aria-label', 'Mark as read');
        this.#create(readStateInput, 'read-state_input', '', readStateLabel);

        const readStateToggler = document.createElement('span');
        this.#create(readStateToggler, '', '', readStateLabel);

    }

}

const library = new Library();
library.init()
