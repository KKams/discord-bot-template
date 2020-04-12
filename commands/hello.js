const Discord = require("discord.js")

module.exports = {
    name: 'hello',
    description: 'Hello World!',
    cooldown: 5,
    async execute(client, message, args) {

        await message.reply('Hello World !')

    }
};