import { FastifyInstance } from "fastify";
import { votePubsub } from "../utils/votes-pub-sub";
import { z } from "zod";

export  async function pollResults(app: FastifyInstance){
    app.get('/polls/:pollId/results', {websocket: true}, (connection, request) => {
        //USE WEBSOCKET
        // connection.socket.on('message', (message: string) => {
        //     connection.socket.send('Sent with websocket: ' + message)
        // })
        const getPollParams = z.object({
            pollId: z.string().uuid(),
        })

        const {pollId} = getPollParams.parse(request.params)

        //Using pubsub

        votePubsub.subscribe(pollId, (message) => {
            connection.socket.send(JSON.stringify(message))
        })
    })
}