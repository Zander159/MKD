let camaraOn = 0 
let cam
mp.events.add("toggleCamara",(toggle) => {
    camaraOn = toggle
    if(toggle) {
        var camPos = new mp.Vector3(973.7493896484375,86.74250030517578,85.07453155517578)
        var plaPos = mp.players.local.position
    
        cam = mp.cameras.new('DEFAULT_SCRIPTED_FLY_CAMERA', camPos, mp.players.local.getRotation(5), 45)
        cam.pointAtCoord(plaPos.x, plaPos.y, plaPos.z)
        mp.game.ui.displayRadar(false)
        mp.game.ui.displayHud(false)
        
    }else {
        mp.game.cam.renderScriptCams(false, false, 0, false, false)
        mp.game.graphics.setTimecycleModifier("default")
        mp.game.ui.displayHud(true)
        mp.game.ui.displayRadar(true);
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