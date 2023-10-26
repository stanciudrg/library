// The array which contains the book objects created by the Book constructor

const libraryArray = [];

// Call addBookToLibrary function upon clicking the form "Add book" button 

const submitButton = document.querySelector(".add-book").addEventListener('click', addBookToLibrary);

// Add different functionalities for each button within the book element

const booksContainer = document.querySelector('#books-container').addEventListener('click', bookActions);

// Show the dialog containing the form upon clicking the "New book" button

const showForm = document.querySelector('.new-book').addEventListener('click', (e) => {

    document.querySelector('.add-icon').style.transform = "rotate(90deg)"

    setTimeout(() => {

        document.querySelector('dialog').showModal();
        document.querySelector('.add-icon').style.transform = "rotate(0)";

    }, 500);


});

// Close the dialog containing the form and reset the form upon clicking the "X" button 

const closeForm = document.querySelector('.close-button').addEventListener('click', (e) => {

    document.querySelector('dialog').close();
    document.querySelector('form').reset();
    document.querySelector('.new-book').blur();

})

// Limit the length of number inputs to their ignored max-length values defined in HTML

const numberInputs = document.querySelectorAll('input[type="number"]').forEach((numberInput) => {

    let valueBeforeInput = numberInput.value;

    numberInput.addEventListener('input', (e) => {

        if (numberInput.value.length > numberInput.maxLength) { numberInput.value = valueBeforeInput }

        valueBeforeInput = numberInput.value;

    })

})

// The Book constructor object, which takes the title, author, year of publication, number of pages and the default "false" readState of a book
// and uses the information to create a book object which is inserted into the libraryArray array and create a book element which is
// inserted into the #books-container container declared in HTML

function Book(title, author, publicationYear, pages, readState) {

    // The book element itself, AKA the main book container, which shares the same dataset number as its index within the libraryArray array

    this.bookElement = document.createElement('div');
    this.bookElement.classList.add('book');
    this.bookElement.dataset.count = libraryArray.length;

    // The title section of the book element

    this.title = title ? title : "No title";
    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('title');
    this.titleElement.textContent = this.title;

    // The author section of the book element

    this.author = author;
    this.authorElement = document.createElement('div');
    this.authorElement.classList.add('author');

    // Display different information when no author is provided by the user

    if (!this.author) {
        this.authorElement.textContent = "Unknown author";
    } else {
        this.authorText = document.createElement('span');
        this.authorText.textContent = 'By:';
        this.authorText.style.fontWeight = 'bold';
        this.authorValue = document.createElement('span');
        this.authorValue.textContent = this.author;
        this.authorElement.appendChild(this.authorText);
        this.authorElement.appendChild(this.authorValue);
    }

    // The year of publication section of the book element

    this.publicationYear = Number(publicationYear);
    this.publicationYearElement = document.createElement('div');
    this.publicationYearElement.classList.add('publication-year');
    this.publicationYearText = document.createElement('span');
    this.publicationYearText.textContent = 'Year of publication: ';
    this.publicationYearValue = document.createElement('span');
    this.publicationYearValue.textContent = publicationYear;

    // Display different information when no year of publication is provided by the user

    if (!this.publicationYear) {
        this.publicationYearElement.textContent = "Unknown year of publication"
    } else {
        this.publicationYearText = document.createElement('span');
        this.publicationYearText.textContent = 'Year of publication:';
        this.publicationYearText.style.fontWeight = 'bold';
        this.publicationYearValue = document.createElement('span');
        this.publicationYearValue.textContent = publicationYear;
        this.publicationYearElement.appendChild(this.publicationYearText);
        this.publicationYearElement.appendChild(this.publicationYearValue);
    }

    // The number of pages section of the book element

    this.pages = Number(pages);
    this.pagesElement = document.createElement('div');
    this.pagesElement.classList.add('pages');
    this.pagesValue = document.createElement('span');
    this.pagesValue.textContent = this.pages;
    this.pagesText = document.createElement('span');
    this.pagesText.textContent = 'pages';

    // Display different information when no number of pages is provided by the user

    if (!this.pages) {
        this.pagesElement.textContent = "Unknown number of pages";
    } else {
        this.pagesValue = document.createElement('span');
        this.pagesValue.textContent = this.pages;
        this.pagesValue.style.fontWeight = 'bold';
        this.pagesText = document.createElement('span');
        this.pagesText.textContent = 'pages';
        this.pagesElement.appendChild(this.pagesValue);
        this.pagesElement.appendChild(this.pagesText);
    }

    // The read state toggler section of the book element

    this.readState = readState;
    this.readStateElement = document.createElement('div');
    this.readStateElement.classList.add('read-state_toggler');
    this.readStateText = document.createElement('span');
    this.readStateText.textContent = "Mark as read"
    this.readStateLabel = document.createElement('label');
    this.readStateInput = document.createElement('input');
    this.readStateInput.setAttribute('type', 'checkbox');
    this.readStateInput.setAttribute('aria-label', 'Mark as read');
    this.readStateInput.classList.add("read-state_input")
    this.readStateToggler = document.createElement('span');

    // Toggle .read class on the book element when the readState of the book object is changed

    this.readState ? this.bookElement.classList.add('read') : this.bookElement.classList.remove('read');
    this.readState ? this.readStateInput.checked = true : this.readStateInput.checked = false;

    this.readStateLabel.appendChild(this.readStateInput);
    this.readStateLabel.appendChild(this.readStateToggler);
    this.readStateElement.appendChild(this.readStateText);
    this.readStateElement.appendChild(this.readStateLabel);

    // The Delete Book button displayed on the top-right section of the book element

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-button');
    this.deleteButton.setAttribute('aria-label', 'Delete book');
    this.deleteIcon = document.querySelector('#delete-icon').cloneNode(true);
    this.deleteIcon.style.display = "block";
    this.deleteButton.appendChild(this.deleteIcon);

    // Appending all sections into the book element, which is further appended into the #books-container

    this.bookElement.appendChild(this.titleElement);
    this.bookElement.appendChild(this.deleteButton);
    this.bookElement.appendChild(this.authorElement);
    this.bookElement.appendChild(this.publicationYearElement);
    this.bookElement.appendChild(this.pagesElement);
    this.bookElement.appendChild(this.readStateElement);

    document.querySelector('#books-container').appendChild(this.bookElement);

}

