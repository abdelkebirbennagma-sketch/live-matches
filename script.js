function handleDownload() {
    const urlInput = document.getElementById("video-url").value.trim();
    const resultArea = document.getElementById("result-area");

    if (!urlInput) {
        alert("Please paste a valid video link first!");
        return;
    }

    // التحقق البسيط من الرابط وإظهار خيارات التحميل للمستخدم
    resultArea.style.display = "block";
    resultArea.innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #334155; text-align: left;">
            <p style="color: #38bdf8; margin-bottom: 10px; font-weight: bold;">✅ Video Processed Successfully!</p>
            <p style="color: #94a3b8; font-size: 14px; margin-bottom: 15px; word-break: break-all;">Link: ${urlInput}</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="${urlInput}" target="_blank" style="flex: 1; background: #22c55e; color: white; padding: 10px; text-align: center; border-radius: 6px; text-decoration: none; font-weight: bold;">Download HD MP4</a>
                <a href="https://en.savefrom.net/" target="_blank" style="flex: 1; background: #eab308; color: #0f172a; padding: 10px; text-align: center; border-radius: 6px; text-decoration: none; font-weight: bold;">Alternative Server ⚡</a>
            </div>
        </div>
    `;
}
