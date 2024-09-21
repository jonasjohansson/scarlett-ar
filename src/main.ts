import { bootstrapCameraKit } from "@snap/camera-kit";

const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI2NzM2NzEzLCJzdWIiOiJkYzgwNjhlYy1lNjhlLTQ4ZWEtYTE5Mi03YjQ5ZWIwZWFjNjF-U1RBR0lOR34zMWEzZDk3Yi01OTMwLTQ4ODYtOGZkZC01Mjk1N2EwYWM2YmIifQ.0R8xvAtKcxVAq8MTLPQLWKwNW5KNdhV8K4szc5uOs5s";
const LENS_ID = "ff54cb15-d1b0-4efc-a805-6bc31bc0f47b";
const GROUP_ID = "b6c02c11-e87c-4766-8a9d-d198afba169d";

(async function () {
    const cameraKit = await bootstrapCameraKit({
        apiToken: API_TOKEN,
    });
    const liveRenderTarget = document.getElementById(
        "canvas"
    ) as HTMLCanvasElement;
    const session = await cameraKit.createSession({ liveRenderTarget });
    const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
    });

    await session.setSource(mediaStream);
    await session.play();

    const lens = await cameraKit.lensRepository.loadLens(LENS_ID, GROUP_ID);

    await session.applyLens(lens);
})();
