const searchBar = document.getElementById('search-bar');
const bookSection = document.getElementById('book-section');
const searchNumber = document.getElementById('search-result');


const searchBook = () => {
  const searchText = searchBar.value;
  searchBar.value = '';
  console.log(searchText);
  
  const url = `http://openlibrary.org/search.json?q=${searchText}`;

  fetch(url)
  .then(res => res.json())
  .then(data => totalSearchResult(data.numFound));

  fetch(url)
  .then(res => res.json())
  .then(data => bookName(data.docs));
};

const totalSearchResult = (number) => {
  searchNumber.textContent = '';
  const p = document.createElement('p');
  p.classList.add('text-white', 'text-center');
  if(number === 0){
    p.innerText = `No result found`;
  }
  else{
    p.innerText = `${number} results found`;
  }
  searchNumber.appendChild(p);
};



const bookName = (books) => {
  //console.log(books);
  bookSection.textContent = '';

  books.forEach((book) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card m-5" style="width: 18rem;">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Author Name: ${book.author_name}</li>
        <li class="list-group-item">Publisher: ${book.publisher}</li>
        <li class="list-group-item">First Published: ${book.first_publish_year}</li>
      </ul>
    </div>
  `;
  bookSection.appendChild(div);
  });
};
  


