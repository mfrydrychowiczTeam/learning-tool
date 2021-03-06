import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ ...props }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await axios
                .get('/api/me')
                .then((res) => {
                    if (res.status === 200) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((err) => {
                    return false;
                });

            setIsAuthenticated(result);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return <div></div>;
    } else {
        if (isAuthenticated) {
            return <Route {...props} />;
        } else {
            return <Redirect to={{ pathname: '/start', state: { from: props.location } }} />;
        }
    }
};
export default PrivateRoute;

export const checkPrivateRoute = (path: string): boolean => {
    if (path === '/') return true;
    return [
        '/profil',
        '/kolekcje',
        '/stworz-kolekcje',
        '/stworz-fiszke',
        '/powtorka',
        '/szukaj',
        '/czat',
        '/edytuj-fiszke'
    ].some((el) => path.startsWith(el));
};
