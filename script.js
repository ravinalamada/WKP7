console.log('works');
// References
const container = document.querySelector('.container');
const formEl = document.querySelector('.form');
const tbodyEl = document.querySelector('#book-list');
const addButton = document.querySelector('.add-btn');

// The array object of book that will be displayed before a user will add a new book

const library = [
  {
    title: 'Harry Potter',
    author: 'JK Rowling',
    genre: 'Fantasy',
    pages: '323',
  },

  {
    title: 'The Philosopher Stone',
    author: 'JK Rowling',
    genre: 'Fantasy',
    pages: '323',
  },

  {
    title: 'A walk to remember',
    author: 'Juillet',
    genre: 'Fantasy',
    pages: '400',
  }
]

// This will dispaly the book from the array of an object above

const generateBook = () => {
  const html = library.map(item => `
        <tr class="body-row">
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.genre}</td>
          <td>${item.pages}</td>
          <td><input type="checkbox" class="status"></td>
          <td><button class="delete"><svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5ZM1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6Z" fill="#747474"/>
          </svg>
          </button></td>
        </tr>
    `).join('');
  tbodyEl.innerHTML = html;
}; generateBook();

// Creat an empty array that will store the book which will be pushed in
let books = [];

// This handle the submit form

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const title = form.title.value;
  const author = form.author.value;
  const genre = form.genre.value;
  const pages = form.pages.value;
  const status = form.status.value;

  const book = {
    title: title,
    author: author,
    genre: genre,
    pages: pages,
    status: status,
    id: Date.now()
  };
  books.push(book);
  event.target.reset();
  tbodyEl.dispatchEvent(new CustomEvent('itemsUpdated'));
};

// This will dispaly the book after the user submit
const displayBook = () => {
  const html = books.map(item => `
        <tr class="body-row" id="${item.id}">
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.genre}</td>
          <td>${item.pages}</td>
          <td><input type="checkbox" class="status" ${item.status === 'read' ? 'checked' : ''}></td>
          <td>
            <button type="button" class="delete">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5ZM1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6Z" fill="#747474"/>
              </svg>
            </button>
          </td>
        </tr>
    `).join('');
  tbodyEl.insertAdjacentHTML('beforeend', html);
};

// Store the book in the local storage
const setToLocalStorage = () => {
  const objectStringyfy = JSON.stringify(books);
  localStorage.setItem('books', objectStringyfy);
};

const restoreFromLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem('books'));
  console.log(list);

  // Check if there is something if of the list
  if (list) {
    books.push(...list);
    tbodyEl.dispatchEvent(new CustomEvent('itemsUpdated'));
  };
};

// find the id of the book
const markAsComplete = id => {
  console.log(id);
  const bookRef = books.find(book => book.id === id);
  bookRef.status = !bookRef.status;
  tbodyEl.dispatchEvent(new CustomEvent('itemsUpdated'));
};

// handle the checkbox
tbodyEl.addEventListener('click', function (e) {
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  };
});

// Delete the book item
const handleDeleteBtn = (e) => {
  e.target.closest('.body-row').remove();

};

// Listen to all of the events
formEl.addEventListener('submit', handleSubmit);
tbodyEl.addEventListener('itemsUpdated', displayBook);
tbodyEl.addEventListener('itemsUpdated', setToLocalStorage);
tbodyEl.addEventListener('click', handleDeleteBtn);

restoreFromLocalStorage();
