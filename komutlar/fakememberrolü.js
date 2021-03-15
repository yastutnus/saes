const Discord = require('discord.js');
const database = require('quick.db');

exports.run = (client, message, args) => {// can#0002

  function embedCreate(color, title, description) {
    const embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    return message.channel.send(embed);
  };

  if(!message.member.hasPermission('ADMINISTRATOR')) return embedCreate('RED', 'Başarısız!', 'Bu komutu kullanmak için yeterli yetkin bulunmuyor.');
  if(!args[0] && !database.fetch(`fake-role.${message.guild.id}`)) return embedCreate('RED', 'Başarısız!', 'Bir rol etiketlemeli, yada IDsini girmelisin.');
  if(args[0] && database.fetch(`fake-role.${message.guild.id}`)) {
    database.delete(`fake-role.${message.guild.id}`);
    return embedCreate('GREEN', 'Başarılı!', 'Fake üyelere verilecek rol sıfırlandı.');
  };

  let role = message.guild.roles.cache.get(args[0]);
  if(!role) {
    if(message.mentions.roles.first()) {
      role = message.mentions.roles.first();
    };
  };

  if(!role) return embedCreate('RED', 'Başarısız!', 'Belirttiğin rolü bu sunucuda bulamıyorum.');

  database.set(`fake-role.${message.guild.id}`, role.id);
  return embedCreate('GREEN', 'Başarılı!', `Fake rolü **${role.name}** olarak ayarlandı.`);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fake-member-role'],
  permLevel: 0
};
 
exports.help = {
  name: 'fakememberrole'
};// codare