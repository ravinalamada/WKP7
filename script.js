console.log('works');

const container = document.querySelector('.container');
const formEl = document.querySelector('.form');
const tableRow = document.querySelector('tbody');
const addButton = document.querySelector('.add-btn');


const library = [
  {
    title: 'Harry Potter and the Philosopher Stone',
    author: 'JK Rowling',
    genre: 'Fantasy',
    pages: '323',
    status: 'true',
  },

  {
   title: 'Harry Potter and the Philosopher Stone',
    author: 'JK Rowling',
    genre: 'Fantasy',
    pages: '323',
    status: 'true',
  },

  {
    title: 'Harry Potter and the Philosopher Stone',
    author: 'JK Rowling',
    genre: 'Fantasy',
    pages: '323',
    status: 'true',
  }
]
  // items = [];

  // const handleSubmit = (event) => {
  //   console.log(event.target);
  //   event.preventDefault;
  //   const name = event.currentTarget.item.value;
  //   if(!name) return;

  //   const item = {

  //   }

  //   items.push(item);
  //   list.dispatchEvent(new CustomEvent('itemsUpdated'));

  // }

  const generateBook = () => {
    // e.preventDefault();
    const html = library.map(item => `
        <tr>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.genre}</td>
          <td>${item.pages}</td>
          <button class="delete">Delete</button>
        </tr>
    `).join('');
    console.log(html);
    tableRow.innerHTML = html;
  };generateBook();

