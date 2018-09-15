
import {AssetsManager} from "../../public/index"
import {SceneManager} from "../../public/index"
import {WeatherState} from "../../public/index";
import Texture = BABYLON.Texture;
import Color3 = BABYLON.Color3;

export class ExGameScene{

    private static instance: ExGameScene;

    public static get ins(): ExGameScene {
        if (!this.instance) {
            this.instance = new ExGameScene();
        }
        return this.instance;
    }

    public display;

    protected scene;

    constructor(){
       // super()
    }


    public creatScene(){
        this.scene=SceneManager.ins.scene
        //设置背景色
        this.scene.clearColor=new BABYLON.Color4(52/255,156/255,255/255)

        /**
         * 室外相机
         * */
        var  camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 200, 0), this.scene);
        camera.alpha=-Math.PI*1
        camera.beta=1.260483446598473
        camera.attachControl(SceneManager.ins.canvas, false);
        camera.upperRadiusLimit=27
        camera.lowerRadiusLimit=-27
       

     


        /**
         * 室内相机校准模型
         * */
        var cameraBox = BABYLON.MeshBuilder.CreateBox("camera2Box", {height:  2, width: 2, depth: 2}, this.scene);
        cameraBox.isVisible=false;
        cameraBox.rotation=new BABYLON.Vector3(0,0,0)


        var steering = BABYLON.MeshBuilder.CreateBox("steering", {height:  2000, width: 2000, depth: 2000}, this.scene);
        steering.visibility=0;
        steering.scaling=new BABYLON.Vector3(0.001,0.001,0.001)
        steering.rotation=new BABYLON.Vector3(0,0.3,Math.PI*0.5)


             /**
         * 室内相机
         * */
        var camera2 = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 1.1, 0.6), this.scene);
        camera2.rotation.y=-Math.PI*2
        camera2.position.z=-3;
        camera2.position.y=-0.0;
        camera2.attachControl(SceneManager.ins.canvas);
        camera2.detachControl(SceneManager.ins.canvas);
        this.scene.activeCamera=camera2;
        camera2.minZ=0;
        camera2.parent=cameraBox;


        var camera3 = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(200, -300, 150), this.scene);
        camera3.radius = -20;
        console.log("camera")
        console.log(camera)
        camera3.heightOffset = 1;
        camera3.rotationOffset = 0;
        camera3.cameraAcceleration = 0.09;
        camera3.maxCameraSpeed = 20;
        camera3.fov=1.3
        camera3.detachControl(SceneManager.ins.canvas);

        this.scene.activeCamera=camera3;

       // camera3.target = cameraBox;
        camera3.lockedTarget = cameraBox;


        var pipeline = new BABYLON.DefaultRenderingPipeline(
            "default", // The name of the pipeline
            true, // Do you want HDR textures ?
            this.scene, // The scene instance
            [ camera3] // The list of cameras to be attached to
             );
        
        pipeline.bloomEnabled = true;
        
        pipeline.bloomThreshold = 0.2;
        pipeline.bloomWeight = 0.5;
        pipeline.bloomKernel = 64;
        pipeline.bloomScale = 0.5;



      /*  this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogDensity = 0.001;
        this.scene.fogColor = new BABYLON.Color3(1,1,1);*/


        /**
         * 环境光
         * */
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 10, 0), this.scene);
        light.intensity=0.1
        var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, -10, 0), this.scene);
        light2.intensity=0.1

        /**
         * 平行光
         * */
        var light3 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0.2, -0.3, 0.2), this.scene);
        light3.intensity=0.7
        //  light3.autoUpdateExtends=false;
        light3.shadowFrustumSize=600
        light3.shadowMinZ=-300
        light3.shadowMaxZ=300


        var terrainMaterial = new BABYLON["TerrainMaterial"]("terrainMaterial", this.scene);

    
        terrainMaterial.mixTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["maptr2"].clone()
   

        terrainMaterial.diffuseTexture1 = AssetsManager.ins.resourceObject["textures"]["gameScene"]["grass"].clone()
        terrainMaterial.diffuseTexture1.uScale=20
        terrainMaterial.diffuseTexture1.vScale=20
        terrainMaterial.diffuseTexture2 = AssetsManager.ins.resourceObject["textures"]["gameScene"]["grass"].clone()
        terrainMaterial.diffuseTexture2.uScale=20
        terrainMaterial.diffuseTexture2.vScale=20
        terrainMaterial.diffuseTexture3 = AssetsManager.ins.resourceObject["textures"]["gameScene"]["ground"].clone()
        terrainMaterial.diffuseTexture3.uScale=20
        terrainMaterial.diffuseTexture3.vScale=20
    
        this.display={
            camera:camera,
            camera2:camera2,
            light:light,
            light2:light2,
            light3:light3,
            cameraBox:cameraBox,
            steering:steering,
            terrainMaterial:terrainMaterial,
        }

        console.log(this.display)

      //  GameSceneCon.ins.resetGame(this.display);
    }



}

