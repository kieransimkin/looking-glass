import { BufferAttribute, 
            BufferGeometry, 
            MathUtils, 
            Matrix3, 
            Mesh,
            DataTexture, 
            RepeatWrapping, 
            ShaderMaterial, 
            TextureLoader, 
            Uniform, 
            Vector2, 
            Vector3 } from "three";

import { Random } from "../utils/Random.js";

export const skybox = new Mesh();
export const dirToLight = new Vector3();
export const rotationMatrix = new Uniform(new Matrix3());

export const material = new ShaderMaterial();
export let SetSkyboxUniforms;

const ditherSize = new Uniform(new Vector2());
const dither = new Uniform();
const sunVisibility = new Uniform(1);
const twilightTime = new Uniform(0);
const twilightVisibility = new Uniform(0);

const starsSeed = 87;
const gridSize = 64;
const starsCount = 10000;
const maxOffset = 0.43;
const starsMap = new Uint8Array(gridSize * gridSize * 24);
const stars = new Uniform();

const specularVisibility = new Uniform(Math.sqrt(sunVisibility.value));
const light = new Uniform(new Vector3(1, 1, 1));

const up = new Vector3(0, 1, 0);

let intensity = 0;
let l = 0;

function Vector3ToStarMap(dir, value)
{
    const absDir = new Vector3(Math.abs(dir.x), Math.abs(dir.y), Math.abs(dir.z));

    const xPositive = dir.x > 0;
    const yPositive = dir.y > 0;
    const zPositive = dir.z > 0;

    let maxAxis = 0;
    let u = 0;
    let v = 0;
    let i = 0;

    if (xPositive && absDir.x >= absDir.y && absDir.x >= absDir.z)
    {
        maxAxis = absDir.x;
        u = -dir.z;
        v = dir.y;
        i = 0;
    }

    if (!xPositive && absDir.x >= absDir.y && absDir.x >= absDir.z)
    {
        maxAxis = absDir.x;
        u = dir.z;
        v = dir.y;
        i = 1;
    }

    if (yPositive && absDir.y >= absDir.x && absDir.y >= absDir.z)
    {
        maxAxis = absDir.y;
        u = dir.x;
        v = -dir.z;
        i = 2;
    }

    if (!yPositive && absDir.y >= absDir.x && absDir.y >= absDir.z)
    {
        maxAxis = absDir.y;
        u = dir.x;
        v = dir.z;
        i = 3;
    }

    if (zPositive && absDir.z >= absDir.x && absDir.z >= absDir.y)
    {
        maxAxis = absDir.z;
        u = dir.x;
        v = dir.y;
        i = 4;
    }

    if (!zPositive && absDir.z >= absDir.x && absDir.z >= absDir.y)
    {
        maxAxis = absDir.z;
        u = -dir.x;
        v = dir.y;
        i = 5;
    }

    u = Math.floor((u / maxAxis + 1) * 0.5 * gridSize);
    v = Math.floor((v / maxAxis + 1) * 0.5 * gridSize);

    const j = (v * gridSize * 6 + i * gridSize + u) * 4;
    starsMap[j] = value[0];
    starsMap[j + 1] = value[1];
    starsMap[j + 2] = value[2];
    starsMap[j + 3] = value[3];
}


const halfSize = 2000;
const speed = 0.05;
const initial = new Vector3(0, 1, 0);
const axis = new Vector3(0, 0, 1).applyAxisAngle(new Vector3(0, 1, 0), MathUtils.degToRad(-30));
let angle = -1;

function setSkyRotationMatrix(angle)
{
    const cos = Math.cos(angle);
    const cos1 = 1 - cos;
    const sin = Math.sin(angle);
    const u = axis;
    const u2 = axis.clone().multiply(axis);
    rotationMatrix.value.set
    (
        cos + u2.x * cos1,              u.x * u.y * cos1 - u.z * sin,   u.x * u.z * cos1 + u.y * sin,
        u.y * u.x * cos1 + u.z * sin,   cos + u2.y * cos1,              u.y * u.z * cos1 - u.x * sin,
        u.z * u.x * cos1 - u.y * sin,   u.z * u.y * cos1 + u.x * sin,   cos + u2.z * cos1
    );
}

