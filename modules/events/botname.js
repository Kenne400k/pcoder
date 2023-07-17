module.exports.config = {
    name: "botname",
    eventType: ["log:user-nickname"],
    version: "1.0.0",
    credits: "Judas",
    description: "Bot UPDATE NOTIFICATION"
};
module.exports.run = async function ({ event, api, Threads, Users }) {
  const { readFileSync, writeFileSync } = require("fs-extra");
  const { join } = require("path")
  const pathData = join(__dirname, '../commands', 'cache', "botname.json");
   var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  const { author, threadID, logMessageType, logMessageData } = event;
    console.log(author)
   console.log(logMessageData)
  try{
    const bpt = dataJson.find(i => i.botid == api.getCurrentUserID())
    if(!bpt) return
    //////////////////////////////////////////////////
    console.log(bpt.status == true && author !== api.getCurrentUserID() && logMessageData.participant_id == api.getCurrentUserID() && !global.config.ADMINBOT.includes(author)) //small check
    //////////////////////////////////////////////////////
    if(bpt.status == true && author !== api.getCurrentUserID() && logMessageData.participant_id == api.getCurrentUserID() && !global.config.ADMINBOT.includes(author)){
  const botname = `[ ${global.config.PREFIX} ] - ${global.config.BOTNAME}`
 api.changeNickname(`${botname}`, threadID, api.getCurrentUserID());
  api.sendMessage('Bạn Không Đủ Quyền Hạn Để Thay Đổi Tên Bot', threadID)
} else {
      console.log('false')
}
} catch(e){
      api.sendMessage('Bạn Không Đủ Quyền Hạn Để Thay Đổi Tên Bot', threadID)
}
}