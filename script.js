console.log("Hi");

// 브라우저 감지
function detectBrowser() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("Safari") > -1) {
        // Chrome (Safari도 포함하므로 추가 체크 필요)
        if (userAgent.indexOf("Chrome") > -1) {
            return "chrome";
        }
    } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
        // Safari
        return "safari";
    } else if (userAgent.indexOf("Firefox") > -1) {
        // Firefox
        return "firefox";
    }
    
    // 기본값
    return "safari";
}

// 브라우저에 따라 이미지 표시
const browser = detectBrowser();
console.log("Detected browser:", browser);

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