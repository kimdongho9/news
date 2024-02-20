// const API_KEY = `f92a158943c1483e814a7bf93bce3bbb`;
const API_KEY = `f92a158943c1483e814a7bf93bce3bbb`;


const getLatestNews = async () => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

  const response = await fetch(url);
  const data = await response.json()

  let news = data.articles;
  console.log("dddd", news);

}

getLatestNews();