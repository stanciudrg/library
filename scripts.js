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

}