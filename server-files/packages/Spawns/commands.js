mp.events.add("playerCommand", (player, command) => {
	const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0].toLowerCase();


		if (commandName == "coords") console.log(player.position);


	return player.outputChatBox(`El comando ${commandName} no existe.`);
});

