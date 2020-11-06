import React, {useState} from 'react';
import { TextField , Button} from "@material-ui/core";
import './login.css';
import firebase from "firebase";
import 'firebase/auth';
import {useHistory } from "react-router-dom";


const Login = () => {

	const [email, setemail] = useState('')
	const [password, setpassword] = useState('')
	const [error, seterror] = useState('')
	const [isUserLogin, setisUserLogin] = useState(false)
	const history = useHistory() 
	
	const emailHandler = (e) => {
		setemail(e.target.value)
	}
	const passwordHandler = (e) => {
		setpassword(e.target.value)
	}
	
	const userLogin = () => {

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then( (user) => {
			setisUserLogin(true)
			history.push('/main')
		})
		.catch((error) => {
			seterror(error)
		});
	}

	const signUpRoute = () => {
		history.push('/signup')
	}

	return (
		<div>
			
			<form >
				<div className="login__form">
				<h2 className="login_label">Login</h2>
					<div> 
						{error && <div className="alert-danger"> {error.message}</div>} 
					</div>

					<div> 
						<TextField onChange={emailHandler} color="default" label="Email" required value={email}/>
						
					</div>
					
					<div> 
						<TextField onChange={passwordHandler} color="default" label="Password" required />

					</div>
					<div className="login__button">
						
						<Button variant="contained"
						color="primary" onClick={userLogin}  > Login
						</Button> 
					
					     <Button onClick={signUpRoute}  variant="contained"
							color="default"> Sign Up 
						</Button>
						
					</div>
					
				</div>
			</form>
		</div>
	)
}

export default Login
