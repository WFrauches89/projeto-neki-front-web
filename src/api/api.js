import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.0.180:9090/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const configToken = (token) => {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = token;


    console.log('Token setado no localStorage:', token);
};


export function verificaLogin(email, senha) {
    return api.post('/login', { email, senha });
}


export async function cadastraUser(nomeUsuario, email, senha) {
    try {
        return await api.post('/cadastrar', {
            nomeUsuario,
            email,
            senha,
        });
    } catch (error) {
        console.error('Erro durante o cadastro do usuário:', error);
        throw error;

    }
}


export function criarHabilidade(userId, habilidade) {
    return api.post(`/skills/cadastrarSkills/usuario/${userId}`, habilidade
    );
}


export function alterarLevel(skillId, habilidade) {
    return api.post(`/skills/alterarLevel/Skill/${skillId}`, habilidade)

}

export function buscarDetalhesHabilidade(userId, skillId) {
    return api.get(`/skills/usuario/${userId}/Skill/${skillId}`);

}

export async function deleteHabilidade(skillId, habilidade) {
    try {
        return await api.delete(`/skills/excluirSkill/${skillId}`);
    } catch (error) {
        console.error('Erro ao excluir habilidade:', error);
        throw error;
    }
}

export function listaDeHabilidades(userId) {
    return api.get(`/skills/listarSkills/usuario/${userId}`);
}




