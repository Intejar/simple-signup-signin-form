import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [passerror, setPassError] = useState('');
    const [success, setSuccess] = useState(false);
    const HandleForm = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        if (!/[A-Z]/.test(password)) {
            setPassError('Please use uppercase character.');
            return;
        }

        if (!/[0-9]/.test(password)) {
            setPassError('Please use number')
            return;
        }
        // if (!/[!"#$%&'()*+,./:;<=>?@\^_`{|}~-]/.test(password)) {
        //     setPassError('please use special character.')
        //     return;
        // }

        setPassError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                SendVarificationEmail();
                UpdateUSerName();
            })
            .catch((error) => {
                console.error(error.message);
                setPassError(error.message);
            });
        const SendVarificationEmail = () => {
            alert('please varify your email address by the link sent to your given email inbox or span!')
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // ...
                })
        }
        const UpdateUSerName = () => {
            updateProfile(auth.currentUser, {
                displayName: name
            })
                .then(() => {
                    // Profile updated!
                    // ...
                })
                .catch((error) => {
                    // An error occurred
                    // ...
                });
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-primary'>Please Register</h1>
            <Form onSubmit={HandleForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control type="name" name='name' placeholder="Enter your name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passerror}</p>

                {
                    success && <p className='text-success'>User created successully.</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <p className='mt-2'><small>Already have an account? please <Link to='/login'>SignIn</Link> </small></p>
            </Form>
        </div>
    );
};

export default Register;