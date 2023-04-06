import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
 
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  // document.title=`${props.category}- WORLDNEWS`;




  
  const  updateNews = async()=>{
    props.setProgress(10);
    props.setProgress(50);

    const url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=cad0d34aabf8454b87dd187de0225447&page=${page}&page-1&pageSize=${props.pageSize}`;
    setloading(true);
    let data= await fetch(url);
    let parsedData= await data.json();
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);



    props.setProgress(80);

    props.setProgress(100);
    
  }

// --------------------------------------------------------
   useEffect(() => {
    updateNews();
     
   }, [])
 
  
  // -------------------------------------
   const handleNextClick= async ()=>{


   setpage(page+1);
   updateNews();
   

  }
  // -----------------------------------------

   const handlePreviousClick= async ()=>{
   
   setpage(page-1);

   updateNews();


  }
// -------------------------------------------------
const fetchMoreData = async () => {
   const url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=cad0d34aabf8454b87dd187de0225447&page=${page +1}&page-1&pageSize=${props.pageSize}`;
   setpage(page+1);

    let data= await fetch(url);
    let parsedData= await data.json();
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.articles);
    

};
 
    return (
      <div className="container my-3">
      <h1 className="text-center" style={{margin: '50px 0px', marginTop:'90px'}}>WORLDNEWS | Top Headlines on {props.category}</h1>
      {loading && <Spinner/>}
        <hr></hr>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
        <div className="row">

          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  
                  title={element.title?element.title.slice(0,45):" "}
                  description={element.description?element.description.slice(0,88):" "}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>

       
      </div>
    );
  }


News.defaultProps={
  country:"in",
  pageSize: 8,
  category:'General'
}

News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string

  
}

export default News;
