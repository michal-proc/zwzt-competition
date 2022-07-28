const crypto = require('crypto');

class CryptoManager{
    /**
     * Encrypt message provided by user
     * @param {string} author 
     * @param {string} message 
     * @param {number} messageDate
     */
    static encryptMessage(author,message,messageDate){
        const iv = crypto.scryptSync(author,messageDate.toString(),16)
        const Securitykey = crypto.scryptSync(messageDate.toString(),author,32)

        const cipher = crypto.createCipheriv("aes-256-cbc",Securitykey,iv)
        
        let encryptedMessage = cipher.update(message,"utf-8","hex")

        encryptedMessage += cipher.final("hex")

        return encryptedMessage
    }

    /**
     * Decrypt message provided by user
     * @param {string} author 
     * @param {string} message 
     * @param {number} messageDate
     */
    static decryptedMessage(author,message,messageDate){
        const iv = crypto.scryptSync(author,messageDate.toString(),16)
        const Securitykey = crypto.scryptSync(messageDate.toString(),author,32)

        const decipher = crypto.createDecipheriv("aes-256-cbc",Securitykey,iv)

        let decryptedMessage = decipher.update(message,"hex",'utf-8')

        decryptedMessage += decipher.final("utf-8")

        return decryptedMessage
    }
}

module.exports = CryptoManager