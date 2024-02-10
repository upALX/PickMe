import {fastify} from 'fastify';
import {createPoll} from './resources/polls-resource';
import {getPollByID} from './resources/get-polls-resource';
import {votePoll } from './resources/vote-resource';
import fastifyCookie from '@fastify/cookie';
import { fastifyWebsocket } from '@fastify/websocket';
import { pollResults } from './resources/poll-results-resource';


const app = fastify()


app.register(fastifyCookie, {
    secret: "4536b8e7-61a3-4e30-84d3-94b0ab56487e",
    hook: "onRequest",
})

app.register(fastifyWebsocket)

app.register(pollResults)
app.register(createPoll)
app.register(getPollByID)
app.register(votePoll)

app.listen({port: 3333}).then(() => {
    console.log('Server is running on 3333!')
})