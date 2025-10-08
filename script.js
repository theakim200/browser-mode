console.log("Device Orientation Script Loaded");

// 이전 값을 저장할 변수들
let previousBeta = 0;
let previousGamma = 0;
let isListenerAdded = false; // 중복 방지

// 페이지 로드 시 권한 요청
document.addEventListener("DOMContentLoaded", requestMotionPermission);

function handleOrientation(event) {
    let beta = event.beta; // 앞뒤 기울기 (-90 ~ 90)
    let gamma = event.gamma; // 좌우 기울기 (-90 ~ 90)

    // 🔹 Smoothing: 이전 값과 새 값을 섞어서 부드럽게 만들기
    const smoothingFactor = 0.3; // 0에 가까울수록 부드럽고, 1에 가까울수록 민감함
    beta = previousBeta + (beta - previousBeta) * smoothingFactor;
    gamma = previousGamma + (gamma - previousGamma) * smoothingFactor;

    // 현재 값을 저장
    previousBeta = beta;
    previousGamma = gamma;

    let topLeft = document.querySelector(".top-left");
    let topRight = document.querySelector(".top-right");
    let bottomLeft = document.querySelector(".bottom-left");
    let bottomRight = document.querySelector(".bottom-right");
    let left = document.querySelector(".left");
    let right = document.querySelector(".right");

    // 🔹 `beta` 값 (-90 ~ 90)을 정규화하여 height 변경 (10vh ~ 90vh)
    let normalizedHeight = ((beta + 90) / 180) * 80 + 10; // 10 ~ 90vh
    topLeft.style.height = `${normalizedHeight}vh`;
    topRight.style.height = `${normalizedHeight}vh`;
    bottomLeft.style.height = `${100 - normalizedHeight}vh`;
    bottomRight.style.height = `${100 - normalizedHeight}vh`;

    // 🔹 `gamma` 값 (-90 ~ 90)을 정규화하여 flex 변경 (0 ~ 10)
    let normalizedFlex = ((gamma + 90) / 180) * 10; // 0 ~ 10
    left.style.flex = `${10 - normalizedFlex}`;
    right.style.flex = `${normalizedFlex}`;
}

// Check for permission on iOS
function requestMotionPermission() {
    // 이미 리스너가 추가되었으면 다시 추가하지 않음
    if (isListenerAdded) return;

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("deviceorientation", handleOrientation);
                    isListenerAdded = true;
                } else {
                    console.warn("DeviceOrientation permission denied");
                }
            })
            .catch(console.error);
    } else {
        // Non-iOS devices
        window.addEventListener("deviceorientation", handleOrientation);
        isListenerAdded = true;
    }
}