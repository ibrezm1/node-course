const crypto = require('crypto')

class EncrptStrings {
    constructor(secretKey, iv ,algorithm = 'aes-256-ctr') {
        this.secretKey = secretKey.padStart(32, '0').substring(0, 32)
        this.algorithm = algorithm
        iv = Buffer.from(iv, 'utf8').toString('hex');
        this.iv = iv.padStart(32, '0').substring(0, 32)
    }

     encrypt (text)  {
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, Buffer.from(this.iv, 'hex'))
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        return encrypted.toString('hex')
    }

     decrypt  (hash){
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(this.iv, 'hex'))
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()])
        return decrpyted.toString()
    }

    apply(type,text){
        return type==='e' ? this.encrypt(text) : this.decrypt(text)
    }

}
module.exports = {
    EncrptStrings
}