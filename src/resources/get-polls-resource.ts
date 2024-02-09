import { prisma } from "../database/prisma"
import { FastifyInstance } from "fastify"
import {z} from "zod"


export async function getPollByID(app: FastifyInstance){
    app.get('/poll/:pollId', async (req, reply) => {
        const getPollID = z.object({
            pollId: z.string().uuid(),

        })

        const {pollId} = getPollID.parse(req.params)

        const poll = await prisma.polls.findFirst({
            where: {
                poll_key : pollId,
            },
            include: {
                options: {
                    select: {
                        title: true,
                        option_key: true,
                    }
                }
            }
        })

        return reply.status(200).send({poll_key: poll})
    
    })

}