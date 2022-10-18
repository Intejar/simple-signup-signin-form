import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {
    const [wrongpass, setWrongPass] = useState('');
    const [correctpass, setCorrectPass] = useState(false);
    const [getemail, setEmail] = useState('');

    const HandleForm = event => {
        event.preventDefault();
        setCorrectPass(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setWrongPass('');
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                form.reset();
                setCorrectPass(true);
            })
            .catch(error => {
                console.error(error);
                setWrongPass(error.message);
            })

    }
    const emailBlur = event =>{
        let email = event.target.value
        setEmail(email);
    }
    const setPassword = () => {
        sendPasswordResetEmail(auth, getemail)
            .then(() => {
                alert('please check your given mail to reset password')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    return (
        <div className='mx-auto w-50'>
            <h1 className='text-primary'>Please Sign In</h1>
            <Form onSubmit={HandleForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={emailBlur} type="email" name='email' placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <p className='text-danger'>{wrongpass}</p>
                {
                    correctpass && <p className='text-success'>sucessfully logged in</p>
                }
                <p><small>Forget Password? <button onClick={setPassword} className='btn btn-link'>forget password</button> </small></p>


                <Button variant="primary" type="submit">
                    SignIn
                </Button>
                <p className='mt-2'><small>Don't  have an account? please <Link to='/register'>Register</Link> </small></p>
            </Form>
        </div>
    );
};

export default Login;