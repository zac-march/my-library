const mainDiv = document.querySelector("main");
const bookCardTemplate = document.querySelector("#bruh");
const newBookBtn = document.querySelector("#new-book");
const formContainer = document.querySelector(".form-overlay");
const form = document.querySelector("#new-book-form");
let readButtons = document.querySelectorAll(".book-read");
let removeButtons = document.querySelectorAll(".book-remove");

function Library(list) {
  this.list = list;
}

Library.prototype.remove = function (index) {
  if (index == 0) {
    this.list.splice(index, 1);
  } else {
    this.list.splice(index, index);
  }
};

Library.prototype.add = function (book) {
  this.list.push(book);
};

Library.prototype.getBook = function (index) {
  return this.list[index];
};

let library = new Library([]);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasRead = function () {
  return this.read ? "read" : "not read yet";
};

Book.prototype.toggleRead = function () {
  return this.read == true ? (this.read = false) : (this.read = true);
};

function addBook() {
  let book = new Book(...arguments);
  library.add(book);
}

function updateLibraryDisplay() {
  mainDiv.innerHTML = "";
  library.list.forEach((book, index) => {
    let bookElement = bookCardTemplate.cloneNode(true);
    bookElement.querySelector(".book-title").textContent = book.title;
    bookElement.querySelector(".book-author").textContent = book.author;
    bookElement.querySelector(".book-pages").textContent = book.pages;
    bookElement.querySelector(".book-read").textContent = book.hasRead();
    bookElement.style.display = "grid";
    bookElement.setAttribute("data-index", index);
    mainDiv.appendChild(bookElement);
  });
  setReadListeners();
  setRemoveListeners();
}

function setReadListeners() {
  readButtons = document.querySelectorAll(".book-read");
  readButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      let bookIndex = e.target.parentElement.getAttribute("data-index");
      library.getBook(bookIndex).toggleRead();
      updateLibraryDisplay();
    });
  });
}

function setRemoveListeners() {
  removeButtons = document.querySelectorAll(".book-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      let bookIndex = e.target.parentElement.getAttribute("data-index");
      library.remove(bookIndex);
      updateLibraryDisplay();
      console.log(bookIndex);
    });
  });
}

newBookBtn.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

formContainer.addEventListener("click", (e) => {
  if (e.target == formContainer) {
    formContainer.style.display = "none";
    form.reset();
  }
});

form.onsubmit = (e) => {
  e.preventDefault();
  addBook(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked,
    library.list.length
  );
  updateLibraryDisplay();
  formContainer.style.display = "none";
  form.reset();
};

document.addEventListener(
  "keydown",
  (event) => {
    if (event.code == "Numpad8") {
      generateFakeEntries(5);
      updateLibraryDisplay();
      console.log(library.list);
    }
  },
  false
);

function generateFakeEntries(count) {
  for (i = 0; i < count; i++) {
    addBook(generateString(), generateString(), 2, false);
  }

  function generateString() {
    return (Math.random() + 1).toString(36).substring(2);
  }
}
