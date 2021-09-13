mp.events.add("playerCommand", (player, command) => {
	const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0].toLowerCase();


		if (commandName == "coords") console.log(player.position);

		if(commandName == "camara") {
			switch (parseInt(args[0])) {
				case 0:
					player.call("toggleCamara", [0])
					break;
				case 1:
					player.call("toggleCamara", [1]);
					break;
				default:
					player.outputChatBox('Esa camara no esta disponible')
					break;
			}
			return true
		}

	return player.outputChatBox(`El comando ${commandName} no existe.`);
});

