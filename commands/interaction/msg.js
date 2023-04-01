const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('msg')
		.setDescription('Envía un mensaje destacado a un usuario mencionado.')
		.addUserOption(option => option.setName('usuario').setDescription('El usuario al que quieres enviarle el mensaje.'))
        .addStringOption(option => option.setName('mensaje').setDescription('Ingresa el mensaje que quieres mostrar en el embed.')),
	async execute(interaction) { 
        const user = interaction.options.getUser('usuario');
        const mensaje = interaction.options.getString('mensaje');

        if (!user) {
            return interaction.reply('¡Por favor, menciona a un usuario válido!');
        }
        if (!mensaje) {
			return interaction.reply('Por favor, ingresa un mensaje para mostrar en el embed.');
		}
// Array con los nombres de los archivos en la subcarpeta 'jornada'
const files = fs.readdirSync('./gifs/jornada');

// Seleccionar un archivo aleatorio
const randomFile = files[Math.floor(Math.random() * files.length)];

        const jornadaEmbed = new EmbedBuilder()
            .setColor('#FFE4E1')
            .setDescription(`${user} te envía un mensaje especial ${interaction.user} <3.`)
            .setImage(`attachment://${randomFile}`)
            .addFields({ name: 'Mensaje:', value: `_**${mensaje}**_` });
            
        try {
            await interaction.reply({
                files: [`./gifs/jornada/${randomFile}`],
                embeds: [jornadaEmbed]
                });
        } catch (error) {
            await interaction.reply(`No se pudo enviar el mensaje a ${user}.`);
        }
	},
};