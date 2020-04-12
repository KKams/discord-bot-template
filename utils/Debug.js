const dotent = require('dotenv').config()
const env = process.env

/**
 * @description Check if debug logs are in true value and return message, else nothing
 * @param {string} message 
 * @return Log or nothing
 */
const logs =  async (message) => {
    return await env.DEBUG_LOGS == 'true' ? console.log(message) : ''
}

module.exports = {
    logs
}