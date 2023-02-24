const { spec, request } = require('pactum');
 
const {notNull} = require('pactum-matchers');
/* Set base url to the backend URL */
request.setBaseUrl('http://192.168.205.73:1337');


describe('Testando as requisição do tipo GET' , () =>
{
    it('Devo retornar o status code 200', async() => 
    {
        await spec()
            .get('/api/tarefas')
            .expectStatus(200)
    })
    
    it('Deve listar todas as tarefas', async() =>{
        await spec()
        .get('/api/tarefas/{id}')
        .withPathParams('id', 2)
        .expectStatus(200)
        .expectJsonMatch({

            "data": notNull()

    });

    })
     it('Deve retornar uma tarefa pelo ID', async() =>{
        await spec()
        .get('/api/tarefas/{id}')
        .withPathParams('id', 2)
        .expectStatus(200)
        .expectJsonMatch({

            "data": notNull()

    });
     })
     describe('Testando aas requisições do tipo POST', () =>
    {
                    const taskDescription = 'Criar o BD do PI';
        it('o status code 200 - Cria uma nova tarefa', async() => 
        {
            const id = await spec()
                .post('/api/tarefas')
                .withJson(
                    {
                        'data':
                        { 
                            'nome': taskDescription
                        }
                    }
                )
                .expectStatus(200)
                .returns('data.id')
    
                await spec()
                .get('/api/tarefas/{id}')
                .withPathParams('id', id)
                .expectStatus(200)
                .expectJson('data.attributes.nome', taskDescription);
        })
     
    })
    describe('DELETE Tarefas Tests - Delete tarefas', () =>
    {
        const taskDescription = 'Tarefa recém deletada';
        it('o status code 200 - Crie uma nova tarefa e valide se ela existe', async() => 
        { 
            const id = await spec()
                .post('/api/tarefas')
                .withJson(
                    {
                        'data':
                        {
                            'nome': taskDescription
                        }
                    }
                )
                .expectStatus(200)
                .returns('data.id');
    
                await spec()
                .delete('/api/tarefas/{id}')
                .withPathParams('id', id)
                .expectStatus(200);
    
                await spec()
                .get('/api/tarefas/{id}')
                .withPathParams('id', id)
                .expectStatus(404);
        })
     
    })
    
})