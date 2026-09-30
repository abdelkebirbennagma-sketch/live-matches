document.addEventListener("DOMContentLoaded", function() {
    const matchesContainer = document.getElementById("matches-container");
    const playerSection = document.getElementById("player-section");
    const matchTitleDisplay = document.getElementById("match-title-display");
    const liveIframe = document.getElementById("live-iframe");

    // مباريات حية مع روابط سيرفرات البث المباشر المتخصصة
    const matchesData = [
        {
            id: 1,
            tournament: "دوري أبطال أوروبا - القمة الكبرى",
            teamA: "ريال مدريد",
            logoA: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
            teamB: "برشلونة",
            logoB: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
            time: "مباشر الآن 🔴",
            // رابط سيرفر بث مباشر متخصص (مثال لعرض مشغل حقيقي)
            streamUrl: "https://www.youtube.com/embed/live_stream?channel=UCUPVRUSz9Cq17j_oA35Qx3A" 
        },
        {
            id: 2,
            tournament: "الدوري الإنجليزي الممتاز",
            teamA: "مانشستر سيتي",
            logoA: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
            teamB: "ليفربول",
            logoB: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
            time: "مباشر الآن 🔴",
            // رابط بديل لسيرفر بث حي متخصص
            streamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk"
        }
    ];

    let htmlContent = "";
    matchesData.forEach(match => {
        htmlContent += `
            <div class="match-card" style="display: flex; flex-direction: column; gap: 15px; background: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #334155; box-shadow: 0 8px 16px rgba(0,0,0,0.4);">
                <div class="match-header" style="display: flex; justify-content: space-between; align-items: center; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                    <span>🏆 ${match.tournament}</span>
                    <span class="live-badge" style="background: #ef4444; color: white; padding: 3px 10px; border-radius: 20px; font-weight: bold; font-size: 11px;">${match.time}</span>
                </div>
                
                <div class="teams-section" style="display: flex; justify-content: space-around; align-items: center; text-align: center;">
                    <div class="team" style="display: flex; flex-direction: column; align-items: center; width: 35%; gap: 8px;">
                        <img src="${match.logoA}" alt="${match.teamA}" style="width: 50px; height: 50px; object-fit: contain;">
                        <span style="font-size: 16px; font-weight: bold; color: #fff;">${match.teamA}</span>
                    </div>
                    
                    <div class="vs" style="font-size: 14px; color: #94a3b8; background: #0f172a; padding: 10px; border-radius: 50%; border: 1px solid #334155; font-weight: bold;">VS</div>
                    
                    <div class="team" style="display: flex; flex-direction: column; align-items: center; width: 35%; gap: 8px;">
                        <img src="${match.logoB}" alt="${match.teamB}" style="width: 50px; height: 50px; object-fit: contain;">
                        <span style="font-size: 16px; font-weight: bold; color: #fff;">${match.teamB}</span>
                    </div>
                </div>

                <button class="watch-btn" onclick="openStream('${match.streamUrl}', '${match.teamA} ضد ${match.teamB}')" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);">
                    مشاهدة البث من السيرفر المباشر 📺
                </button>
            </div>
        `;
    });

    matchesContainer.innerHTML = htmlContent;
});

function openStream(url, matchName) {
    const matchesContainer = document.getElementById("matches-container");
    const playerSection = document.getElementById("player-section");
    const matchTitleDisplay = document.getElementById("match-title-display");
    const liveIframe = document.getElementById("live-iframe");

    matchesContainer.style.display = "none";
    playerSection.style.display = "block";
    matchTitleDisplay.innerText = "بث مباشر: " + matchName;
    liveIframe.src = url;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBackToMatches() {
    const matchesContainer = document.getElementById("matches-container");
    const playerSection = document.getElementById("player-section");
    const liveIframe = document.getElementById("live-iframe");

    liveIframe.src = ""; 
    playerSection.style.display = "none";
    matchesContainer.style.display = "block";
}
