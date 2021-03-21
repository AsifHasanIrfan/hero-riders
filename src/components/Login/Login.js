import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import './login.css';
import firebaseConfig from './firebaseConfig';
import { userContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }

const Login = () => {

    const [isNewUser, setIsNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name:'',
        email: '',
        password: '',
        success: false
    })

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/destination/1" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleIsNewUser = () => {
        const isNewUser = true;
        setIsNewUser(isNewUser);
    }
    const handleIsNotNewUser = () => {
        const isNewUser = false;
        setIsNewUser(isNewUser);
    }
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
          const user = result.user;
          const isSignedInUser = {
            isSignedIn: true,
            name: user.displayName,
            email: user.email
          }
          setUser(isSignedInUser);
          setLoggedInUser(isSignedInUser)
          history.replace(from);
        }).catch((error) => {
          const errorMessage = error.message;
          const email = error.email;
          console.log(errorMessage, email)
        });
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            const user = result.user;
            const isSignedInUser = {
                isSignedIn: true,
                name: user.displayName,
                email: user.email
              }
            setUser(isSignedInUser);
            setLoggedInUser(isSignedInUser);
            history.replace(from);
        })
        .catch((error) => {
            const errorMessage = error.message;
            const email = error.email;
        });
    }

    const handleBlur = (e) => {
        let isFormValid;
        if(e.target.name === 'name'){
            isFormValid = e.target.value;
        }
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
            if(isFormValid) {
                var password 
            }
        }
        if(e.target.name === 'confirmPassword'){
            var confirmPassword = e.target.value;

        }
        if(isFormValid){
            const newUserInfo ={...user};
            newUserInfo [e.target.name] = e.target.value;
            setUser(newUserInfo); 
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isNewUser && user.name && user.password && user.email){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                const newUserInfo ={...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name)
            })
            .catch((error) => {
                const newUserInfo ={...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
        }
        if(!isNewUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo ={...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                const userInfo = res.user;
                const isSignedInUser = {
                    isSignedIn: true,
                    name: userInfo.displayName,
                    email: userInfo.email
                  }
                setLoggedInUser(isSignedInUser, newUserInfo)
                setUser(newUserInfo);
                history.replace(from);
            })
            .catch(error => {
                const newUserInfo ={...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
        }
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name
        }).then(function() {
            console.log('user name updated successfully')
        }).catch(function(error) {
        console.log(error)
        });
    }

    return (
        <div className="body">
        <div className="wrapper">
            <div className="title login">Login</div>
            <div className="form-container">
                <div className="form-inner">
                    
                    {
                        isNewUser ? 
                        <form onSubmit={handleSubmit} className="signup">
                            <div className="title signup">Create an account</div>
                            <div className="field">
                                <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" required></input>
                            </div>
                            <div className="field">
                                <input type="text" name="email" onBlur={handleBlur} placeholder="Email Address" required></input>
                                <p style={{color: 'red'}}>{user.error}</p>
                            </div>
                            <div className="field">
                                <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required></input>
                            </div>
                            <div className="field">
                                <input type="password" name="confirm-password" onBlur={handleBlur} placeholder="Confirm password" required></input>
                            </div>
                            <div className="field">
                                <input type="submit" value="Signup"></input>
                            </div>
                            <div className="signup-link">Already have an account? <p onClick={handleIsNotNewUser}> Login</p></div>
                            <div className="or-signIn">
                                <p>Or</p>
                                <button onClick={handleGoogleSignIn}>Google</button>
                                <br/>
                                <button onClick={handleFbSignIn}>Facebook</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit} className="login">
                            <div className="field">
                                <input type="text" name="email" onBlur={handleBlur} placeholder="Email Address" required></input>
                            </div>
                            <div className="field">
                                <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required></input>
                            </div>
                            <div className="pass-link"><Link to="">Forgot Password?</Link></div>
                            <div className="field">
                                <input type="submit" value="Login"></input>
                            </div>
                            <div className="signup-link">Not a member? <p onClick={handleIsNewUser}> Create an account</p></div>
                            <div className="or-signIn">
                                <p>Or</p>
                                <button onClick={handleGoogleSignIn}>Google</button>
                                <br/>
                                <button onClick={handleFbSignIn}>Facebook</button>
                            </div>
                        </form>
                    }
                    {user.success && <p style={{color: 'green', padding: '10px'}}>User {isNewUser ? 'created' : 'logged in'} successfully</p>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;