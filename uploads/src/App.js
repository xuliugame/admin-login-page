import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import {useEffect} from 'react';
import {isLogin} from './utils';

function App() {
    let history = useNavigate();

    useEffect(() => {
        console.log('App.js');
        if (isLogin()) {
            console.log('App.js isLogin');
            history('/', { replace: true });
        } else {
            console.log('App.js not isLogin');
            history('/login', { replace: true });
        }
    }, []);
    return (

        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
