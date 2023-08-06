import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = ({ component: Component, path, exact }) => {
    const loggedIn = useSelector(state => !!state.session.user);

    return (
        <Route path={path} exact={exact} render={(props) => (
            !loggedIn ? (
                <Component {...props} />
            ) : (
                // change it later to /routes or other name that does not generate conflict 
                // landing page (/) != show routes page (/routes)
                <Redirect to="/" />
            )
        )} />
    );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const loggedIn = useSelector(state => !!state.session.user);

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};