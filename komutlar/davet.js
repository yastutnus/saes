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

.setColor("PİNK")
.setTitle("**•Davet**")
.setThumbnail("")
.setDescription(`
• Alttaki linklerden bot ile ilgili linklere **ulaşabilirsiniz.**

• Sunucuma nasıl eklerim?
Sunucuna eklemek istiyorsan [buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=819468387146924032&scope=bot&permissions=2147483646) ekleyebilirsin.

• Destek Sunucumuz
[Destek Sunucusuna](https://discord.gg/CcKA3vw8gY) katılarak sizde güzel sohbetlere katılabilirsiniz!

© 2021 Koyuncu Mustafa Dayı | Tüm hakları saklıdır.
`)
 

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
    name: 'davet', 
    description: 'davet!',
    usage: '-davet'
};