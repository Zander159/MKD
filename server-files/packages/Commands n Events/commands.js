mp.events.add("playerCommand", (player, command) => {
	const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0].toLowerCase()


	if (commandName == "coords") console.log(player.position)

	//COMMAND WHO TRIGGER THE CAMERAS (CAN BE TRIGGER IN OTHER WAYS)
	if (commandName == "c") {
		switch (parseInt(args[0])) {
			case 0:
				player.call("toggleCamara", [0])
				player.position = new mp.Vector3(1272, -1712, 54)
				break
			case 1:
				player.call("toggleCamara", [1])
				player.position = new mp.Vector3(980, 89, 77)
				break
			case 2:
				player.call("toggleCamara", [2])
				player.position = new mp.Vector3(241, 226, 100)
				break
			case 3:
				player.call("toggleCamara", [3])
				player.position = new mp.Vector3(255, 205, 96)
			default:
				player.outputChatBox('Esa camara no esta disponible')
				break
		}
		return true
	}

	//TP COMMAND
	if (commandName == "tp") {
		switch (parseInt(args[0])) {
			case 1:
				player.position = new mp.Vector3(979, 87, 80)
				break
			case 2:
				player.position = new mp.Vector3(243, 219, 106)
				break
			default:
				player.outputChatBox('Ese tp no esta disponible')
				break
		}
		return true
	}

	return player.outputChatBox(`El comando ${commandName} no existe.`)
});