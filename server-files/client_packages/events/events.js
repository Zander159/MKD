let camaraOn = 0
let cam
let camPos

mp.events.add("toggleCamara", (toggle) => {
    camaraOn = toggle
    plaRot = mp.players.local.getRotation(5)
    plaPos = mp.players.local.position
    mp.game.ui.displayHud(!toggle)
    mp.game.ui.displayRadar(!toggle)

    if (toggle != 0) mp.game.graphics.setTimecycleModifier('phone_cam')

    if (toggle == 1) {
        camPos = new mp.Vector3(973.7493896484375, 86.74250030517578, 85.07453155517578)
        cam = mp.cameras.new('Casino', camPos, plaRot, 45)
        cam.pointAtCoord(plaPos.x, plaPos.y, plaPos.z)

    } else if (toggle == 2) {
        camPos = new mp.Vector3(237.06117248535156, 227.80938720703125, 113.44822692871094)
        cam = mp.cameras.new('Bank', camPos, plaRot, 35)
        cam.pointAtCoord(plaPos.x, plaPos.y, plaPos.z)

    } else {
        mp.game.cam.renderScriptCams(false, false, 0, false, false)
        mp.game.graphics.setTimecycleModifier("default")
    }
})

mp.events.add('render', () => {
    if (camaraOn) {
        mp.game.cam.renderScriptCams(true, false, 0, true, false)
    }
})

//Zoom camara
const zoomSpeed = 1
const minZoom = 10.0
const maxZoom = 50.0

mp.events.add('render', () => {
    if (camaraOn) {
        mp.game.controls.disableAllControlActions(2)

        let zoomIn = (mp.game.controls.getDisabledControlNormal(2, 40) * zoomSpeed)
        let zoomOut = (mp.game.controls.getDisabledControlNormal(2, 41) * zoomSpeed)

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
});