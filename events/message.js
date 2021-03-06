const dotent = require('dotenv').config()
const env = process.env
const chalk = require('chalk')
const moment = require('moment')
const Debug = require('../utils/Debug')
const Discord = require("discord.js")

module.exports = async (client, message) => {

    if (message.content.startsWith(env.BOT_PREFIX)) {
        const cooldowns = new Discord.Collection();
        const prefix = env.BOT_PREFIX;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
          || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if (command.permissions) {
            if (typeof command.permissions == "string") {
                if (!message.member.hasPermission(command.permissions)) {return message.reply('You don\' have permission to do this.')}
            } else {
                for(var i = 0; i<command.permissions.length; i++) {
                    if (!message.member.hasPermission(command.permissions[i])) {return message.reply('You don\' have permission to do this.')}
                }
            }
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

    }
}
