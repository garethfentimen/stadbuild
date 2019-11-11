    
export default (three, { width, height }) => {
    return {
        basic: () => {
            const aspectRatio = width / height;
            const fieldOfView = 60;
            const nearPlane = 4;
            const farPlane = 100; 
            const camera = new three.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

            camera.position.z = 40;

            return camera;
        },
        grid: () => {
            const aspectRatio = width / height;
            const fieldOfView = 38;
            const nearPlane = 1;
            const farPlane = 10000; 
            const aCamera = new three.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

            aCamera.position.set( 500, 650, 1300 );
            aCamera.lookAt( 0, 0, 0 );

            console.log('built camera');
            return aCamera;
        }
    };
}