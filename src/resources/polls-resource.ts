import { prisma } from "../database/prisma"
import { FastifyInstance } from "fastify"
import {z} from "zod"


export async function createPoll(app: FastifyInstance){
    app.post('/polls', async (req, reply) => {
        const createPollBody = z.object({
            title: z.string()
        })

        const {title} = createPollBody.parse(req.body)

        const poll = await prisma.poll.create({
            data: {
                title,
            }
        })
    
        return reply.status(201).send({poll_key: poll.poll_key})
    
    })

}