const Controller = require('../Controller');
const ContactGateway = require("./ContactGateway");
const CryptoManager = require('./CryptoManager');
const MessageModel = require('./MessageModel');
const crypto = require('crypto');

class ContactController extends Controller {
    constructor() {
        super()
        this.gateway = new ContactGateway()
    }

    saveMessage(req, res) {
        const messageModel = new MessageModel()
        const {
            author,
            message,
            xd
        } = req.body

        if (!xd && author && message) {
            const messageDate = Date.now()
            const encryptedMessage = CryptoManager.encryptMessage(author, message, messageDate)

            messageModel.setAuthor(author)
            messageModel.setMessage(encryptedMessage)
            messageModel.setMessageDate(messageDate)
            messageModel.setId(null)

            this.gateway.saveMessage(messageModel)
        }

        res.end()
    }

    async getMessages(req, res) {
        const allMessages = await this.gateway.getMessages()
        let dectyptedMessages = allMessages.map(el => {
            const messageModel = new MessageModel(el.id, el.author, "", el.messageDate)
            messageModel.setMessage(CryptoManager.decryptedMessage(el.author, el.message, el.messageDate))
            return messageModel
        })
        this.sendTemplatedView(res, 'admin/contact', {
            layout: "admin-layout",
            messages: dectyptedMessages,
            login: req.session.login
        })
    }

    async deleteMessage(req, res) {
        const { id } = req.params;
        if (!id) {
            this.rise404();
            return;
        }

        this.gateway.deleteMessage(id);
        res.redirect('/admin/contact');
    }
}

module.exports = new ContactController()