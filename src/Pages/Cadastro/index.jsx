import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ModalComum from '../../components/Modal';
import checkedIcon from '../../assets/checked.png';
import erroIcon from '../../assets/erro.png';
import { cadastraUser } from '../../api/api.js';

export default function Cadastro() {

    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('');



    const [showModal, setShowModal] = useState(false);
    const [espera, setEspera] = useState(false)
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleCadastro = async () => {
        setEspera(true)
        try {
            if (password !== confirmPassword) {
                console.error('As senhas não coincidem');
                setMensagem("senha")
                openModal()
                return
            }
            const algo = await cadastraUser(username, userEmail, password)
            setMensagem("cadastrado")
            console.log(algo);
            algo === "erro" && (
                setMensagem(algo))

            openModal()

        } catch (error) {
            setMensagem("erro")
            openModal()
        }
        setEspera(false)
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEspera(false);
        mensagem == 'cadastrado' && (
            navigate('/'))
    };





    const handleInputUserChange = (e) => {
        setUsername(e.target.value);
    };

    const handleInputEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const showPass = () => {
        setShowPassword(!showPassword);
    };






    return (
        <section className="sectionPrincipalCadastro h-50 gradient-form" >

            <Container className="container">
                <Row className="d-flex justify-content-center" >
                    <Col xl={4}>
                        <Card className="box-container">
                            <Row>
                                <Col lg={15}>
                                    <Card.Body className="p-md-3 mx-md-3">
                                        <div className="logoCadastro" >
                                            <img
                                                src="https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a                        "
                                                style={{ width: "6rem", margin: 'auto' }}
                                                alt="logo"
                                            />

                                        </div>

                                        <Form>
                                            <div className="titulo-form">
                                                <h1>Cadastre-se</h1>
                                            </div>
                                            <Form.Group className="form-floating mb-3">
                                                <Form.Control
                                                    type="text"
                                                    id="formtextcadastro"
                                                    placeholder='Nome do usuário'
                                                    value={username}
                                                    onChange={handleInputUserChange}
                                                    required
                                                />
                                                <Form.Label htmlFor="formtextcadastro">Nome do usuário</Form.Label>
                                            </Form.Group>

                                            <Form.Group className="form-floating mb-3">
                                                <Form.Control
                                                    type="email"
                                                    id="formEmail"
                                                    placeholder='Digite seu e-mail'
                                                    value={userEmail}
                                                    onChange={handleInputEmailChange}
                                                    required
                                                />
                                                <Form.Label htmlFor="formEmail">Digite seu e-mail</Form.Label>
                                            </Form.Group>

                                            <Form.Group className="form-floating mb-3">
                                                <Form.Control
                                                    type={showPassword ? 'text' : 'password'}
                                                    id="formSenha"
                                                    placeholder="Digite sua senha"
                                                    value={password}
                                                    onChange={handlePassChange}
                                                    required
                                                />

                                                <Form.Label htmlFor="formSenha" >Digite sua senha</Form.Label>

                                            </Form.Group>

                                            <Form.Group className="form-floating mb-3">
                                                <Form.Control
                                                    type={showPassword ? 'text' : 'password'}
                                                    id="formConfirmSenha"
                                                    placeholder="Digite sua senha"
                                                    onChange={handleConfirmPassChange}
                                                    required />
                                                <Form.Label htmlFor="formConfirmSenha" >Confirme sua senha</Form.Label>
                                                <div className="password-toggle-icon" onClick={showPass}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </div>
                                            </Form.Group>

                                            <div className="text-center mb-1" >

                                                <div>
                                                    <Button className="btn btn-primary btn-lg btn-block gradient mb-3" disabled={espera} onClick={handleCadastro}>
                                                        Cadastrar
                                                    </Button>
                                                </div>

                                            </div>




                                        </Form>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {mensagem == 'cadastrado' && showModal && (
                    <ModalComum
                        tipoMensagem="SUCESSO"
                        mensagem="Usuario cadastro realizado com sucesso"
                        icon={checkedIcon}
                        onClose={closeModal}
                    />
                )}

                {mensagem == 'erro' && showModal && (
                    <ModalComum
                        tipoMensagem="ERRO"
                        mensagem="Erro ao realizar cadastro"
                        icon={erroIcon}
                        onClose={closeModal}
                    />
                )}
                {mensagem == 'senha' && showModal && (
                    <ModalComum
                        tipoMensagem="ERRO"
                        mensagem="Senhas tem que ser iguais"
                        icon={erroIcon}
                        onClose={closeModal}
                    />
                )}
            </Container>
        </section>
    );
}