export function Start()
{
    dirToLight.copy(initial);

//
    dither.value = new TextureLoader().load("images/bluenoise.png", function(texture)
    {
        ditherSize.value.x = texture.image.width;
        ditherSize.value.y = texture.image.height;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
    });

    const random = new Random(starsSeed);

    for (let i = 0; i < starsCount; i++)
    {
        const a = random.Next() * Math.PI * 2;
        const b = random.Next() * 2 - 1;
        const c = Math.sqrt(1 - b * b);
        const target = new Vector3(Math.cos(a) * c, Math.sin(a) * c, b);
        Vector3ToStarMap(target, [MathUtils.lerp(0.5 - maxOffset, 0.5 + maxOffset, random.Next()) * 255, MathUtils.lerp(0.5 - maxOffset, 0.5 + maxOffset, random.Next()) * 255, Math.pow(random.Next(), 6) * 255, random.Next() * 255]);
    }

    stars.value = new DataTexture(starsMap, gridSize * 6, gridSize);
    stars.value.needsUpdate = true;

    material.vertexShader = vertex;
    material.fragmentShader = fragment;

    intensity = dirToLight.dot(up);
    sunVisibility.value = MathUtils.clamp((intensity + 0.1) * 2, 0, 1);
    twilightTime.value = MathUtils.clamp((intensity + 0.1) * 3, 0, 1);
    twilightVisibility.value = 1 - Math.min(Math.abs(intensity * 3), 1);

    SetSkyboxUniforms = function(material)
    {
        material.uniforms._SkyRotationMatrix = rotationMatrix;
        material.uniforms._DitherTexture = dither;
        material.uniforms._DitherTextureSize = ditherSize;
        material.uniforms._SunVisibility = sunVisibility;
        material.uniforms._TwilightTime = twilightTime;
        material.uniforms._TwilightVisibility = twilightVisibility;
        material.uniforms._GridSize = new Uniform(gridSize);
        material.uniforms._GridSizeScaled = new Uniform(gridSize * 6);
        material.uniforms._Stars = stars;
        material.uniforms._SpecularVisibility = specularVisibility;
        material.uniforms._DirToLight = new Uniform(dirToLight);
        material.uniforms._Light = light;
    }
    SetSkyboxUniforms(material);
//

    const vertices = new Float32Array
    ([
        -halfSize, -halfSize, -halfSize,
        halfSize, -halfSize, -halfSize,
        -halfSize, -halfSize, halfSize,
        halfSize, -halfSize, halfSize,

        -halfSize, halfSize, -halfSize,
        halfSize, halfSize, -halfSize,
        -halfSize, halfSize, halfSize,
        halfSize, halfSize, halfSize
    ]);

    const indices = 
    [
        2, 3, 0, 3, 1, 0,
        0, 1, 4, 1, 5, 4,
        1, 3, 5, 3, 7, 5,
        3, 2, 7, 2, 6, 7,
        2, 0, 6, 0, 4, 6,
        4, 5, 6, 5, 7, 6
    ];

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry.setAttribute("coord", new BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    skybox.geometry = geometry;
    skybox.material = skyboxMaterial.material;

    setSkyRotationMatrix(angle);
    initial.applyMatrix3(rotationMatrix.value);
    dirToLight.set(-initial.x, initial.y, -initial.z);
    initial.set(0, 1, 0);
}

export function Update()
{   
    angle += deltaTime * speed;
    setSkyRotationMatrix(angle);
    initial.applyMatrix3(rotationMatrix.value);
    dirToLight.set(-initial.x, initial.y, -initial.z);
    initial.set(0, 1, 0);
    skyboxMaterial.Update();

//
    intensity = dirToLight.dot(up);
    sunVisibility.value = MathUtils.clamp((intensity + 0.1) * 2, 0, 1);
    twilightTime.value = MathUtils.clamp((intensity + 0.1) * 3, 0, 1);
    twilightVisibility.value = 1 - Math.min(Math.abs(intensity * 3), 1);
    specularVisibility.value = Math.sqrt(sunVisibility.value);
    l = Math.min(sunVisibility.value + 0.333, 1);
    light.value.set(l, l, l);
//

    skybox.position.copy(camera.position);
}

export const vertex =
/*glsl*/`
    uniform mat3 _SkyRotationMatrix;

    attribute vec3 coord;

    varying vec3 _worldPos;
    varying vec3 _coord;

    void main()
    {
        _worldPos = coord;
        _coord = _SkyRotationMatrix * _worldPos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fragment =
/*glsl*/`
    #include <skybox>

    varying vec3 _worldPos;
    varying vec3 _coord;

    void main() 
    {
        vec3 worldDir = normalize(_worldPos);
        vec3 viewDir = normalize(_coord);

        float dither = (texture2D(_DitherTexture, (gl_FragCoord.xy - vec2(0.5)) / _DitherTextureSize).x - 0.5) * DITHER_STRENGTH;
        float density = clamp(pow2(1.0 - max(0.0, dot(worldDir, UP) + dither)), 0.0, 1.0);

        float sunLight = dot(viewDir, UP);
        float sun = min(pow(max(0.0, sunLight), SUN_SHARPNESS) * SUN_SIZE, 1.0);

        float moonLight = -sunLight;
        float moon = min(pow(max(0.0, moonLight), MOON_SHARPNESS) * MOON_SIZE, 1.0);

        vec3 day = mix(DAY_SKY_COLOR, DAY_HORIZON_COLOR, density);
        vec3 twilight = mix(LATE_TWILIGHT_COLOR, EARLY_TWILIGHT_COLOR, _TwilightTime);
        vec3 night = mix(NIGHT_SKY_COLOR, NIGHT_HORIZON_COLOR, density);

        vec3 sky = mix(night, day, _SunVisibility);
        sky = mix(sky, twilight, density * clamp(sunLight * 0.5 + 0.5 + dither, 0.0, 1.0) * _TwilightVisibility);

        vec2 cubeCoords = sampleCubeCoords(viewDir);
        vec4 gridValue = texture2D(_Stars, cubeCoords);

        vec2 gridCoords = vec2(cubeCoords.x * _GridSizeScaled, cubeCoords.y * _GridSize);
        vec2 gridCenterCoords = floor(gridCoords) + gridValue.xy;
        float stars = max(min(pow(1.0 - min(distance(gridCoords, gridCenterCoords), 1.0), STARS_SHARPNESS) * gridValue.z * STARS_SIZE, 1.0), moon);
        stars *= min(exp(-dot(sky, vec3(1.0)) * STARS_FALLOFF) * STARS_VISIBILITY, 1.0);

        sky = mix(sky, max(STARS_COLORS[int(gridValue.w * 6.0)], vec3(moon)), stars);
        sky = mix(sky, vec3(1.0), sun);

        gl_FragColor = vec4(sky, 1.0);
    }
`;