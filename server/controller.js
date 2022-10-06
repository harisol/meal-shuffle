import { sendMessage } from "./rabbitmq-service.js"

export const publishMessage = (req, res) => {
    sendMessage('hello')
    res.json({message: 'message published'})
}