const fs=require('fs');
const Discord=require("discord.js");
const client=new Discord.Client();
const db = require('quick.db')
const chalk = require("chalk");
const moment = require("moment");
const ayarlar=require("./ayarlar.json");
const express = require('express');
/////
const app = express()
app.get('/', (req, res) => res.send("Bot Aktif | Discord = https://discord.gg/XTsKVQSgpG"))
app.listen(process.env.PORT, () => console.log('Port ayarlandı: ' + process.env.PORT))
//////////////////


client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
     cmd.run(client, message, params, perms);
  }
})



const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};


///////////////////////////////KOMUTLAR//////////////////////////////

client.on("message", async message => {
    if(message.author.bot) return;
    
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["https://","http://","discord.gg",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"]
              if (reklam.some(word => message.content.toLowerCase().includes(word))) {
                try {
                  if (!message.member.hasPermission("MANAGE_GUILD")) {
                    message.delete();                                       
                    return message.channel.send(`<@${message.author.id}> Reklam Yapmak Yasak!`).then(message => message.delete(10000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    

///////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = [
        "yarak","mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","31","ananın amına yarak"
                  ]
            if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(`Küfür etme Yasak az kaldı ban atmama!`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          })

/////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

  var afklar = await db.fetch(`afk_${message.author.id}, ${message.guild.id}`);

  if (afklar) {
    db.delete(`afk_${message.author.id}, ${message.guild.id}`);
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`);

    message.reply(`Afklıktan Çıktın!`)
    try {
      let isim = message.member.nickname.replace("[AFK]", "");
      message.member.setNickname(isim).catch(err => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }
  let ms = require("ms");

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  let zaman = await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`);

  var süre = ms(new Date().getTime() - zaman);

  var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`);
  if (
    await db.fetch(
      `afk_${message.mentions.users.first().id}, ${message.guild.id}`
    )
  ) {
    if (süre.days !== 0) {
const dcs = new Discord.MessageEmbed()
.setTitle(":uyarii: Uyarı!")
.setDescription("Etiketlediniz Kullanıcı Afk!")
.addField("Afk Nedeni:",`> ${sebep}`)
.setColor("RANDOM")
.setThumbnail(message.author.avatarURL())
.addField("Afk Olma Süresi",`> ${süre}`);
message.channel.send(dcs)
      return;
    }
  }
});
////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
 
 
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea'|| msg.content.toLowerCase() == 'selam') {
          try {
 
                  return msg.reply(
                    'Aleyküm Selam, Hoşgeldin')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
   
    }
    if (!i) return;
 
    });

client.login(process.env.token)

client.on('guildDelete', guild => {

let Crewembed = new Discord.MessageEmbed()

.setColor("RED")
.setTitle(" Bot Bir sunucuda kicklendi,bilgiler;   ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('779609519222423573').send(Crewembed);
  
});


client.on('guildCreate', guild => {

let Crewembed = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" Bot Bir sunucuya eklendi,bilgiler;  ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('779609540147937280').send(Crewembed);
  
});


////////////////////////////////////////

client.on('ready', () => {
  setInterval(function() {
     let knl = client.channels.cache.get("776728215480696852")
     if(knl){
knl.send("**Kayıt olmak için** ``-kayıtol <isim> <yaş> `` **şeklinde doldurunuz.**")
     }
    }, 1800000) //1000 = 1 Saniye 1800000
}) 
 //////////////////////////////////////
client.on('ready', () => {
  setInterval(function() {
     let knl = client.channels.cache.get("779613501483515904")
     if(knl){
knl.send("** Abone rölü almak için youTube kanalıma gidip son videoya like,yorum atmanız ve ss alıp buraya atmanız gerekmektedir!**")
     }
    }, 1800000) //1000 = 1 Saniye 1800000
}) 
//////////////////////////

 client.on("guildMemberRemove", async member => {
  
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
    if (!canvaskanal) return;
  
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    var randomMsg = ["Sunucudan Ayrıldı."];
    var randomMsg_integer =
      randomMsg[Math.floor(Math.random() * randomMsg.length)];
  
    let msj = await db.fetch(`cikisM_${member.guild.id}`);
    if (!msj) msj = `{uye}, ${randomMsg_integer}`;
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "https://i.hizliresim.com/Wrn1XW.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
  
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "ro-BOT-güle-güle.png"
    );
  
      canvaskanal.send(attachment);
      canvaskanal.send(
        msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
      );
      if (member.user.bot)
        return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
    
  });
  
  client.on("guildMemberAdd", async member => {
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  
    if (!canvaskanal || canvaskanal ===  undefined) return;
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    var randomMsg = ["Sunucuya Katıldı."];
    var randomMsg_integer =
      randomMsg[Math.floor(Math.random() * randomMsg.length)];
  
    let paket = await db.fetch(`pakets_${member.id}`);
    let msj = await db.fetch(`cikisM_${member.guild.id}`);
    if (!msj) msj = `{uye}, ${randomMsg_integer}`;
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "https://i.hizliresim.com/UyVZ4f.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
  
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "ro-BOT-hosgeldin.png"
    );
  
    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  });

client.on(`guildMemberAdd`, async member => {

  const e = new Discord.RichEmbed()

    .setColor(`RANDOM`)

    .setImage(`https://media.giphy.com/media/A06UFEx8jxEwU/giphy.gif`)

    .addField(`Sunucuya gelene dmden gidecek mesaj`, `Mesaj`)

    .setFooter(`footer mesajÄ±`)

  member.send(e);

});

client.on('message', message => {

 if (message.content.toLowerCase() === '<@703985300304822293>') {

 message.delete()

 message.channel.send(message.author+",  **Yapımcımı Etiketleme**").then(message => message.delete(5000))

 

}

});


client.on("guildMemberAdd", async (member) => {
      let gkisi = client.users.get(member.id);
      const ktarih = new Date().getTime() - gkisi.createdAt.getTime();

    if (ktarih < 604800000) {
    member.addRole("813276640083705898") //şüpheli rol id

    }else{

    member.addRole("812668229092638720") //güvenli rol id

      }
});

client.on('guildMemberAdd', member => { 
if(member.user.bot === false) return

member.addRole('810845956933156866')
});




client.on("guildCreate", guild => {
guild.owner.send(`
**Merhaba, __${guild.owner.user.username}!__**
**Beni __Kurucusu__ olduğun __${guild.name}__ sunucusuna eklediğin için teşekkürler**

Botumuzdaki özelliklere daha hızlı ulaşabilmek için (https://discord.gg/mQ4vrkSdvQ) sunucumuza gelebilirsin.
`)
})


client.on("guildMemberAdd", async member => {
let judgedev = await db.fetch(`judgeteam?Ototag_${member.guild.id}`) 
let judgekanal = await db.fetch(`judgeteam?OtotagKanal_${member.guild.id}`)
if(!judgedev || !judgekanal) return
 
 member.setNickname(`${judgedev} ${member.user.username}`)
client.channels.cache.get(judgekanal).send(`**${member.user.username}** Adlı Kullanıcıya Otomatik Tag Verildi! :inbox_tray:`)
 
});

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "KMD"; //tagÄ±nÄ±z
    let sunucu = "807528121750126592"; //sunucu ID
    let kanal = "813134266246496287" //log kanal id
    let rol = "813323518971740190"; // rol ID
    if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(kanal).send(`${newUser} ${tag} tagÄ±nÄ± aldÄ±ÄŸÄ± iÃ§in <@&${rol}> rolÃ¼nÃ¼ kazandÄ±!`)
      client.guilds.get(sunucu).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
      client.channels.get(kanal).send(`${newUser} ${tag} tagÄ±nÄ± Ã§Ä±kardÄ±ÄŸÄ± iÃ§in <@&${rol}> rolÃ¼nÃ¼ kaybetti!`)
    }

  }
})

