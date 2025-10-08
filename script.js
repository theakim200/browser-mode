console.log("Hi");

// 브라우저 감지
function detectBrowser() {
    const userAgent = navigator.userAgent;
    
    // 디버깅: userAgent 전체 출력
    console.log("Full userAgent:", userAgent);
    console.log("Contains Firefox?", userAgent.indexOf("Firefox") > -1);
    console.log("Contains Chrome?", userAgent.indexOf("Chrome") > -1);
    console.log("Contains Safari?", userAgent.indexOf("Safari") > -1);
    
    // Firefox 먼저 체크
    if (userAgent.indexOf("Firefox") > -1) {
        console.log("Detected: Firefox");
        return "firefox";
    }
    // Chrome 체크 (Edge 제외)
    else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1) {
        console.log("Detected: Chrome");
        return "chrome";
    }
    // Safari 체크 (Chrome이 없을 때만)
    else if (userAgent.indexOf("Safari") > -1) {
        console.log("Detected: Safari");
        return "safari";
    }
    
    // 기본값
    console.log("Detected: Safari (default)");
    return "safari";
}

const browser = detectBrowser();
console.log("Final browser:", browser);

// body에 브라우저 클래스 추가
document.body.classList.add(browser);

// 해당 브라우저의 이미지만 표시
if (browser === "chrome") {
    document.querySelectorAll(".aa").forEach(img => img.classList.remove("hide"));
} else if (browser === "safari") {
    document.querySelectorAll(".bb").forEach(img => img.classList.remove("hide"));
} else if (browser === "firefox") {
    document.querySelectorAll(".cc").forEach(img => img.classList.remove("hide"));
}

// 브라우저에 따라 배너 텍스트 변경
const bannerText = document.querySelector(".banner p");

if (browser === "chrome") {
    bannerText.textContent = "You are in Chrome.";
} else if (browser === "safari") {
    bannerText.textContent = "You are in Safari.";
} else if (browser === "firefox") {
    bannerText.textContent = "You are in Firefox.";
}