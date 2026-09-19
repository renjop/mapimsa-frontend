import React, {useEffect} from "react";
import {useAuth} from "react-oidc-context";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {
    login
} from '../features';
import type {RootState} from "../store.ts";
import {Navigate} from 'react-router-dom';

const AuthContainer: React.FC = () => {
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.login);

    useEffect(() => {
        if (auth.isAuthenticated) {
            void dispatch(login());
        }
    }, [dispatch, auth]);

    return (user.loggedIn ? <Navigate to={{
        pathname: "/",
    }}/> : <></>);
}

export default AuthContainer;