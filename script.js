const mainDiv = document.querySelector("main");
const bookCardTemplate = mainDiv.querySelector(".book-card");
mainDiv.querySelector(".book-card").remove();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let readStatus = this.read ? "read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

let library = [];

addBook("testing", "test", 22, false);
addBook("test", "tester", 20, false);
addBook("test", "tester", 20, false);
addBook("test", "tester", 20, false);
addBook("test", "tester", 20, false);
addBook("test", "tester", 20, false);
updateLibraryDisplay();

function addBook() {
  let book = new Book(...arguments);
  library.push(book);
}

function updateLibraryDisplay() {
  library.forEach((book) => {
    let bookElement = bookCardTemplate.cloneNode(true);
    bookElement.querySelector(".book-title").textContent = book.title;
    bookElement.querySelector(".book-author").textContent = book.author;
    bookElement.querySelector(".book-pages").textContent = book.pages;
    bookElement.querySelector(".book-read").textContent = book.read;
    mainDiv.appendChild(bookElement);
  });
}

console.log(library);
