const Gateway = require("../Gateway");

//TODO: FUDALA: implement ContactGateway
class ContactGateway extends Gateway {
    /**
     * 
     * @param {MessageModel} messageModel Model of message
     */
    saveMessage(messageModel) {
        this.makeQuery("INSERT INTO messages VALUES(?,?,?,?)", messageModel.getDataAsArray())
    }

    getMessages() {
        return this.makeQuery("SELECT * FROM messages ORDER BY id DESC", [])
    }

    deleteMessage(id) {
        return this.makeQuery("DELETE FROM messages WHERE id = ?", [id]);
    }
}

module.exports = ContactGateway