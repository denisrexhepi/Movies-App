import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';
import Button from 'react-bootstrap/Button';
import  Navbari from './components/Navbari';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import  Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';   
import Login from './components/Login';
const IMG_API =  "https://image.tmdb.org/t/p/w1280";
 


function App() {

  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchTerm,setSearchTerm] = useState('');

  let API =  `https://api.themoviedb.org/3/discover/movie?api_key=45aa5a2958fa703698da1865305b625b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=45aa5a2958fa703698da1865305b625b&query=${searchTerm}&page=${pageNum}`;

  
  useEffect(()=>{
      if(searchTerm===""){
      getMovies(API);
    }
    else{
      getMovies(SEARCH_API);
    }
  });


  const getMovies = (API) =>{
      fetch(API)
      .then((res)=>res.json())
      .then((data)=>{
        setMovies(data.results);
      });
    
  }

 const handleOnChange = (e) =>{
    setSearchTerm(e.target.value);
    setPageNum(1);
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();
     if(searchTerm){
        setPageNum(1);
        getMovies(SEARCH_API+searchTerm);
      }
    };


  
  return (

    <>   <Router>
      <Navbari> 
      
      </Navbari>
      <Nav>
          <Form className="search-new" onSubmit={handleOnSubmit}>
            <Form.Control type="search"
                    value = {searchTerm}
                    onChange={handleOnChange}
                    placeholder = "Search..."/>
            </Form>
          </Nav>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie)=> <Movie key={movie.id} {...movie}/>)}
      </div>

      <div className="page-num">       
        {
          pageNum>1 && movies.length>0 &&
            <Button  className="button-prev"  onClick={()=>{window.scrollTo(0, 0);  setPageNum(pageNum-1)}}>{' '}
              Previous
            </Button>
        }

        { movies.length>0 &&
          <Button variant="secondary">{' '}
            {pageNum}
          </Button>
        }

        {
          movies.length>19 &&
         <Button onClick={()=>{ window.scrollTo(0, 0);   setPageNum(pageNum+1)}}>{' '}
           Next
         </Button>
        }
       
            <Switch>        
          <Route path='/login' component={Login} />     
        </Switch>  
                    
        </div>
        </Router>
    </>
  );
}

export default App;
