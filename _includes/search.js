// 요소들 가져오기
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let searchResults = document.getElementById('search-results');
let posts = [];

// 페이지 로드 시 search.json에서 데이터 로드
fetch('/search.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    posts = data;
    console.log('Posts loaded:', posts); // 데이터 로드 확인
  })
  .catch(error => console.error('Error loading search data:', error));

// 검색 버튼 클릭 시 검색 실행
searchButton.addEventListener('click', searchPosts);

// 입력 필드에서 Enter 키로 검색 실행
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') searchPosts(); // Enter 키로 검색 실행
});

// 검색 기능 구현
function searchPosts() {
  console.log('Search initiated'); // 검색 함수 호출 확인

  let query = searchInput.value.toLowerCase();
  let results = posts.filter(post => 
    post.title.toLowerCase().includes(query) || 
    post.content.toLowerCase().includes(query)
  );

  console.log('Results:', results); // 필터링된 결과 확인

  displayResults(results);
}

// 검색 결과를 표시하는 함수
function displayResults(results) {
  console.log('Displaying results:', results); // 결과 표시 확인

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
