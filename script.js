document.addEventListener("DOMContentLoaded", function() {
    const matchesList = document.getElementById("matches-list");
    
    // كمثال حي: قريباً سنربطه بمصادر حية، حالياً سنعرض نموذج تجريبي ديناميكي
    setTimeout(() => {
        matchesList.innerHTML = `
            <div class="match-card" style="background: #1e1e1e; border-radius: 8px; padding: 15px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div class="match-info" style="text-align: right;">
                    <p style="margin: 0; color: #00ffcc; font-size: 14px;">الدوري الإنجليزي الممتاز</p>
                    <p style="margin: 5px 0; font-size: 16px;">ليفربول ضد مانشستر سيتي</p>
                </div>
                <a href="#" class="watch-btn" style="background: #e50914; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">شاهد البث</a>
            </div>
        `;
    }, 1000);
});
