mp.events.add("playerCommand", (player, command) => {
	const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0].toLowerCase()


	if (commandName == "coords") console.log(player.position)

	if (commandName == "c") {
		switch (parseInt(args[0])) {
			case 0:
				player.call("toggleCamara", [0])
				player.position = new mp.Vector3(1272.230224609375,-1712.0103759765625,54.771488189697266)
				break
			case 1:
				player.call("toggleCamara", [1])
				player.position = new mp.Vector3(980.5184936523438, 89.01509094238281, 77.90386962890625)
				break
			case 2:
				player.call("toggleCamara", [2])
				player.position = new mp.Vector3(241.0095977783203, 226.02230834960938, 100.06800842285156)
				break
			default:
				player.outputChatBox('Esa camara no esta disponible')
				break
		}
		return true
	}

	if (commandName == "tp") {
		switch (parseInt(args[0])) {
			case 1:
				player.position = new mp.Vector3(979.6111450195312, 87.07451629638672, 80.99064636230469)
				break
			case 2:
				player.position = new mp.Vector3(243.0236358642578, 219.0295867919922, 106.28679656982422)
				break
			default:
				player.outputChatBox('Ese tp no esta disponible')
				break
		}
		return true
	}

	return player.outputChatBox(`El comando ${commandName} no existe.`)
});

