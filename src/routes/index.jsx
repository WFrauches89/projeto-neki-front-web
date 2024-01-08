import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/index';
import Cadastro from '../Pages/Cadastro/index';
import Login from '../Pages/Login/index';
import Home from '../Pages/Home/index';


export default function Rotas() {
    const { isAuthenticated } = useContext(AuthContext);

    const AuthRoute = ({ element }) => {
        return isAuthenticated() ? element : <Navigate to="/" replace />;
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/cadastro"
                    element={<Cadastro />}
                />
                <Route
                    path="/Home"
                    element={<AuthRoute element={<Home />} />}
                ></Route>
            </Routes>
        </div>
    );
}
