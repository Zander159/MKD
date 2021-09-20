let camaraOn = 0
let cam
let camPos

mp.events.add("toggleCamara", (toggle) => {
    camaraOn = toggle
    camRot1 = new mp.Vector3(-36.56012725830078, 2.657306765740941,-84.67811584472656)
    camRot2 = new mp.Vector3(-25.405691146850586,0,-174.14405822753906)
    mp.game.ui.displayHud(!toggle)
    mp.game.ui.displayRadar(!toggle)

    if (toggle != 0) mp.game.graphics.setTimecycleModifier('phone_cam')

    if (toggle == 1) {
        camPos = new mp.Vector3(973.7493896484375, 86.74250030517578, 85.07453155517578)
        cam = mp.cameras.new('Casino', camPos, camRot1, 45)
    } else if (toggle == 2) {
        camPos = new mp.Vector3(237.06117248535156, 227.80938720703125, 113.44822692871094)
        cam = mp.cameras.new('Bank', camPos, camRot2, 35)
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
const mouseSensitivity = 2.5;

mp.events.add('render', () => {
    if (camaraOn) {
        mp.game.controls.disableAllControlActions(2)
        

        let x = (mp.game.controls.getDisabledControlNormal(0, 220)* mouseSensitivity)
        let y = (mp.game.controls.getDisabledControlNormal(0, 221)* mouseSensitivity)
        let zoomIn = (mp.game.controls.getDisabledControlNormal(2, 40) * zoomSpeed)
        let zoomOut = (mp.game.controls.getDisabledControlNormal(2, 41) * zoomSpeed)
        let currentRot = cam.getRot(2);

        currentRot = new mp.Vector3(currentRot.x - y, 0, currentRot.z - x);

        cam.setRot(currentRot.x, currentRot.y, currentRot.z, 2);

        //let q = mp.keys.isDown(81);
 
        //if(q) mp.console.logInfo("Rot: " + JSON.stringify(cam.getRot(2)))

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