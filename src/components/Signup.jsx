import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

function Signup() {
    const [email, setemail] = useState('')
	const [password, setpassword] = useState('')
	const [error, seterror] = useState('')
	const history = useHistory();
	
	const emailHandler = (e) => {
		setemail(e.target.value)
	}
	const passwordHandler = (e) => {
		setpassword(e.target.value)
	}
	
	const userSignUp = () => {
		
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then( (user) => {
			setpassword('')
			history.push(`/`);
		} )
		.catch( (error) => seterror(error) );
	}
	const backtToLogin = () => {
		history.push(`/`);
	}
    return (
        <div>
            <form >
				<div className="signup__form">
					<h2 className="signup_label">SignUp</h2>
					<div> 
						{error && <div className="alert-danger"> {error.message}</div>} 
					</div>
    
					<div> 
						<TextField onChange={emailHandler} color="default" label="Email" required value={email}/>
					</div>
					
					<div> 
						<TextField onChange={passwordHandler} color="default" label="Password" required/>

					</div>
					
					<div className="signin__button">
						
							<Button variant="contained"
							color="primary" onClick={userSignUp} > Submit </Button> 
					{/* </div>
					<div className="submit__back"> */}
							<Button variant="contained"
							color="default" onClick={backtToLogin} > Back </Button> 
					</div>
					
				</div>
			</form>
        </div>
    )
}

export default Signup
