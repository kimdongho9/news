// const API_KEY = `f92a158943c1483e814a7bf93bce3bbb`;



// async 사용해야 await 사용가능
const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  let newsList = [];
  const menus = document.querySelectorAll(".menus button");

  menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

  console.log(menus)

  // 과제용
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines`);

  // url api 가져옴
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render(newsList); // render 함수에 newsList 전달
};


const getNewsByCategory = async (event) => {

  // 카테고리 소문자로 바꾸고 정렬하기
  const category = event.target.textContent.toLowerCase();
  console.log("category", category)
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines?category=${category}`);
  const response = await fetch(url);
  const data = await response.json(); 
  console.log("Ddd", data)
  newsList = data.articles
  render(newsList)
};


// 키워드로 검색하기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword)
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines?q=${keyword}`)
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data)
  newsList = data.articles
  render(newsList)
}




const render = (newsList) => { // newsList를 인자로 받도록 수정
  const newsHTML = newsList.map(
    (news) => `<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size"
      src="${news.urlToImage}"/>
  </div>
  <div class="col-lg-8">
    <h2> ${news.title} </h2>
    <p>
      ${news.description}
    </p>
    <div>
      ${news.source.name} * ${news.publishedAt}
    </div>
  </div>
</div>`
  ).join(''); // join으로 배열의 ,를 지울수 있다.

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
  let inputArea = document.getElementById("input-area")
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none"
  } else {
    inputArea.style.display = "inline"
  }
};

window.onload = () => {
  document.getElementById("input-area").style.display = "none";
};

//1. 버튼틀에 클릭 이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기