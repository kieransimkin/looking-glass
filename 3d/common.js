
import { ShaderChunk, Vector3 } from "three";
import { Clock, Uniform } from "three";
import {skyboxShader} from "./skybox";
import {oceanShader} from "./ocean";
const global = 
/*glsl*/`
    const float FOG_DISTANCE = 1000.0;
`;


export function Start()
{
    ShaderChunk.global = global;
    ShaderChunk.skybox = skyboxShader;
    ShaderChunk.ocean = oceanShader;
}
export const cameraRight = new Vector3();
export const cameraUp = new Vector3();
export const cameraForward = new Vector3();

export function UpdateCameraRotation()
{
    cameraRight.copy(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion));
    cameraUp.copy(new Vector3(0, 1, 0).applyQuaternion(camera.quaternion));
    cameraForward.copy(new Vector3(0, 0, -1).applyQuaternion(camera.quaternion));
}


export let time = 0;
export let deltaTime = 0;
export const timeUniform = new Uniform(time);

const clock = new Clock();

export function StartTime()
{
    clock.start();
    time = clock.elapsedTime;
    timeUniform.value = time;
}

export function UpdateTime()
{
    time = clock.elapsedTime;
    deltaTime = clock.getDelta();
    timeUniform.value = time;
}