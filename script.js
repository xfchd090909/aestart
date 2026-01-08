// 渲染主函数
function renderNav() {
    const container = document.getElementById('app');
    
    navData.forEach(area => {
        // 生成专区分隔线
        const divider = document.createElement('div');
        divider.className = 'area-divider';
        divider.innerHTML = `<h2>${area.areaName}</h2>`;
        container.appendChild(divider);

        // 生成专区下的卡片
        area.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            
            let linksHTML = category.links.map(link => `
                <a href="${link.url}" target="_blank" class="link-item">${link.name}</a>
            `).join('');

            card.innerHTML = `
                <div class="category-title">
                    <i class="${category.icon}"></i>
                    <span>${category.title}</span>
                </div>
                <div class="link-list">${linksHTML}</div>
            `;
            container.appendChild(card);
        });
    });
}

// 搜索逻辑
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        if (query) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

// 时钟逻辑
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
}

// 初始化执行
renderNav();
setInterval(updateClock, 1000);
updateClock();
