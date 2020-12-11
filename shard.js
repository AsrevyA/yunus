// V12

const { ShardingManager } = require ('discord.js')
const ayarlar = require ('./ayarlar.json')

const shards = new ShardingManager ('./bot.js', {//BURASI ANA DOSYANIZ DEGİİŞİR

token : ayarlar.token,

totalShards : 1 //benim tercihim 1 yazan yere istediğinizi yazabilirsiniz

});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});
//SON EKLEDİKLERİM LOGA BİLGİLENDİRME AMAÇLI 

shards.spawn()
