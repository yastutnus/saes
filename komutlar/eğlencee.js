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
.setThumbnail("https://media.discordapp.net/attachments/814901535242453063/815242361076318228/SoggyContentCurassow-small.gif")
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/dmpzbMGA8a) **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=812217484970557451&scope=bot&permissions=0)** **•
Bir komut hakkında detaylı __yardım için__: **-yardım**`)

.addField('**• Komutlar**')
.addField('> -zarat ',' Zar atarsınız')
.addField('-atasözü',' random atasözü atar')
.addField('> -kasaaç ',' CsGo kasası açmaya ne dersin?.')
.addField('> -emojiyazı ',' Emojili yazı yazmaya ne dersin?.')
.addField('> -espiri','   Bot espiri yapar.')
.addField('> -sor ',' Bot sorduğunuz soruya cevap verir.')
.addField('> -vine','   Bot size komik paylaşımlar gösterir.')
.addField('> -adamasmaca ',' Adam asmaca oyunu.')
.addField('> -balıktut','  Dereden balık tutarsınız.')
.addField('> -tersyazı','   Yazdığınız yazıyı bot tersten yazar')
.addField('> -mcskin',' Yazdığınız ismin minecraft görünüşünü atar.')
.addField('> -token ','   Botun tokenini gösterir.')
.addField('> -düello','   Arkadaşlarınızla düello yaparsınız.')
.addField('> -wasted','   Polis tarafından yakalanırsnız')
.addField('> -yumruk-at','   Etiketlediğin kişiye bot yumruk atar.')
.addField('> -yazan-kazanır','   Yazan kazanır oyunu.')
.addField('>-kapaklaf','   Etiketlediğin kişiye bot kapaklaf söyler.')
.addField('> -şanslısayım( ','  Şanslı sayını bulmaya calışır.')
.addField('> -kaçcm ','  Malafatını ölçer.')
.addField('> » -adamol ','  adam olursun')
.addField('> -ağla ',' Ağlarsınız')
.addField('> -atatürk ','  Atatürkün fotoğrafını atar')
.addField('> -hapishane','   Hapishane işte qwe')
.addField('> -havadurumu ','  Hava durumunu gösterir')
.addField('> -hediye-ver ','  Hediye verir ')
.addField('> -ilginçbilgi ','  İlginç bilgiler işte kanka')
.addField('-intihar-et',' İntihar edersiniz')
.addField('-kahve',' Kahve içersiniz ab')
.addField('-renkara',' Renk ararsınız')
.addField('-kutuaç',' bs kutu açarsın')

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
    name: 'eğlence', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: '-eğlence'
};