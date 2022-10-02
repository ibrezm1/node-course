const { EncrptStrings } = require('./crypto')

const es = new EncrptStrings('samplekey')
const hash = es.encrypt('Hello World!')

console.log(hash)

const text = es.decrypt(hash)

console.log(text) // Hello World!