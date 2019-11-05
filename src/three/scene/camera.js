    
export default (three, { width, height }) => {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 4;
    const farPlane = 100; 
    const camera = new three.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.z = 40;

    return camera;
}