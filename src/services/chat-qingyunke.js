const axios = require('axios')

async function getAnswer(prob) {
    const res = await axios.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${prob}`)
    console.log(res.data.content)
    return res.data.content
}

module.exports = {
    getAnswer
}