const chalk = require('chalk')
const moment = require('moment')
const Debug = require('../utils/Debug')

module.exports = async (client) => {
    console.log(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(client.user.tag)}] Pret à servir dans ${chalk.cyan(client.channels.size)} channels sur ${chalk.cyan(client.guilds.size)} serveurs, pour un total de ${chalk.cyan(client.users.size)} utilisateurs.`);
    await client.user.setActivity(`your activity`, {
            type: 'WATCHING'
        })
        .then(() => Debug.logs(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(client.user.tag)}] Activity set`))
        .catch((error) => Debug.logs(error))
}
