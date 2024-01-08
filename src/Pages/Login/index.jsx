import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { AuthContext } from '../../context/index';


export default function Login() {

    const { verificaLoginContext, verificaLoginStorage, isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const [autenticado, setAutenticado] = useState(false);
    const [espera, setEspera] = useState(false)




    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const showPass = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        setEspera(true)
        await verificaLoginContext(email, password, () => {
            setAutenticado(true);
            console.log('Usuário autenticado dentro do Login:', isAuthenticated());
            console.log('Usuário logado é:', email);
            navigate('/Home');
        });
        setEspera(false)
    };

    useEffect(() => {
        console.log(
            'Usuário autenticado dentro do Login UseEffect:',
            isAuthenticated(),
        );
    }, [isAuthenticated]);

    useEffect(() => {
        console.log('Usuário autenticado localmente:', autenticado);
    }, [autenticado]);




    return (
        <section className="sectionPrincipal h-50 gradient-form" >

            <Container className="container">
                <Row className="d-flex justify-content-center" >
                    <Col xl={4}>
                        <Card className="box-container">
                            <Row>
                                <Col lg={15}>
                                    <Card.Body className="p-md-3 mx-md-3">
                                        <div className="logoLogin">
                                            <img
                                                src="https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a                        "
                                                style={{ width: "6rem", margin: 'auto', }}
                                                alt="logo"
                                            />

                                        </div>

                                        <Form>
                                            <div className="titulo-form">
                                                <h1>Login</h1>
                                            </div>


                                            <Form.Group className="form-floating mb-3">
                                                <Form.Control
                                                    type="email"
                                                    id="formEmail"
                                                    placeholder='Digite seu e-mail'
                                                    value={email}
                                                    onChange={handleInputChange} />
                                                <Form.Label htmlFor="formEmail">Digite seu e-mail</Form.Label>

                                            </Form.Group>

                                            <Form.Group className="form-floating mb-1">
                                                <Form.Control
                                                    type={showPassword ? 'text' : 'password'}
                                                    id="formPass"
                                                    placeholder="Digite sua senha"
                                                    value={password}
                                                    onChange={handlePassChange} />
                                                <Form.Label htmlFor="formPass" >Digite sua senha</Form.Label>
                                                <div className="password-toggle-icon" onClick={showPass}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </div>
                                            </Form.Group>

                                            <div className="text-center mb-3" >
                                                <div className="form-check form-switch mb-4">
                                                    <input type="checkbox" className="form-check-input" id="flexSwitch" />
                                                    <label className="form-check-label" htmlFor="flexSwitch">Mantenha conectado</label>
                                                </div>
                                                <div>
                                                    <Button className="btn btn-primary btn-lg btn-block gradient mb-3" onClick={handleLogin}>
                                                        Entrar
                                                    </Button>
                                                </div>
                                                <div>
                                                    <a className="text-muted" href="#!">
                                                        Esqueceu a senha?
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Não tem uma conta?</p>
                                                <Link to="/cadastro">
                                                    <Button variant="outline-info" type="button">
                                                        Cadastrar
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}