import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API_HOST, URL } from '../utils/constants';

const initialLoginState = {
    loading: false,
    error: false,
};

const LoginPage = () => {
    const [ username, setUserName ] = useState();
    const [ password, setPassword ] = useState();
    const [ loginState, setLoginState ] = useState(initialLoginState);
    const { setLoggedIn, getIsLoggedIn } = useAuthContext();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoginState({ ...loginState, loading: true });

        try {
            const url = API_HOST + URL.LOGIN;
            const payload = {
                username: username,
                password: password
            };
            const response = await axios.post(url, payload);
            const result = (response && response.data && response.data.data && response.data.data.isLoggedIn) || false;
            if (result) {
                setLoggedIn();
            }
            
            setLoginState({ ...loginState, loading: false });
        } catch (error) {
            setLoginState({ ...loginState, loading: false, error: true });
            alert(error);
        }
    };

    return <Wrapper>
            {getIsLoggedIn() ?
            <Redirect to='/' />
            :
            <form onSubmit={handleSubmit}>
                <div className="form-group space">
                    <label htmlFor="username">Username</label>
                    <input onChange={e => setUserName(e.target.value)} type="text" className="form-control" id="username" placeholder="Enter username"/>
                </div>
                <div className="form-group space">
                    <label htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <div className="form-group row space">
                    <div className='login-container'>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>}
    </Wrapper>
};

const Wrapper = styled.header`
    margin: 1rem 1rem;

    .space {
        margin-bottom: 0.5rem;
    }

    .login-container {
        text-align: left;
    }
`;

export default LoginPage;