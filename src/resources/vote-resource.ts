import { prisma } from "../database/prisma"
import {randomUUID} from "node:crypto"
import { FastifyInstance } from "fastify"
import {z} from "zod"


export async function votePoll(app: FastifyInstance){
    app.post('/poll/:pollKey/vote', async (req, reply) => {
        const voteBody = z.object({
            pollOptionKey: z.string().uuid(),
        })

        const votePollParam = z.object({
            pollKey: z.string().uuid(),
        })

        const {pollOptionKey} = voteBody.parse(req.body)
        const {pollKey} = votePollParam.parse(req.params)

        let sessionCookieID = req.cookies.sessionId
        if(!sessionCookieID){
            sessionCookieID = randomUUID()
            reply.setCookie('sessionId', sessionCookieID, {
                path: '/', //all routes access this information cookie
                maxAge: 60 * 60 * 24 * 30, //30 days in seconds
                signed: true,
                httpOnly: true,
            })
        }

        return reply.status(201).send({sessionCookieID})
    
    })

}