// toggleReadState prototype method, which toggles the .read class on the book element and the 
// readState status of the book object 

Book.prototype.toggleReadState = function () {

    this.readState == false ? this.readState = true : this.readState = false;
    this.bookElement.classList.toggle('read');

}

// removeBook prototype method, which removes the book element from the #books-container and the book object from the libraryArray array in the same time 
// by using the dataset.count of the book element. The function deletes both the book element and the book object in the same time.

Book.prototype.removeBook = function () {

    this.bookElement.style.opacity = "0";
    const removeElement = () => this.bookElement.remove();
    setTimeout(removeElement, 300);
    libraryArray.splice(this.bookElement.dataset.count, 1);

    // Goes through the libraryArray array after each book is deleted, and refreshes the index of all book objects
    // to match the dataset.count of book elements

    libraryArray.forEach((object) => {
        object.bookElement.dataset.count = libraryArray.indexOf(object);
    })

}

// The addBookToLibrary function, which is called upon clicking the "Add book" button within the form
// The default form submit behavior is prevented. as it is not needed in this case, and a new bookObject is
// created by calling the Book constructor using user input values for each argument.

function addBookToLibrary(e) {

    e.preventDefault();

    const formData = new FormData(document.querySelector("form"));
    const bookObject = new Book(formData.get("title"), formData.get("author"), formData.get("publication-year"), formData.get("pages-number"), false);

    libraryArray.push(bookObject);
    document.querySelector('dialog').close();
    document.querySelector('.new-book').blur();
    document.querySelector('form').reset();

}

// The bookActions function calls different methods of the Book prototype based on the button clicked.
// The function retrieves the dataset.count value of the book element on which the click event was triggered
// and uses it to link the book element with the book object, then calls the method on the book object

function bookActions(e) {

    if (e.target.classList.contains('read-state_input')) {

        const elementIndex = e.target.parentElement.parentElement.parentElement.dataset.count;
        libraryArray[elementIndex].toggleReadState(e);

    } else if (e.target.classList.contains('delete-button')) {

        const elementIndex = e.target.parentElement.dataset.count;
        libraryArray[elementIndex].removeBook();

    }

}