client.on('guildMemberUpdate', async (oldMember, newMember) => {// chimp#0110
let guild = oldMember.guild || newMember.guild;
  
    let chimp = await guild.fetchAuditLogs({type: 'MEMBER_ROLES_UPDATE'});
  
    if(chimp) {
      
let asd = []

oldMember.roles.forEach(c => {
if(!newMember.roles.has(c.id)) {
require('quick.db').delete(`${guild.id}.${c.id}.${oldMember.id}`)
}
})
newMember.roles.forEach(c => {
if(!oldMember.roles.has(c.id)) {
require('quick.db').set(`${guild.id}.${c.id}.${newMember.id}`, 'eklendi')
}
  
})
    
    }
})// codare ♥

client.on('roleDelete', async role => {// chimp#0110
let guild = role.guild;
  
  let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
  let member = guild.members.get(e.entries.first().executor.id);
  //if(member.hasPermission("ADMINISTRATOR")) return;
        
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  }).then(async rol => {
    
  guild.members.forEach(async u => {
  const dat = await require('quick.db').fetch(`${guild.id}.${role.id}.${u.id}`)
  if(dat) {

  guild.members.get(u.id).addRole(rol.id)
  }
    
  })
client.channels.get('log kanal id').send(new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setTitle(`Bir rol silindi!`)
.setDescription(`${rol.name} isimli rol ${member} tarafından silindi ve bende tekrardan rolü oluşturdum, önceden role sahip olan tüm kişilere rolü geri verdim.`))
  })
  
})// codare ♥

