type Message = {pollOptionId: string, votesAmount: number}
type Subscriber = (message: Message) => void

class VotesPubsub{
    private topics: Record<string, Subscriber[]> = {}

    public subscribe(pollId: string, subscriber: Subscriber){
        if(!this.topics[pollId]){
            this.topics[pollId] = []
        }

        this.topics[pollId].push(subscriber)

    }

    public publish(pollId: string, message: Message){
        if (!this.topics[pollId]){
            return 
        }

        for(const subscriber of this.topics[pollId]){
            subscriber(message)
        }
    }
}

export const votePubsub = new VotesPubsub()