// components/MainNav.js
// Created by: Parita, Nirav, Pratham, Jay
// Last Updated by: Parita on June 08

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getUser, Auth } from '../lib/auth';
import { useEffect, useState } from 'react';

function BasicExample() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const currentUser = await getUser();
            setUser(currentUser);
        }

        fetchUser();
    }, []);

    const handleLoginClick = () => {
        Auth.federatedSignIn();
      };

    return (
        <Navbar className="p-3 mb-2">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="/" className="text-center">
                    <h1><b>HireQuiz.com</b></h1>
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="/" className="border rounded p-2 mr-4">
                        <b>Home</b>
                    </Nav.Link>
                    {user ? (
                        <Nav.Link href="/logout" className="border rounded p-2 mr-4">
                            <b>Logout</b>
                        </Nav.Link>
                    ) : (
                        <Nav.Link onClick={handleLoginClick} className="border rounded p-2 mr-4">
                            <b>Login</b>
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
