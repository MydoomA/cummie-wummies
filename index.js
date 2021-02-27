const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios').default;

const prefix = ',';

const functions = {
	getBool: function(string) {
		const yes = ['on', 'true', 'yes', 'y'];
		const no = ['off', 'false', 'no', 'n'];

		var value = null;
		yes.forEach(str => {
			if (string === str) {
				value = true;
			}
		});
		no.forEach(str => {
			if (string === str) {
				value = false;
			}
		});
		return value;
	},
	guildprotection: true
};

client.on('ready', function() {
	console.log(client.user.tag + ' Selfbot Ready.');
	require('./online.js').run();
	client.user.setPresence({
		game: {
			name: 'My inevitable doom <3',
			type: 'STREAMING',
			url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
		}
	});
});

client.on('message', function(message) {
	if (
		message.content.includes('discord.gift') ||
		message.content.includes('discordapp.com/gifts/')
	) {
		var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/;

		var NitroUrl = Nitro.exec(message.content);
		var NitroCode = NitroUrl[0].split('/')[1];

		console.log(`A Nitro was found in ${message.channel.id}. Lining up shot.`);

		axios({
			method: 'POST',
			url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
			headers: {
				Authorization: process.env.USER_TOKEN
			}
		})
			.then(() =>
				console.log(
					`Successfully redeemed a nitro that was found in ${
						message.guild.name
					}. Target down.`
				)
			)
			.catch(ex =>
				console.log(
					`Couldn't claim Nitro. Link is expired, fake or it's already claimed!`
				)
			);
	}

	if (functions.guildprotection === true) {
		if (message.guild !== null) return;
	}

	if (message.author.id !== client.user.id) return;

	const args = message.content.substring(prefix.length).split(' ');
	const command = args.shift();

	if (command === 'embed') {
		message.delete();

		const embed = new Discord.RichEmbed()
			.setColor(require('randomcolor')())
			.setDescription(args.join(' '));

		message.channel.send(embed);
	}
	if (command === 'gchat') {
		message.delete();

		functions.guildprotection = functions.getBool(args[0]);

		const embed = new Discord.RichEmbed()
			.setColor(require('randomcolor')())
			.setAuthor(`Guild Protection`)
			.setDescription(
				`Guild chat protection is now set to \`${functions.guildprotection.toString()}\`.`
			);

		message.channel.send(embed);
	}
    if (command === 'cum') {
        
    }
});

client.login(process.env.USER_TOKEN);