client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/Wrn1XW.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));

  if (!canvaskanal || canvaskanal ===  undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/UyVZ4f.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

client.on('message', async msg => {
  if (msg.content === `<@812217484970557451>`) return msg.channel.send(`Prefixim ${ayarlar.prefix}`);
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "sa") {
    krevzmesaj.channel.send(
      "as hoşgeldin"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "naber") {
    krevzmesaj.channel.send(
      "iyidir senden naber"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "sunucu link") {
    krevzmesaj.channel.send("`https://discord.gg/mQ4vrkSdvQ`");
  }
});

client.on("message", krevzlinkmsg => {
  if (krevzlinkmsg.content.toLowerCase() === "kumar oynayak mı?") {
    krevzlinkmsg.channel.send(
      "valla ben riske giremem"
    );
  }
});

client.on("message", krevzmsg => {
  if (krevzmsg.content.toLowerCase() === "ağlıyom") {
    krevzmsg.channel.send(
      "nabam aq"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "mutluyum") {
    krevzmesaj.channel.send(
      "keşke mutlu olmak kolay olsa bea"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "napim") {
    krevzmesaj.channel.send(
      "ananun amunu yula"
    );
  }
});


client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "bot çok kötü") {
    krevzmesaj.channel.send(
      "o zaman siktir git ve gelme!"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "selam") {
    krevzmesaj.channel.send(
      "assssssssssssssssssssss"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "oc") {
    krevzmesaj.channel.send(
      "ayıp pezevenk"
    );
  }
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "oç") {
    krevzmesaj.channel.send(
      "ayıp pezevenk"
    );
  }
});

Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord android"


client.on('guildCreate', guild => {
    let virus = guild.channels.filter(c => c.type === "text").random()
    virus.send("Dostum beni sunucuna ekledin tşk -yardım yazarak komutları listleyebilirsin");
});



client.on("message", msg => {
var dm = client.channels.cache.get("813134272319586347")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`🔔 Yeni Bir Mesajım Var`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});



client.on('message', async message => {
if(message.author.bot || message.channel.type !== 'text') return;
if(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).length > 1) {
let emojiler = [];
message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).forEach(x => {
emojiler.push(message.guild.emojis.cache.find(s => s.name.includes(x.replace(/:/g, ''))));
});
let newMessage;
var d = -1;
if(emojiler.length >= 1) {
emojiler.forEach(s => {
d++
if(!newMessage) newMessage = message.content.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
if(newMessage) newMessage = newMessage.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
});
};
return message.delete() && message.channel.send(`**${message.author.tag}**: ${newMessage}`);
};
let emoji = message.content.split('814783089749393418').find(x => x.startsWith(':') && x.endsWith(':')).toString().replace(/:/g, '');
let emojii = message.guild.emojis.cache.find(x => x.name.includes(emoji));
if(!emojii) return;
message.content = message.content.replace(message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')), emojii);
return message.delete() && message.channel.send(`**${message.author.tag}**: ${message.content}`);
});// 

client.on('guildMemberAdd', async member => {
  
  let hgbb = db.get(`cshgbb.${member.guild.id}`)
  let sunucu =  member.guild.channels.get(hgbb)
if(hgbb){
if(sunucu){
  const embed = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`${member} Sunucucuya Katıldı Toplam Üye: \`${member.guild.memberCount}\``)
  .setFooter(member + `Sunucuya Katıldı!`)
  sunucu.send(embed) 
}}
})




client.on("guildCreate", async guild => {
  guild.owner.send("beni sunucuna eklediğin için tşk");
  guild.owner.send("bu destek sunucusu detaylı bilgi almak için gel https://discord.gg/AC9YRcEsZn");
});

client.on("guildDelete", async guild => {
  guild.owner.send("beni sunucundan neden attın hüü");
    guild.owner.send("sen atmadıysan veya geri eklemek istersen https://discord.com/oauth2/authorize?client_id=812217484970557451&scope=bot&permissions=0 ");
});


    

