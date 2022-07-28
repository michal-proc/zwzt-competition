class MessageModel{
    
    constructor(id = null,author="",message="",messageDate=0){
        this.id = id
        this.author = author
        this.message = message
        this.messageDate = messageDate
    }

    getId(){
        return this.id
    }

    /**
    * 
    * @param {number|null} id 
    */
    setId(id){
        this.id = id
    }

    getAuthor(){
        return this.author
    }

    /**
    * 
    * @param {string} author 
    */
    setAuthor(author){
        this.author = author
    }

    getMessage(){
        return this.message
    }

    /**
    * 
    * @param {string} message 
    */
    setMessage(message){
        this.message = message
    }

    getMessageDate(){
        return this.messageDate
    }

    /**
    * 
    * @param {number} messageDate 
    */
    setMessageDate(messageDate){
        this.messageDate = messageDate
    }

    getDataAsArray() {
        return [this.id, this.author,this.message,this.messageDate];
    }
}

module.exports = MessageModel