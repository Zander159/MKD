require('./noclip/index.js')
require('./events/events.js')


// DISABLE THE AFK CAMERA EFFECT WHEN THE PLAYER IS AFK 
setInterval(() => {
	mp.game.invoke('0x9E4CFFF989258472')
	mp.game.invoke('0xF4F2C0D4EE209E20')
}, 25000)