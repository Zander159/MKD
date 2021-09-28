let spawnPoints = require('./configs/spawn_points.json').SpawnPoints


function Random(min, max) {
    let Number = Math.round(Math.random() * (max - min) + min)
    return Number
}


mp.events.add({
    "playerJoin": player => {
        player.data.ChatColor = [Random(0, 255), Random(0, 255), Random(0, 255)]
    },
    "playerChat": (player, message) => {
        let PlayerColor = player.data.ChatColor
        if (PlayerColor[0] <= 200 && PlayerColor[1] <= 200 && PlayerColor[2] <= 200) {
            var ColorID = [PlayerColor[0] + (55), PlayerColor[1] + (55), PlayerColor[2] + (55)]
        } else {
            var ColorID = [PlayerColor[0] - (55), PlayerColor[1] - (55), PlayerColor[2] - (55)]
        }
        mp.players.forEach((p) => {
            p.outputChatBox("!{" + PlayerColor + "}" + player.name + "!{" + ColorID + "}!{#FFFFFF}[" + player.id + "]!{#FFFFFF}: " + message)
        });
    }
});


mp.events.add('playerJoin', (player) => {
    player.customData = {}

    mp.players.forEach(_player => {
        if (_player != player)
            _player.call('playerJoinedServer', [player.id, player.name])
    });

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)])

    player.model = -67533719
    player.health = 100
    player.armour = 100
});