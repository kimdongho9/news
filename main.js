// const API_KEY = `f92a158943c1483e814a7bf93bce3bbb`;
const urlFetch = async (url) => {
  let newsList = [];
  // url api 가져옴
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render(newsList); // render 함수에 newsList 전달
};

// async 사용해야 await 사용가능
const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

  const menus = document.querySelectorAll(".menus button");
  menus.forEach((menu) =>
    menu.addEventListener("click", (event) => getNewsByCategory(event))
  );

  console.log(menus);

  // 과제용
  const url = new URL(
     `https://celadon-zabaione-c1d562.netlify.app/top-headlines`
  );

  urlFetch(url);
};

//카테고리로 분류하기
const getNewsByCategory = async (event) => {
  // 카테고리 소문자로 바꾸고 정렬하기
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://celadon-zabaione-c1d562.netlify.app/top-headlines?category=${category}`
  );
  urlFetch(url);
};

// 키워드로 검색하기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://celadon-zabaione-c1d562.netlify.app/top-headlines?q=${keyword}`
  );
  urlFetch(url);
};

//news보드 나오게 하기
const render = (newsList) => {
  // newsList를 인자로 받도록 수정
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size"
      src="${news.urlToImage}"/>
  </div>
  <div class="col-lg-8">
    <h4> ${news.title} </h4>
    <p>
      ${news.description}
    </p>
    <div>
      ${news.source.name} * ${news.publishedAt}
    </div>
  </div>
</div>`
    )
    .join(""); // join으로 배열의 ,를 지울수 있다.

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();


const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};


const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};


window.onload = () => {
  document.getElementById("input-area").style.display = "none";
};



let page = 1; // 가져올 페이지 수
let isFetching = false; //데이터를 가져오는 중인지 여부를 나타내는 변수
let hasMore = true; //가져올 더 많은 데이터가 있는지 여부를 나타내는 변수



// document.body.scrollHeight: body(페이지 전체)의 높이를 나타냄

window.addEventListener('scroll', () => {
  // 데이터를 가져오는 중이 아니고, 더 가져올 데이터가 있고, 스크롤을 페이지 맨 하단에 도달했을 때 컨텐츠 추가
  if (!isFetching && hasMore && (window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    
    loadMoreContent();
  }
});



async function loadMoreContent() {
  isFetching = true; //데이터 가져오는 중

  // 로딩 아이콘이 로딩 중 보이게끔.
  document.getElementById('loader').style.display = 'block';

  setTimeout(async () => {
    try {
      
      const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines?page=${page}`);
      
      // 새로운 페이지의 뉴스를 가져옴.
      const data = await urlFetch(url);

      // 페이지를 1씩 증가.
      page++;


      // 만약 데이터가 더 이상 없으면.
      if (data.length === 0) {
        hasMore = false;
        return;
      }
      

    } catch (error) {
      // 에러 발생시 메시지.
      console.error('Error fetching news:', error);
      
    } finally {

      // 로딩 아이콘을 숨김.
      document.getElementById('loader').style.display = 'none';
      isFetching = false;
    }
  }, 1000); // 1초의 텀을 두고 로딩 표시기를 화면에 나타냅니다.
}






//1. 버튼틀에 클릭 이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
