let camaraOn = 0
let cam
let clon
let camPos
let isclonCreated = false

mp.events.add("toggleCamara", (toggle) => {
    camaraOn = toggle

    //SET CAMERAS ROT
    camRot1 = new mp.Vector3(-36.5, 2.5, -84.5)
    camRot2 = new mp.Vector3(-17, -4, -71)
    camRot3 = new mp.Vector3(-21, 9, 38)

    //DISABLE RADAR&HUD
    mp.game.ui.displayHud(!toggle)
    mp.game.ui.displayRadar(!toggle)

    //CREATE A CLON IN A CHOSEN POSITION IN REPLACEMENT OF THE PLAYER
    if (toggle != 0 && isclonCreated == false) {
        clon = mp.peds.new(mp.game.joaat('ig_mp_agent14'), new mp.Vector3(1272, -1712, 54), 100.0, 0);
        isclonCreated = true
    } else if (isclonCreated == true) {
        clon.destroy()
        isclonCreated = false
    }

    //FREEZE THE PLAYER WHEN THE CAM IS RENDERING AWAY
    if (toggle != 0) { mp.players.local.freezePosition(true) } else { mp.players.local.freezePosition(false) }

    //CAMERA FILTER
    if (toggle != 0) mp.game.graphics.setTimecycleModifier('phone_cam')

    //CAMERA CHOOSE&TOGGLE
    if (toggle == 1) {
        camPos = new mp.Vector3(974, 87, 85)
        cam = mp.cameras.new('Casino', camPos, camRot1, 45)
    } else if (toggle == 2) {
        camPos = new mp.Vector3(241.6, 214.7, 108.5)
        cam = mp.cameras.new('Bank1', camPos, camRot2, 50)
    } else if (toggle == 3) {
        camPos = new mp.Vector3(255, 205, 108)
        cam = mp.cameras.new('Bank2', camPos, camRot3, 50)
    }
    else {
        mp.game.cam.renderScriptCams(false, false, 0, false, false)
        mp.game.graphics.setTimecycleModifier("default")
    }
})
//RENDER THE CAMERA
mp.events.add('render', () => {
    if (camaraOn) {
        mp.game.cam.renderScriptCams(true, false, 0, true, false)
    }
})

//SETTINGS
const zoomSpeed = 1
const minZoom = 10.0
const maxZoom = 50.0
const mouseSensitivity = 2.0;

mp.events.add('render', () => {
    if (camaraOn) {
        mp.game.controls.disableAllControlActions(2)

        let x = (mp.game.controls.getDisabledControlNormal(0, 220) * mouseSensitivity)
        let y = (mp.game.controls.getDisabledControlNormal(0, 221) * mouseSensitivity)
        let zoomIn = (mp.game.controls.getDisabledControlNormal(2, 40) * zoomSpeed)
        let zoomOut = (mp.game.controls.getDisabledControlNormal(2, 41) * zoomSpeed)
        let currentRot = cam.getRot(2);

        currentRot = new mp.Vector3(currentRot.x - y, 0, currentRot.z - x);

        //lIMIT CAMERA NEWX= Height NEWZ= Angle
        if (camaraOn == 1) {
            if (currentRot.x + y * -10 * (0.3) <= camRot1.x + 10 && currentRot.x + y * -10 * (0.3) >= camRot1.x - 15) { newX = currentRot.x }
            if (currentRot.z + x * -10 * (0.3) <= camRot1.z + 110 && currentRot.z + x * -10 * (0.3) >= camRot1.z - 50) { newZ = currentRot.z }
        } else if (camaraOn == 2) {
            if (currentRot.x <= camRot2.x + 10 && currentRot.x + y * -10 * (0.3) >= camRot2.x - 15) { newX = currentRot.x }
            if (currentRot.z + x * -10 * (0.3) <= camRot2.z + 45 && currentRot.z + x * -10 * (0.3) >= camRot2.z - 70) { newZ = currentRot.z }
        } else if (camaraOn == 3) {
            if (currentRot.x <= camRot3.x + 10 && currentRot.x + y * -10 * (0.3) >= camRot3.x - 15) { newX = currentRot.x }
            if (currentRot.z + x * -10 * (0.3) <= camRot3.z + 30 && currentRot.z + x * -10 * (0.3) >= camRot3.z - 70) { newZ = currentRot.z }
        }
        cam.setRot(newX, currentRot.y, newZ, 2)


        //ZOOM CAMERA
        if (zoomIn > 0) {
            let currentFov = cam.getFov()
            currentFov -= zoomIn
            if (currentFov < minZoom)
                currentFov = minZoom
            cam.setFov(currentFov)
        } else if (zoomOut > 0) {
            let currentFov = cam.getFov()
            currentFov += zoomOut
            if (currentFov > maxZoom)
                currentFov = maxZoom
            cam.setFov(currentFov)
        }
    }

    //PRESS X TO GET ROT (WHEN CAMERA IS CREATED)
    let trigger = mp.keys.isDown(88);

    if (trigger) mp.console.logInfo("Rot: " + JSON.stringify(cam.getRot(2)))
})