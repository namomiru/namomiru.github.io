let searchInput = document.getElementById('search-input');
let searchResults = document.getElementById('search-results');
let posts = [];

// search.json 파일에서 포스트 데이터를 로드합니다.
fetch('/search.json')
  .then(response => response.json())
  .then(data => posts = data)
  .catch(error => console.error('Error loading search data:', error));

// 검색 버튼 클릭 또는 입력 시 검색 함수 호출
document.getElementById('search-button').addEventListener('click', searchPosts);
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') searchPosts(); // Enter 키로 검색 실행
});

// 검색 기능 구현
function searchPosts() {
  let query = searchInput.value.toLowerCase();
  let results = posts.filter(post => 
    post.title.toLowerCase().includes(query) || 
    post.content.toLowerCase().includes(query)
  );
  
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
