import express, { response } from 'express';

const app = express();
app.use(express.json());

const users = [
    'Andre',
    'Augusto',
    'Marcelo',
    'Sonia'
];

/*
 * TIPOS DE ROTAS
 *
 * GET: buscar uma ou mais informações no back-end
 * POST: criar informações no back-end
 * PUT: atualizar informações no back-end
 * DELETE: remover informações no back-end
 * 
 * Ex: POST http://localhost:3333/users => Criar um usuário
 * Ex2: GET http://localhost:3333/users => Listar usuários
 * Ex3: GET http://localhost:3333/users/5 => Listar um usuário (id = 5)
 */

 /* TIPOS DE PARÂMETROS
 * 
 * Request Parm: Parâmetros da prórpia rota que identificam um recurso (são obrigatórios!)
 * Query Parm: Parâmetros da própria rota geralemnte opcionais (ex: filtros - ?teste=aa)
 * Request Body: Parâmetros para criação e atualização de informações (ex: atualizar o usuário)
 */


app.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    //response.send('Hello world');
    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];
    return response.json(user);
});

app.post('/users', (request, response) => {
    const data = request.body;

    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
});

app.listen(3333);