client.on('message', async message => {// can#0002
if(message.author.bot || message.channel.type !== 'text') return;
if(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).length > 1) {
let emojiler = [];
message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).forEach(x => {
emojiler.push(message.guild.emojis.cache.find(s => s.name.includes(x.replace(/:/g, ''))));
});
let newMessage;
var d = -1;
if(emojiler.length >= 1) {
emojiler.forEach(s => {
d++
if(!newMessage) newMessage = message.content.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
if(newMessage) newMessage = newMessage.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
});
};
return message.delete() && message.channel.send(`**${message.author.tag}**: ${newMessage}`);
};
let emoji = message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')).toString().replace(/:/g, '');
let emojii = message.guild.emojis.cache.find(x => x.name.includes(emoji));
if(!emojii) return;
message.content = message.content.replace(message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')), emojii);
return message.delete() && message.channel.send(`**${message.author.tag}**: ${message.content}`);
});


 client.on('guildMemberAdd', youthanasia => {
    if (db.has(`isimreklamkoruma.${youthanasia.guild.id}`) && youthanasia.user.username.toLowerCase().replace(/ /g, '').includes('discord.gg')) {
      youthanasia.send('İsminde reklam içerikli bir şey olabileceğinden dolayı seni yasakladım.').catch(err => console.warn('Bir kişiyi reklam içerikli isimden banladım ancak o kişiye mesaj yollayamadım.'));
      youthanasia.ban({ reason: 'Reklam içerikli kullanıcı adı.' });
    };
  });

  client.on('guildMemberUpdate', (rifleman, youthanasia) => {
    if (db.has(`isimreklamkoruma.${youthanasia.guild.id}`) && youthanasia.displayName.toLowerCase().replace(/ /g, '').includes('discord.gg')) {
      youthanasia.send('İsminde reklam içerikli bir şey olabileceğinden dolayı seni yasakladım.').catch(err => console.warn('Bir kişiyi reklam içerikli isimden banladım ancak o kişiye mesaj yollayamadım.'));
      youthanasia.ban({ reason: 'Reklam içerikli kullanıcı adı.' });
    };
  });


function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
} 

client.on('message', async(message) => {
if (!message.guild) return
let acikmi = await db.fetch(`${message.guild.id}.capsengel`)
if (!acikmi) return
if (message.author.bot) return
if (message.member.hasPermission("MANAGE_MESSAGES")) return
let matched = message.content.replace(/[^A-Z]/g, "").length
let yuzde = percentage(matched, message.content.length)
if (Math.round(yuzde) > acikmi.yuzde) {
  message.delete()
  message.author.send(new Discord.MessageEmbed().setColor("RED").setTimestamp().setFooter(`${message.guild.name}`,message.guild.iconURL({dynamic:true})).setAuthor("CapsLock Engelleme Sistemi").setDescription("**Uyarı! "+message.guild.name+" sunucusunda büyük harfle yazma engeli bulunmaktadır!**\nBu sebepten göndermiş olduğunuz mesaj silindi."))
  message.channel.send(new Discord.MessageEmbed().setColor("RED").setTimestamp().setFooter(`${message.guild.name}`,message.guild.iconURL({dynamic:true})).setAuthor("CapsLock Engelleme Sistemi",message.author.displayAvatarURL({dynamic:true})).setDescription(message.author.username+" - "+(message.member.nickname ? `${message.member.nickname} - ${message.author.id}` : message.author.id)+"\n**Uyarı!  Bu sunucuda büyük harfle yazma engeli bulunmaktadır!**\nBu sebepten göndermiş olduğunuz mesaj silindi.")).then(msg=>msg.delete({timeout:3000}))
}else{return}
})

client.on('guildMemberAdd', async member => {// can#0002

  const database = require('quick.db');
  if(member.user.bot) return;
  
  const kanal = member.guild.channels.cache.get(await database.fetch(`fake-channel.${member.guild.id}`) || 0);
  const zaman = await database.fetch(`fake-time.${member.guild.id}`);
  const rol = member.guild.roles.cache.get(await database.fetch(`fake-role.${member.guild.id}`) || 0);
  if(!kanal || !zaman || !rol) return;

  if(member.user.createdAt.getTime() < require('ms')(zaman)) {

    member.roles.add(rol.id);
    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Fake Tetikleyici')
    .setDescription(`**${member.user.tag}** Fake sistemine takıldı!`);
    return kanal.send(embed);

  } else return;

});// codare 

