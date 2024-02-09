import {fastify} from 'fastify';
import {createPoll} from './resources/polls-resource';


const app = fastify()

app.register(createPoll)

app.listen({port: 3333}).then(() => {
    console.log('Server is running on 3333!')
})