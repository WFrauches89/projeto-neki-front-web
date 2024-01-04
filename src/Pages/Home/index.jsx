
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Image } from 'react-bootstrap';
import { ContainerStyled } from './style';
import javaImg from '../../assets/java.png';
import javaScriptImg from '../../assets/javaScript.png';
import nativeImg from '../../assets/native.png';
import springImg from '../../assets/spring.png';
import pythonImg from '../../assets/python.png';
import reactImg from '../../assets/react.png';
import { FaRegTrashAlt } from "react-icons/fa";

const Home = () => {
    const [skills, setSkills] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('N/A');
    const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
    const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);
    const imagens = {
        Java: javaImg,
        JavaScript: javaScriptImg,
        Python: pythonImg,
        SpringBoot: springImg,
        React: reactImg,
        ReactNative: nativeImg,
    };
    const [descriptions, setDescriptions] = useState({
        Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
        JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
        Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
        SpringBoot: 'Framework Java',
        React: 'Framework JavaScript',
        ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
    });
    const skillOptions = Object.keys(descriptions);
    const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
    const [error, setError] = useState('');

    useEffect(() => {
        if (!descriptions[selectedSkill]) {
            setDescriptions((prevDescriptions) => ({
                ...prevDescriptions,
                [selectedSkill]: 'Descrição da Skill',
            }));
        }
    }, [descriptions, selectedSkill, skillLevels]);

    const handleAddSkill = () => {
        setIsSkillAlreadyAdded(false);

        if (skills.some(skill => skill.name === selectedSkill)) {
            setIsSkillAlreadyAdded(true);
            return;
        }

        if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
            setError('Selecione uma habilidade e nível válidos.');
            return;
        }

        if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
            if (selectedSkillIndex !== null) {
                const updatedSkills = [...skills];
                updatedSkills[selectedSkillIndex] = {
                    image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
                    name: selectedSkill,
                    level: selectedLevel,
                    description: descriptions[selectedSkill] || 'Descrição da Skill',
                };
                setSkills(updatedSkills);
                setShowEditModal(false);
            } else {
                const newSkill = {
                    image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
                    name: selectedSkill,
                    level: selectedLevel,
                    description: descriptions[selectedSkill] || 'Descrição da Skill',
                };
                setSkills([...skills, newSkill]);
                setShowAddModal(false);
            }
            handleCloseModal();
        }
    };

    const handleEditSkillLevel = (index) => {
        try {
            const skillToEdit = skills[index];

            if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
                setError('N/A não é um nível ou habilidade aceitável para edição.');
                return;
            }
            setShowEditModal(true);
            setSelectedSkillIndex(index);
            setSelectedSkill(skillToEdit.name);
            setSelectedLevel(skillToEdit.level);
            setError('');
        } catch (error) {
            console.error('Error in handleEditSkillLevel:', error);
        }
    };

    const handleEditSkill = () => {
        if (selectedLevel === 'N/A') {
            setError('Você deve selecionar um nível válido.');
            return;
        }

        const updatedSkills = [...skills];
        const editedSkill = {
            image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
            name: selectedSkill,
            level: selectedLevel,
            description: descriptions[selectedSkill] || 'Descrição da Skill',
        };

        updatedSkills[selectedSkillIndex] = editedSkill;
        setSkills(updatedSkills);

        setShowEditModal(false);
        handleCloseModal();
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleCloseModal = () => {
        setError('');
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedSkill('');
        setSelectedLevel('N/A');
        setSelectedSkillIndex(null);
        setIsSkillAlreadyAdded(false);
    };

    return (
        <ContainerStyled>
            <div className="container">
                <div className="topo">
                    <h1 className="textH1">Bem vindo, NOME - API</h1>
                    <div>
                        <button className="logoutButton">Logout</button>
                    </div>
                </div>
                <div className="topo">
                    <button className="addButton" onClick={() => setShowAddModal(true)}>
                        Adicionar Skill
                    </button>
                </div>
                <div>
                    <h2 className="topoSkill">Lista de Skills</h2>
                    <ul className="skillsList">
                        {skills.map((skill, index) => (
                            <li key={index} className="skillItem">
                                <div className="centerContent">
                                    <img src={skill.image} alt={skill.name} className="skillImage" />
                                    <div className="textContainer">
                                        <span>{skill.name}</span>
                                        <br />
                                        <span className="buttonText">Nível:</span>
                                        <button
                                            className="levelButton"
                                            onClick={() => handleEditSkillLevel(index)}
                                        >
                                            {skill.level}
                                        </button>
                                        <br />
                                        <span>{skill.description}</span>
                                    </div>
                                    <div className="buttonContainer">
                                        <button className="deleteButton" onClick={() => handleDeleteSkill(index)}><FaRegTrashAlt /></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <Modal show={showAddModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <div >
                            <div style={{ maxWidth: '100px', maxHeight: '100px', margin: '2rem', marginLeft: '205px' }}>
                                <Image
                                    style={{ maxWidth: '60%', maxHeight: '60%' }}
                                    src="https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a"
                                    alt={'Logo Neki'}
                                />
                            </div>
                            <Modal.Title >{'Adicionar Skill'}</Modal.Title>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="skillSelect">
                                <Form.Label>Escolha a Skill</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedSkill}
                                    onChange={(e) => setSelectedSkill(e.target.value)}
                                >
                                    {skillOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="levelInput">
                                <Form.Label>Level</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                >
                                    {skillLevels.map((level, index) => (
                                        <option key={index} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {isSkillAlreadyAdded && (
                            <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
                                A habilidade já foi adicionada anteriormente.
                            </div>
                        )}
                        {error && (
                            <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleAddSkill}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={handleCloseModal}>

                    <Modal.Header closeButton>
                        <div >
                            <div style={{ maxWidth: '100px', maxHeight: '100px', margin: '2rem', marginLeft: '205px' }}>
                                <Image
                                    style={{ maxWidth: '60%', maxHeight: '60%' }}
                                    src="https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a"
                                    alt={'Logo Neki'}

                                />
                            </div>
                            <Modal.Title>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Modal.Title>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="levelInput">
                                <Form.Label>Level</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                >
                                    {skillLevels.map((level, index) => (
                                        <option key={index} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {error && (
                            <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleEditSkill}>
                            Salvar Edição
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </ContainerStyled>
    );
};

export default Home;



