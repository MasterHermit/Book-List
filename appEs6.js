class books {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class uis {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
          
          `;
    list.appendChild(row);
  }
  clearf() {
    document.getElementById("title").value = " ";
    document.getElementById("author").value = " ";
    document.getElementById("isbn").value = " ";
  }
  showAlert(mes, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.textContent = mes;
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}
class store {
  static getBooks() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }
//   static displayBooks() {
//     const bookss = store.getBooks();
//   }
  static addBooks(book) {
    const bookss = store.getBooks();
    bookss.push(book);
    localStorage.setItem("items",JSON.stringify(bookss));
    
  }
  static removeBooks(isbn) {
      const item=store.getBooks();
      item.forEach((itm,index) => {
          if(itm.isbn===isbn){
              item.splice(index,1);
          }
          
      });
      localStorage.setItem("items",JSON.stringify(item));

  }
}
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new books(title, author, isbn);
  const ui = new uis();
  store.addBooks(book);

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert(`add fields `, "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert(`Successfully Added..`, "success");
    ui.clearf();
  }

  e.preventDefault();
});
document.getElementById("book-list").addEventListener("click", removeDiv);
function removeDiv(e) {
  const ui = new uis();
  ui.deleteBook(e.target);
  store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert(`Book removed..`, "success");

  e.preventDefault();
}
