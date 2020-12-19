import React,{ useState, useEffect } from "react";
import axios from 'axios';  
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


function Login(props) {  


    const [user, setUser] = useState({ Email: '', Password: ''});  
    const apiUrl = "https://localhost:44368/api/Users";    

    const Logini = (e) => {    
        e.preventDefault();    
        const data = { Email:user.Email, Password: user.Password };    
        axios.get(apiUrl, data,{
            mode: 'no-cors',
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
    }
        })    
        .then((result) => {    
            debugger;  
            console.log(result.data);   
            const serializedState = JSON.stringify(result.data);  
            var a= localStorage.setItem('myData', serializedState);   
            console.log("A:",a)  
            const useri =result.data.UserDetails;  
            console.log(result.data.message);  
            if (result.status === '200')  
                alert('Successful User');    
  
            else    
                alert('Invalid User');    
        })   
    };

        const onChange = (e) => {  
            e.preventDefault();
            e.persist();    
            setUser({...user, [e.target.name]: e.target.value});    
        } 
        
    
    return (
        <>
        <div >
            <div className="formContent">
                <h2> Login</h2>
                <div className="fadeIn first">
                </div>
      
            <form onSubmit={Logini}>
                <input type="text" value={user.Email} onChange={ onChange }  name="Email" id="login" required="true" className="fadeIn second"  placeholder="username" autoComplete="off"/>
                <input type="text" value={user.Password} onChange={ onChange }  name="Password" id="password" required="true" className="fadeIn third"  placeholder="password" autoComplete="off"/>
                <input type="submit" className="fadeIn fourth" value="Log In" autoComplete="off"/>
            </form>
      
            <div className="formFooter">
                <a className="underlineHover" href="#">Forgot Password?</a>
            </div>
      
        </div>
       </div>
       </>
    );
}


export default Login;