import { prisma } from "../database/prisma"
import { FastifyInstance } from "fastify"
import {z} from "zod"
import { redis } from "../database/redis"


export async function getPollByID(app: FastifyInstance){
    app.get('/poll/:pollId', async (req, reply) => {
        const getPollID = z.object({
            pollId: z.string().uuid(),

        })

        const {pollId} = getPollID.parse(req.params)

        const pollModel = await prisma.polls.findUnique({
            where: {
                id : pollId,
            },
            include: {
                options: {
                    select: {
                        title: true,
                        id: true,
                    }
                }
            }
        })

        if (!pollModel){
            return reply.status(400).send({message: 'Poll not foud!'})
        }

        const allOptionsAndScores = await redis.zrange(pollId, 0, -1, 'WITHSCORES') // return all options with your scores

        //transform the data structure of Redis in a OBJECT TYPESCRIPT "Record<string, number>" key-value
        const votes = allOptionsAndScores.reduce((optionObject, lineArrayRedis, indexArrayRedis) => {
            if (indexArrayRedis % 2 == 0){
                const score = allOptionsAndScores[indexArrayRedis + 1]

                Object.assign(optionObject, {[lineArrayRedis]: Number(score)})
            }

            return optionObject
        }, {} as Record<string, number>)

        console.log(votes)

        return reply.status(200).send({poll: {
            poll_key: pollModel.id,
            title_poll: pollModel.title,
            options: pollModel.options.map((optionModel) => {
                return {
                    option_key: optionModel.id,
                    title: optionModel.title,
                    score: (optionModel.id in votes) ? votes[optionModel.id] : 0 
                }
            })
        }})
    })
}