
export default (three) => {
    const basic = () => {
        const scene = new three.Scene();
        scene.background = new three.Color("#FFF");
        return scene;
    }

    const grid = () => {
        const scene = new three.Scene();
        scene.background = new three.Color("#F0F0F0");
                
        // grid
        var gridHelper = new three.GridHelper( 1000, 20 );
        scene.add( gridHelper );

        return scene;
    }

    return {
        basic,
        grid
    }
}