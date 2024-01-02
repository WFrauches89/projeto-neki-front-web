import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

export default function Login() {

    const [username, setUsername] = useState('');

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };


    return (
        <section className="sectionPrincipal h-50 gradient-form" >

            <Container className="container">
                <Row className="d-flex justify-content-center" >
                    <Col xl={4}>
                        <Card className="box-container">
                            <Row>
                                <Col lg={15}>
                                    <Card.Body className="p-md-3 mx-md-3">
                                        <div className="logo">
                                            <img
                                                src="https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a                        "
                                                style={{ width: "8rem", marginBottom: "1rem" }}
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
                                                    value={username}
                                                    onChange={handleInputChange} />
                                                <Form.Label htmlFor="form2Example11">Digite seu e-mail</Form.Label>

                                            </Form.Group>

                                            <Form.Group className="form-floating mb-1">
                                                <Form.Control type="password" id="formEmail" placeholder="Digite sua senha" />
                                                <Form.Label htmlFor="formEmail" >Digite sua senha</Form.Label>
                                            </Form.Group>

                                            <div className="text-center mb-3" >
                                                <div class="form-check form-switch mb-4">
                                                    <input type="checkbox" class="form-check-input" id="flexSwitch" />
                                                    <label class="form-check-label" for="flexSwitch">Mantenha conectado</label>
                                                </div>
                                                <div>
                                                    <Button className="btn btn-primary btn-lg btn-block gradient mb-3" type="submit">
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
                                                <Button variant="outline-info" type="button">
                                                    Cadastrar
                                                </Button>
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