import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const IMG_API =  "https://image.tmdb.org/t/p/w1280";

  
function Movie ({title, poster_path, overview, vote_average}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
                    <img  src={IMG_API+ poster_path} onClick={handleShow} alt = {title} className="hover-zoom"/> 
                </div>
                <div className="movie-info">
                    <h3>{title}</h3>
                    <span className={
                        `tag ${setVoteClass(vote_average)}`
                    }>{vote_average}</span>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{overview}</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>
    )
    }


export default Movie;