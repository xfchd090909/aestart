// 1. 渲染页面内容
function renderNav() {
    const container = document.getElementById('app');
    
    navData.forEach(category => {
        // 创建分类卡片
        const card = document.createElement('div');
        card.className = 'category-card';
        
        // 创建标题
        const titleHTML = `
            <div class="category-title">
                <i class="${category.icon}"></i>
                <span>${category.title}</span>
            </div>
        `;
        
        // 创建链接容器
        let linksHTML = '<div class="link-list">';
        category.links.forEach(link => {
            linksHTML += `
                <a href="${link.url}" target="_blank" class="link-item" title="${link.desc}">
                    ${link.name}
                </a>
            `;
        });
        linksHTML += '</div>';
        
        // 组装
        card.innerHTML = titleHTML + linksHTML;
        container.appendChild(card);
    });
}

// 2. 搜索功能
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        if (query) {
            // 默认跳转 Google，可以改成 Baidu 或 Bing
            window.location.href = `https://www.google.com/search?q=${query}`;
        }
    }
});

// 3. 实时时钟
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

// 初始化
renderNav();
setInterval(updateClock, 1000);
updateClock();
