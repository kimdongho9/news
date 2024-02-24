// const API_KEY = `f92a158943c1483e814a7bf93bce3bbb`;
const urlFetch = async (url) => {
  try {
    //이 안에서 에러가 발생하면
    //이안에서 에러가 발생하면
   // url api 가져옴
   const response = await fetch(url);
   const data = await response.json();


   if(response.status === 200){
    if(data.articles.length===0){
      throw new Error("No result for this search")
    }
    newsList = data.articles;
    render();
   }else {
    throw new Error(data.message);
   }
   newsList = data.articles;
   render(newsList); // render 함수에 newsList 전달


  } catch (error) {
    //catch가 에러를 잡아준다.
    errorRender(error.message);
  }
  
  
}


// async 사용해야 await 사용가능
const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  let newsList = [];
  const menus = document.querySelectorAll(".menus button");

  menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

  console.log(menus)

  // 과제용
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines`);

  
  urlFetch(url)
};


const getNewsByCategory = async (event) => {

  // 카테고리 소문자로 바꾸고 정렬하기
  const category = event.target.textContent.toLowerCase();
  console.log("category", category)
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines?category=${category}`);

  urlFetch(url)
};


// 키워드로 검색하기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword)
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines?q=${keyword}`)
  
  urlFetch(url)
}




const render = (newsList) => { // newsList를 인자로 받도록 수정

  // newsList가 정의되어 있지 않으면 빈 배열로 초기화
  newsList = newsList || []; 

  
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class = "alert alert-danger" role = "alert">
  ${errorMessage}
  </div>;`

  document.getElementById("news-board").innerHTML = errorHTML
}


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