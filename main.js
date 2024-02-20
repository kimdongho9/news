// const API_KEY = `f92a158943c1483e814a7bf93bce3bbb`;



//async 사용해야 await 사용가능
const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);



  //과제용
  const url = new URL(`https://celadon-zabaione-c1d562.netlify.app/top-headlines?q=${keyword}`);

  //url api 가져옴
  const response = await fetch(url);
  const data = await response.json()

  let news = data.articles;
  console.log("dddd", news);

}

getLatestNews();