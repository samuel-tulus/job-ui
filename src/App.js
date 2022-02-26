import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, PrivateRoute } from './components';
import { LoginPage, JobListPage, JobDetailPage, Error } from './pages';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <PrivateRoute exact path='/login'>
                        <LoginPage />
                    </PrivateRoute>
                    
                    <PrivateRoute exact path='/' component={JobListPage}/>
                    <PrivateRoute exact path='/:id' component={JobDetailPage} />

                    <Route path='*'>
                        <Error />
                    </Route>
                </Switch>
            </Router>
        );
    }
};

export default App;
