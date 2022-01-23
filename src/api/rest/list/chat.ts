import Axios, { imagesConditon } from 'api/rest/axios'
import { IChatRoom } from 'models/chatRoom'
import { ID, IQueryPost } from 'models/common'
import { IMessage } from 'models/message'
import queryString from 'query-string'

class ChatAPI {
    url = `chat`

    async create(members: ID[]) {
        return Axios.post<ID[]>(`${this.url}/create`, members)
    }
    async getRoom(members: ID[]) {
        return Axios.get<IChatRoom>(
            `${this.url}/getRoom?${queryString.stringify({ members })}`
        )
    }
    async getMessages(query:IQueryPost,roomId:ID) {
        return Axios.get<IChatRoom[]>(
            `${this.url}/getMessage/${roomId}?${queryString.stringify(query)}`
        )
    }
    async sendMessage(messageInfo: Partial<IMessage>, roomId: string) {
        let form = new FormData()
        form.append('content', messageInfo.content || '')
        if (messageInfo.images) {
            for (const image of messageInfo.images) form.append('images', image)
        }

        return Axios.post(`${this.url}/addMessage/${roomId}`, form, imagesConditon)
    }
    async deleteMessage(messageInfo:IMessage){
        return Axios.delete(`${this.url}/deleteMessage/${messageInfo._id}`)
    }
}

export const chatAPI = new ChatAPI()
