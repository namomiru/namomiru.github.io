// search.js

let searchInput = document.getElementById('search-input');
let searchResults = document.getElementById('search-results');
let posts = [];

// search.json 파일에서 포스트 데이터를 로드합니다.
fetch('/search.json')
  .then(response => response.json())
  .then(data => posts = data);

// 검색 기능 구현
function searchPosts() {
  let query = searchInput.value.toLowerCase();
  let results = posts.filter(post => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query));
  
  displayResults(results);
}

// 검색 결과를 표시하는 함수
function displayResults(results) {
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchResults.innerHTML = '<p>No results found</p>';
    return;
  }

  results.forEach(result => {
    let resultItem = document.createElement('div');
    resultItem.classList.add('search-result');
    
    resultItem.innerHTML = `
      <h3><a href="${result.url}">${result.title}</a></h3>
      <p>${result.date}</p>
    `;
    
    searchResults.appendChild(resultItem);
  });
}
