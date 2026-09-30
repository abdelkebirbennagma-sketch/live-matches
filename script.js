document.addEventListener("DOMContentLoaded", function() {
    const matchesContainer = document.getElementById("matches-container");
    const playerSection = document.getElementById("player-section");
    const matchTitleDisplay = document.getElementById("match-title-display");
    const liveIframe = document.getElementById("live-iframe");

    // بيانات تجريبية حية ومطورة (مستقبلاً سنربطها ببرمجة السحب التلقائي)
    const matchesData = [
        {
            id: 1,
            tournament: "الدوري الإنجليزي الممتاز",
            teamA: "ليفربول",
            teamB: "مانشستر سيتي",
            time: "مباشر الآن",
            streamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk" // رابط بث تجريبي حي كمثال
        },
        {
            id: 2,
            tournament: "دوري أبطال أوروبا",
            teamC: "ريال مدريد",
            teamD: "بايرن ميونخ",
            time: "21:00 بتوقيت غرينتش",
            streamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk"
        }
    ];

    // رسم المباريات في الواجهة
    let htmlContent = "";
    matchesData.forEach(match => {
        htmlContent += `
            <div class="match-card">
                <div class="match-header">
                    <span>${match.tournament}</span>
                    <span class="live-badge">${match.time}</span>
                </div>
                <div class="teams-section">
                    <div class="team">${match.teamA}</div>
                    <div class="vs">VS</div>
                    <div class="team">${match.teamB}</div>
                </div>
                <button class="watch-btn" onclick="openStream('${match.streamUrl}', '${match.teamA} ضد ${match.teamB}')">
                    مشاهدة البث المباشر 📺
                </button>
            </div>
        `;
    });

    matchesContainer.innerHTML = htmlContent;
});

// دالة فتح البث عند النقر
function openStream(url, matchName) {
    const matchesContainer = document.getElementById("matches-container");
    const playerSection = document.getElementById("player-section");
    const matchTitleDisplay = document.getElementById("match-title-display");
    const liveIframe = document.getElementById("live-iframe");

    matchesContainer.style.display = "none";
    playerSection.style.display = "block";
    matchTitleDisplay.innerText = matchName;
    liveIframe.src = url;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// دالة العودة للقائمة
function goBackToMatches() {
    const matchesContainer = document.getElementById("matches-container");
    const playerSection = document.getElementById("player-section");
    const liveIframe = document.getElementById("live-iframe");

    liveIframe.src = ""; // إيقاف الفيديو عند الخروج
    playerSection.style.display = "none";
    matchesContainer.style.display = "block";
}
