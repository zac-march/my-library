const mainDiv = document.querySelector("main");
const bookCardTemplate = document.querySelector("#bruh");
const newBookBtn = document.querySelector("#new-book");
const formContainer = document.querySelector(".form-overlay");
const form = document.querySelector("#new-book-form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasRead = function () {
  return this.read ? "read" : "not read yet";
};

let library = [];

function addBook() {
  let book = new Book(...arguments);
  library.push(book);
}

function updateLibraryDisplay() {
  mainDiv.innerHTML = "";
  library.forEach((book) => {
    let bookElement = bookCardTemplate.cloneNode(true);
    bookElement.querySelector(".book-title").textContent = book.title;
    bookElement.querySelector(".book-author").textContent = book.author;
    bookElement.querySelector(".book-pages").textContent = book.pages;
    bookElement.querySelector(".book-read").textContent = book.hasRead();
    bookElement.style.display = "grid";
    mainDiv.appendChild(bookElement);
  });
}

newBookBtn.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

form.onsubmit = (e) => {
  console.log(document.getElementById("read"));
  e.preventDefault();
  addBook(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );
  updateLibraryDisplay();
  formContainer.style.display = "none";
};
