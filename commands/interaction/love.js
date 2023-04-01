const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('love')
		.setDescription('Envía un mensaje de amor a la persona que menciones.')
		.addUserOption(option => option.setName('usuario').setDescription('La persona a la que quieres dedicar tu mensaje.')),
	async execute(interaction) {
		const user = interaction.options.getUser('usuario');
        const files = fs.readdirSync('./gifs/love');
        // Seleccionar un archivo aleatorio
const randomFile = files[Math.floor(Math.random() * files.length)];

		if (!user) {
			return interaction.reply('¡Por favor, menciona a una persona!');
		}

		const loveEmbed = new EmbedBuilder()
			.setColor('#FF69B4')
			.setTitle('¡Un mensaje de amor para ti 💌!')
			.setDescription(`¡Hola ${user}! Quiero que sepas que eres una persona muy especial para mí y que te aprecio muchísimo. Quiero que siempre estés a mi lado y que podamos compartir muchos momentos felices juntos.💙🥺`)
			.setImage(`attachment://${randomFile}`)
            .setTimestamp()
			.setFooter({ text: `Con mucho amor para ti 🖤. De parte de: ${interaction.user.username}`, iconURL: 'https://i.pinimg.com/564x/8e/96/4b/8e964b41c85ea1844b3355eae9638fcd.jpg' });
            try {
                await interaction.reply({
                    files: [`./gifs/love/${randomFile}`],
                    embeds: [loveEmbed]
                    });
                } catch (error) {
                    await interaction.reply(`No se pudo enviar el mensaje a ${user}.`);
                }
            },
        };