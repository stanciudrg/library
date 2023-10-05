function Book(title, author, pages, readState) {

    this.title = title ? title : "No title"
    this.author = author ? author : "No author"
    this.pages = pages ? Number(pages) : "No";
    this.readState = readState ? true : false;

}

