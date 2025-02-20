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



























// import tech from '../assets/images/tech.jpg';
// import gen from '../assets/images/general.jpg';
// import bus from '../assets/images/bus.jpg';
// import world from '../assets/images/world.jpg';
// import enter from '../assets/images/enter.jpg';
// import sports from '../assets/images/sports.jpg';
// import nation from '../assets/images/nation.png';
// import science from '../assets/images/science.jpg';
// import health from '../assets/images/health.jpg';

   {/* <a href="#" className='nav-link'>WORLD</a>
                    <a href="#" className='nav-link'>BUSINESS</a>
                    <a href="#" className='nav-link'>TECHNOLOGY</a>
                    <a href="#" className='nav-link'>ENTERTAINMENT</a>
                    <a href="#" className='nav-link'>SPORTS</a>
                    <a href="#" className='nav-link'>SCIENCE</a>
                    <a href="#" className='nav-link'>HEALTH</a>
                    <a href="#" className='nav-link'>NATION</a> */}





            
             {/* <div className='news-grid-item'>
                <img src={sports} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div>
             <div className='news-grid-item'>
                <img src={nation} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div>
             <div className='news-grid-item'>
                <img src={enter} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div>
             <div className='news-grid-item'>
                <img src={science} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div> */}
             {/* <div className='news-grid-item'>
                <img src={health} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div>
             <div className='news-grid-item'>
                <img src={bus} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div> */}
             {/* <div className='news-grid-item'>
                <img src={gen} alt="" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
             </div> */}