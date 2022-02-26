import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { getIsLoggedIn } = useAuthContext();

    return (
        <Route
            {...rest}
            render = {props =>
                getIsLoggedIn() === "true" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;