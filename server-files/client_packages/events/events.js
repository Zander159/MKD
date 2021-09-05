mp.events.add('camaraOn', Boolean)
{
    let casinoCamera = mp.cameras.new(new mp.Vector3(973.2733154296875, 86.45478820800781, 85.40351104736328), 40);

    casinoCamera.pointAtCoord(982.81103515625, 85.66415405273438, 80.99064636230469)

    casinoCamera.setActive(true)

    mp.game.casinoCamera.renderScriptCams(true);
}
