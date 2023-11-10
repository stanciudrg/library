class Library {

    #submitBookButton = document.querySelector(".add-book");
    #booksContainer = document.querySelector('#books-container');
    #newBookButton = document.querySelector('.new-book');
    #newBookIcon = document.querySelector('.add-icon');
    #dialog = document.querySelector('dialog');
    #form = document.querySelector('form');
    #numberInputs = document.querySelectorAll('input[type="number"');
    #closeFormButton = document.querySelector('.close-button');
    #deleteIcon = document.querySelector('#delete-icon');

    #bindEvents() {

        this.#newBookButton.addEventListener('click', this.#showForm.bind(this));
        this.#closeFormButton.addEventListener('click', this.#closeForm.bind(this));
        this.#submitBookButton.addEventListener('click', this.#addToLibrary.bind(this));

        this.#numberInputs.forEach((input) => {

            let valueBeforeInput = input.value;
            input.addEventListener('input', this.#limitInput);

        })

    }

    #showForm() { }

    #closeForm() { }

    #limitInput() { }

    #addToLibrary() { }

}