import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';
import Button from 'react-bootstrap/Button';
import  Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


  const IMG_API =  "https://image.tmdb.org/t/p/w1280";

  const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=45aa5a2958fa703698da1865305b625b&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);


  let API =  `https://api.themoviedb.org/3/discover/movie?api_key=45aa5a2958fa703698da1865305b625b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`;

  
  useEffect(()=>{
    fetch(API)
    .then((res)=>res.json())
    .then((data)=>{
      setMovies(data.results);
    });
  },[API]);

  

  return (
    <>  
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>MoviesApp</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Trending</Nav.Link>
          <Nav.Link href="#features">Genres</Nav.Link>
        </Nav>   
        <Nav className="search">
        <input type="search" 
                placeholder = "Search...EDITTTT"/>
        <Nav className="login-button">
          <Button>
            Login
          </Button>
        </Nav>

        </Nav>   
      </Navbar>

      <div className="movie-container">
        {movies.length > 0 && movies.map((movie)=> <Movie key={movie.id} {...movie}/>)}
      </div>

      <div className="page-num">
        {pageNum>1 &&
          <Button variant="secondary" margin-right ="20px" size = "sm" onClick={()=> setPageNum(pageNum-1)}>{' '}
            Previous
          </Button>
        }
          <Button size = "sm" variant="light">{' '}
            {pageNum}
          </Button>
          <Button variant="secondary" size="sm" onClick={()=> setPageNum(pageNum+1)}>{' '}
            Next
          </Button>
        </div>

    </>
  );
}

export default App;
