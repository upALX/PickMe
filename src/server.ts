import {fastify} from 'fastify';
import {createPoll} from './resources/polls-resource';
import {getPollByID} from './resources/get-polls-resource';


const app = fastify()

app.register(createPoll)
app.register(getPollByID)

app.listen({port: 3333}).then(() => {
    console.log('Server is running on 3333!')
})