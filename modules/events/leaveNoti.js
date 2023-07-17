module.exports.config = {
	name: "leaveNoti",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "HĐGN",//mod lại by Tòn
	description: "Thông báo bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
  const moment = require("moment-timezone");
  const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const iduser = event.logMessageData.leftParticipantFbId;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝐥𝐚̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐨𝐮𝐭" : "𝐛𝐢̣ 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐬𝐮́𝐭 𝐤𝐡𝐨̉𝐢 𝐧𝐡𝐨́𝐦";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `${threadID}.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg ="{name} {type}\n━━━━━━━━━━━━\n𝐕𝐚̀𝐨 𝐛𝐮𝐨̂̉𝐢 {session}\n𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧: {time}\n━━━━━━━━━━━━\n𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝗰𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗮̉𝗶 𝗻𝗴𝗵𝗶𝗲̣̂𝗽. 𝗦𝗮𝘆 𝗴𝗼𝗼𝗱𝗯𝘆𝗲 𝘃𝗮̀ 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗲̣𝗻 𝗻𝗴𝗮̀𝘆 𝗴𝗮̣̆𝗽 𝗹𝗮̣𝗶 \n━━━━━━━━━━━━\n→ 𝐔𝐑𝐋 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤:\nfacebook.com/{iduser}\n━━━━━━━━━━━━\n→ 𝐓𝐚̣𝐦 𝐛𝐢𝐞̣̂𝐭 {name} ❤️\n\n  " : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type)
  .replace(/\{iduser}/g, iduser).replace(/\{session}/g, hours <= 10 ? "Sáng" : 
    hours > 10 && hours <= 12 ? "Trưa" :
    hours > 12 && hours <= 18 ? "Chiều" : "Tối")
  .replace(/\{time}/g, time);

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));
  
	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}