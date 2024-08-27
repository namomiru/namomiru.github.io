// search.json 파일을 비동기로 가져오기
async function fetchSearchData() {
  try {
    const response = await fetch('/search.json'); // search.json 파일의 경로를 정확히 설정
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching search data:', error);
    return [];
  }
}

// 검색 기능 구현
async function searchPosts() {
  const query = document.getElementById('search-input').value.toLowerCase(); // 사용자가 입력한 검색어
  const searchResultsContainer = document.getElementById('search-results'); // 검색 결과를 표시할 요소
  searchResultsContainer.innerHTML = ''; // 기존 검색 결과 초기화

  if (!query) return; // 검색어가 없을 경우 함수 종료

  const searchData = await fetchSearchData(); // search.json 파일에서 데이터를 가져옴

  const filteredResults = searchData.filter(post => {
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  });

  // 검색 결과가 없는 경우
  if (filteredResults.length === 0) {
    searchResultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  // 검색 결과를 HTML로 표시
  filteredResults.forEach(post => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('search-result');
    resultItem.innerHTML = `
      <h2><a href="${post.url}">${post.title}</a></h2>
      <p>${post.content.substring(0, 100)}...</p> <!-- 컨텐츠 미리보기 길이를 조정 -->
      <p><em>${post.date}</em></p>
    `;
    searchResultsContainer.appendChild(resultItem);
  });
}

// 검색 버튼 클릭 이벤트 핸들러
document.getElementById('search-button').addEventListener('click', searchPosts);
