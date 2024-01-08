import { createContext, useEffect, useState } from 'react';
import { cadastraUser, configToken, verificaLogin } from '../api/api';
import { useNavigate } from 'react-router-dom';
import ModalComum from '../components/Modal/index';
import checkedIcon from '../assets/checked.png';
import erroIcon from '../assets/erro.png';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    console.log('Token recuperado ao inicializar Context:', token);

    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const [mensagem, setMensagem] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [espera, setEspera] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEspera(false);
        navigate('/')
    };



    const verificaTokenStorage = async (storedToken) => {
        try {
            if (!storedToken) {
                throw new Error('Token não encontrado no localStorage');
            }
            console.log('verificaTokenStorage - Token foi encontrado no localStorage');
            configToken(storedToken);
            setToken(storedToken);

            console.log('verificaTokenStorage - Usuário autenticado localmente:', isAuthenticated());

            console.log(user);
            setAuthenticated(true);
            navigate('/Home');
        } catch (error) {
            console.error('verificaTokenStorage - Erro no verifica Login com stored token: ', error);
        }
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        console.log('Iniciando useEffect...');

        if (storedToken) {
            verificaTokenStorage(storedToken);
            console.log('Token armazenado no localStorage:', storedToken);
        } else {
            console.log('Nenhum token encontrado no localStorage');
        }
    }, []);

    const verificaLoginContext = async (
        email,
        senha,
        onLoginSuccess,
        storedToken,
    ) => {
        console.log('Iniciando verifica login context...');
        if (storedToken) {
            console.log('Token recolhido no localStorage... :', storedToken);
            configToken(storedToken);
            setToken(storedToken);
            setAuthenticated(true);
        } else {
            console.log('Token recolhido na APPI...');
            const response = await verificaLogin(email, senha);

            console.log('Usuário autenticado context:', isAuthenticated());
            if (response.data && response.data.token && response.data.user.id) {
                configToken(response.data.token);
                setUser(response.data.user);
                setId(response.data.user.id);
                setToken(response.data.token);
                console.log('Usuário autenticado context:', isAuthenticated());
                console.log('Token no login:', response.data.token);
                setAuthenticated(true);
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
                onLoginSuccess();
            } else {
                console.error('Resposta da API incorreta após o login:', response.data);
                setMensagem('erro');
                openModal();
            }
        }
        console.log('Finalizando verifica login context...');
    };

    const isAuthenticated = () => {
        return authenticated;
    };

    const cadastrarUsuario = async (
        nomeUsuario,
        email,
        senha,
        confirmarSenha,
        onCadastroSuccess,
    ) => {
        try {
            if (senha !== confirmarSenha) {
                console.error('As senhas não coincidem');
                return "senhas não coincidem"
            }
            console.log('Chegou aqui senhas iguais ');
            cadastraUser(nomeUsuario, email, senha).then((response) => {
                console.log(
                    'Cadastro bem-sucedido!',
                    response,
                    nomeUsuario,
                    email,
                    senha,
                );
                onCadastroSuccess();
                return "realizado";
            }).catch((e) => {
                return "Erro";
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return "Erro"
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                user,
                verificaLoginContext,
                cadastrarUsuario,
            }}
        >
            {children}

            {mensagem == 'sucesso' && showModal && (
                <ModalComum
                    tipoMensagem="SUCESSO"
                    mensagem="Usuario cadastro realizado com sucesso"
                    icon={checkedIcon}
                    onClose={closeModal}
                    setEspera={setEspera}
                />
            )}

            {mensagem == 'erro' && showModal && (
                <ModalComum
                    tipoMensagem="ERRO"
                    mensagem="Erro ao realizar login"
                    icon={erroIcon}
                    onClose={closeModal}
                    setEspera={setEspera}
                />
            )}
        </AuthContext.Provider>
    );
};