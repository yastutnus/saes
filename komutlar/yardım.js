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
.setTitle("**  » Koyuncu Mustafa Dayı**") 
.setThumbnail("https://media.discordapp.net/attachments/814901535242453063/815242361076318228/SoggyContentCurassow-small.gif")
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/dmpzbMGA8a)** **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=812217484970557451&scope=bot&permissions=0)** **•
Bir komut hakkında detaylı __yardım için__: **-yardım**`)

.addField('**• Komutlar**')
.addField('<a:tik1:819480965037948928> -kullanıcı ',' Kullanıcı komutları')
.addField('<a:tik1:819480965037948928> -moderasyon ',' → Moderasyon komutları')
.addField('<a:tik1:819480965037948928> -aboneyardım ',' → Ayarlamalı Abone Rol Sistemi')
.addField(' <a:tik1:819480965037948928> -eğlence','  → Eğlence Komutları')
.addField(' <a:tik1:819480965037948928> -eğlence2','  → Eğlence 2 Komutları')
.addField('<a:tik1:819480965037948928> -logo ',' → Logo Komutları')
.addField('<a:tik1:819480965037948928> -extra ',' → extra komutları l')
.addField('<a:tik1:819480965037948928> -şablonlar ',' → sunucu şablonları atar')
.addField("**__Gecikme Sürem__**", `<a:ping:814799772329312256> **${client.ws.ping}** ms Olarak Hesaplandı.`,true)
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
    name: 'yardım', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: ''
};