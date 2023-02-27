const {XMLBuilder} = require('fast-xml-parser')

function wxReplyFormat(jsO) {
    const newO = {
        xml: jsO
    }
    const builder = new XMLBuilder();
    const xmlStr = builder.build(newO)
    return xmlStr
}

module.exports = {
    wxReplyFormat
}