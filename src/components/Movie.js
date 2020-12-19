import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactTooltip from 'react-tooltip';
import { MdRemoveRedEye } from 'react-icons/md';
import { MdAddToQueue } from 'react-icons/md';
import { BsHeartFill } from 'react-icons/bs';
import {Container, Row, Col} from 'react-bootstrap';

const IMG_API =  "https://image.tmdb.org/t/p/w1280";
const API_KEY = "45aa5a2958fa703698da1865305b625b"; 
  
function Movie ({id, title, poster_path, overview, vote_average, runtime, video, vote_count, release_date}){
    

    if(release_date){
        release_date = release_date.split("-", 4);
    }
    
    const[keyValue, setKeyValue] = useState("");
    const[genre, setGenre] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        let API = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
            fetch(API)
            .then((res)=>res.json())
            .then((data)=>{
                if(data.results){
                    if(data.results.length>0)
                    {
                        setKeyValue(data.results[0].key);
                    } 
                }
            })

        let GENRE_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

            fetch(GENRE_API)
            .then((res)=>res.json())
            .then((data)=>{
                setGenre(data.genres);
            })
            
    };
    
    const setVoteClass = (vote) =>{
        if(vote >= 8){
            return "green";
        } else if (vote >=6){
            return "orange";
        }else{
            return "red";
        }
    }

    return(       
            <>
            <div className="movie">
                <div className="img-wrapper" >
                    <img src={ poster_path?
                        IMG_API+ poster_path: `https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80`} 
                        onClick={()=>handleShow(id)} alt = {title} className="hover-zoom"/> 
                </div>
                <div className="movie-info">
                    <h3>{title}</h3>
                    <span className={`tag ${setVoteClass(vote_average)}`
                    }>{vote_average}</span>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}
                     animation={true}
                     dialogClassName="modal-100w"
                     aria-labelledby="example-custom-modal-styling-title"
                    >

                <Modal.Header closeButton>

                    {  release_date &&
                    <Modal.Title>
                        {title} 
                        ({release_date[0]})
                        <span 
                            className={`tag ${setVoteClass(vote_average)}`
                            }>{vote_average}/10
                        </span>
                    </Modal.Title>
                    }
                </Modal.Header>

                <Modal.Body>
                    <Container>
                        <div className ="row">
                            <div className="col md-2 w-100">
                                    <img src={poster_path?
                                    IMG_API+ 
                                    poster_path: `https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80`} 
                                    width= "150"
                                    height = "234" 
                                    alt=""/>
                            </div>
                            <div className="col">                               
                                <iframe 
                                     id="ytplayer" type="text/html" width="500" height="234" title ="po"
                                     src= {`https://www.youtube.com/embed/${keyValue}?&origin=http://example.com`}
                                     frameborder="0">
                                </iframe>                         
                            </div>    
                                                  
                            </div>    
                            <p>
                                {overview}   
                           </p> 
                           <div>
                               <Container>
                                   <div className ="row">
                                    <div className="col">
                                        <h6>Genres: </h6>
                                        {genre.map((genres)=>
                                            <div className="col" key={genres.name}> {genres.name}</div>
                                        )}
                                    </div>
                                    <div className="col"> 
                                       
                                    </div>
                                       
                                   </div>
                              
                               </Container>
                              
                           </div> 
                    </Container>             
                 </Modal.Body>

                <Modal.Footer>
                    <Container >
                        <Row className="justify-content-md-center">
                            <Col md={{ span: 1 }}>
                                <Button data-tip="Watched" data-for="watchlist"><MdRemoveRedEye/>
                                </Button> 
                            </Col>
                            <Col md={{ span: 1 }}>
                                <Button data-tip="Like" data-for="watchlist"><BsHeartFill />
                                </Button> 
                            </Col>
                            <Col md={{ span: 1}}>
                                <Button data-tip="Add to Watchlist" data-for="watchlist"><MdAddToQueue />
                                </Button>
                            </Col>
                        </Row>                   
                    </Container>
                  
                <ReactTooltip id ="watchlist" />                   
                </Modal.Footer>

            </Modal>
            </>
        )
    }


export default Movie;