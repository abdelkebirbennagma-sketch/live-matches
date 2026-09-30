document.addEventListener("DOMContentLoaded", function() {
    const matchesContainer = document.getElementById("matches-container"); // تأكد من اسم اليدي عندك في HTML أو حط الكونتينر المناسب
    
    // مباريات حية مباشرة تظهر فوراً
    const liveMatches = [
        {
            tournament: "دوري أبطال أوروبا - مباشر الآن 🔴",
            teamA: "ريال مدريد",
            logoA: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
            teamB: "مانشستر سيتي",
            logoB: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
            time: "مباشر الآن",
            streamUrl: "https://www.koora-live.ovh/embed/match-1.html"
        },
        {
            tournament: "الدوري الإنجليزي الممتاز - مباشر 🔴",
            teamA: "ليفربول",
            logoA: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
            teamB: "آرسنال",
            logoB: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
            time: "مباشر الآن",
            streamUrl: "https://www.koora-live.ovh/embed/match-2.html"
        }
    ];

    // إذا كان عندك عنصر مخصص للمباريات غايتعرضو فيه، وإلا غنحقوهم في الصفحة
    let htmlContent = "";
    liveMatches.forEach(match => {
        htmlContent += `
            <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #334155; text-align: center; color: white;">
                <span style="color: #ef4444; font-weight: bold; font-size: 14px;">${match.tournament}</span>
                <div style="display: flex; justify-content: space-around; align-items: center; margin: 15px 0;">
                    <div>
                        <img src="${match.logoA}" width="50" height="50" style="display: block; margin: 0 auto 5px;">
                        <span style="font-weight: bold;">${match.teamA}</span>
                    </div>
                    <span style="font-size: 20px; font-weight: bold; color: #94a3b8;">VS</span>
                    <div>
                        <img src="${match.logoB}" width="50" height="50" style="display: block; margin: 0 auto 5px;">
                        <span style="font-weight: bold;">${match.teamB}</span>
                    </div>
                </div>
                <a href="${match.streamUrl}" target="_blank" style="display: inline-block; background: #ef4444; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">مشاهدة البث المباشر 📺</a>
            </div>
        `;
    });

    // البحث عن مكان العرض أو إضافتهم في الصفحة مباشرة
    const container = document.getElementById("matches-list") || document.body;
    if(document.getElementById("matches-list")) {
        document.getElementById("matches-list").innerHTML = htmlContent;
    } else {
        // إذا ما لقاش اليدي، يحطهم في أول الصفحة
        const div = document.createElement("div");
        div.innerHTML = htmlContent;
        document.body.prepend(div);
    }
});
