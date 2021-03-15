const Discord = require ("discord.js");

exports.run = (client, message) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
const NARCOSEMBED = new Discord.MessageEmbed()

.setColor("RANDOM")
.setTitle("**  » Koyuncu Mustafa Dayı  **")
.setThumbnail("https://cdn.discordapp.com/emojis/770265448892858368.gif?v=1")
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/dmpzbMGA8a) **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=812217484970557451&scope=bot&permissions=0)** **•
Bir komut hakkında detaylı __yardım için__: **-yardım**`)
                    

.addField('https://discord.new/S672aGGUsnAv')
.addField('https://discord.new/EFnSXfZnakf9')
.addField('https://discord.new/akVGGCQtd8sP')
.addField('https://discord.new/fcHCWdMPAtfV')
.addField('https://discord.new/jcevqSQs2DJk')
.addField('https://discord.new/be5c6N9mDNNv')
.addField('https://discord.new/SZnStUaKCefe')
.addField('https://discord.new/H5P9nadzWkuw')
.addField('https://discord.new/yqEa5d6B28rA')
.addField('https://discord.new/uFfNftbXM9Jk')
.addField('https://discord.new/EPenkmEt3G2G')
.addField('https://discord.new/ngaPFmT7af98')
.addField('https://discord.new/wkpkX9fMXS4e')
.addField('https://discord.new/mbWREtXvBn9u')
.addField('https://discord.new/77Y2NPsDyUgN')
.addField('https://discord.new/nVuqgvXDaPsX')
.addField('https://discord.new/cBD2sY5n7YCA')
.addField('https://discord.new/XEwqET45MVNH')
return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'şablonlar', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'şablonlar'
};