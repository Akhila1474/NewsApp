import './News.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import noimg from '../assets/images/noimg.png'
import NewsModel from './NewsModel';
const categories=['general','world','business','technology','entertainment','sports','science','health','nation'];
 const News = () => {
    const [headline,setHeadline]=useState(null);
    const [news,setNews]=useState([ ]);
    const [cat,setCat]=useState('general')
    const [showModel,setShowModel]=useState(false)
    const [selectedArticle,setSelectedArticle]=useState(null)
   useEffect(() => {
      // console.log("akhila");
  const fetchNews = async () => {
    try {
      const url = `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&apikey=d9a78ef3870fe429feae70cddc10235b`;
      const response = await axios.get(url); 
      const fetchedNews=response.data.articles;
fetchedNews.forEach((ele) => {
   if (!ele.image) {
       ele.image = noimg;  // Assuming `noimg` is a predefined variable.
   }
});
      // console.log("News Data:", fetchedNews[0]);
      setHeadline(fetchedNews[0]);
    setNews(fetchedNews.slice(1,7));
      
    } catch (error) {
      console.log("Error fetching news:", error); // ✅ Log API errors
    }
  };
 
  fetchNews();
}, [cat]);
const handleCategoryClick=(e,category)=>{
   e.preventDefault();
   setCat(category);
}
const handleArticleClick=(article)=>{
   setSelectedArticle(article);
   setShowModel(true);
}

  return (
    <div className='news-app'>
        <div className='news-header'>
            <h1 className='logo'>News App</h1>
        </div>
        <div className='news-content'>
            <nav className='navbar'>
                <h1 className='navbar-heading'>Categories</h1>
                <div className='categories'>
                  {categories.map((category)=>(
                         <a href="#"  className='nav-link' key={category} onClick={(e)=>handleCategoryClick(e,category)}>{category}</a>
                  ))
                  }
                    
                </div>
            </nav>
         <div className='news-section'>
             {headline && (
               <div className="headline" onClick={()=>handleArticleClick(headline)}>
               <img src={headline.image} alt={headline.title} /> 
               <h2 className='headline-title'>{headline.title}</h2>
             </div>
              )}
            
            <div className='news-grid'>
               {news.map((article,index)=>(
                <div className='news-grid-item' key={index} onClick={()=>handleArticleClick(article)} >
                <img src={article.image} alt={article.title}/>  {/* here have to add noimg because we have to check the functionality */}
                <h3>{article.title}</h3>
             </div>
               ))}

            </div>
         </div>
         <NewsModel show={showModel}  article={selectedArticle} onClose={()=>setShowModel(false)}/>
        </div>
        <footer>
            <p className='copyright'> 
                <span>News APP</span>   
            </p>
            <p>&copy; All Rights Reserved.
                    By Code and Create
                </p>
        </footer>
    </div>
  )
}
export default News;



























