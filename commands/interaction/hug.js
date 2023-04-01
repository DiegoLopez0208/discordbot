const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Envía un abrazo a un usuario mencionado.')
		.addUserOption(option => option.setName('usuario').setDescription('El usuario al que quieres enviarle el abrazo.')),
	async execute(interaction) { 
        const user = interaction.options.getUser('usuario');

        if (!user) {
            return interaction.reply('¡Por favor, menciona a un usuario válido!');
        }
// Array con los nombres de los archivos en la subcarpeta 'abrazos'
const files = fs.readdirSync('./gifs/abrazos');

// Seleccionar un archivo aleatorio
const randomFile = files[Math.floor(Math.random() * files.length)];

        const hugEmbed = new EmbedBuilder()
            .setColor('#FFE4E1')
            .setDescription(`¡${user}, has recibido un abrazo de parte de ${interaction.user}!`)
            .setImage(`attachment://${randomFile}`);

        try {
            await interaction.reply({
                files: [`./gifs/abrazos/${randomFile}`],
                embeds: [hugEmbed]
                });
        } catch (error) {
            await interaction.reply(`No se pudo enviar el abrazo a ${user}.`);
        }
	},
};