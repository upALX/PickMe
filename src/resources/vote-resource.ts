import { prisma } from "../database/prisma"
import {randomUUID} from "node:crypto"
import { FastifyInstance } from "fastify"
import {z} from "zod"
import { redis } from "../database/redis"


export async function votePoll(app: FastifyInstance){
    app.post('/poll/:pollsId/vote', async (req, reply) => {
        const voteBody = z.object({
            pollOptionKey: z.string().uuid(),
        })

        const votePollParam = z.object({
            pollsId: z.string().uuid(),
        })

        const {pollOptionKey} = voteBody.parse(req.body)
        const {pollsId} = votePollParam.parse(req.params)

        let sessionCookieID = req.cookies.sessionId

        if (sessionCookieID){
            const hasPreviewVote = await prisma.vote.findUnique({
                where: {
                    sessionId_pollsId: {
                        sessionId: sessionCookieID,
                        pollsId: pollsId
                    },
                }
            })

            if(hasPreviewVote && hasPreviewVote.pollOptionsId != pollOptionKey){
                await prisma.vote.delete({
                    where:{
                        id: hasPreviewVote.id
                    }
                })


                await redis.zincrby(pollsId, -1, hasPreviewVote.pollOptionsId)

            }else if(hasPreviewVote){
                return reply.status(400).send({message: "You already voted on this poll!"})

            }   
        }

        if(!sessionCookieID){
            sessionCookieID = randomUUID()
            reply.setCookie('sessionId', sessionCookieID, {
                path: '/', //all routes access this information cookie
                maxAge: 60 * 60 * 24 * 30, //30 days in seconds
                signed: true,
                httpOnly: true,
            })
        }

        await prisma.vote.create({
            data: {
                sessionId: sessionCookieID,
                pollsId: pollsId,
                pollOptionsId: pollOptionKey,
            }
        })

        await redis.zincrby(pollsId, 1, pollOptionKey) // a KEY, an increment, an member (value to compute)

        return reply.status(201).send()
    
    })

}