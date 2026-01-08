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
        if (query) window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
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

document.body.insertAdjacentHTML('beforeend', `
    <div id="popup-mask" class="popup-mask"></div>
    <div id="detail-popup" class="detail-popup">
        <div id="popup-title" class="popup-title"></div>
        <div id="popup-desc" class="popup-desc"></div>
        <a id="popup-link" href="#" target="_blank" class="go-btn">进入网站</a>
    </div>
    <div id="disclaimer-modal" class="modal-mask">
        <div class="modal-content" id="modal-content">
            <h2 style="color:var(--accent); text-align:center;">境外网络免责声明</h2>
            <div style="font-size:0.85rem; color:#b0b0b0; line-height:1.7; margin:20px 0;">
                <p>1. 本站仅提供公开链接索引，不提供任何越障工具。</p>
                <p>2. 用户须自觉遵守当地法律法规，严禁浏览违法违规内容。</p>
                <p>3. 访问行为产生的法律责任由用户个人完全承担。</p>
            </div>
            <button id="modal-confirm-btn" class="modal-btn" style="width:100%; padding:12px; border:none; border-radius:8px; background:var(--accent-grad); color:white; font-weight:bold; cursor:pointer;" disabled>请阅读声明 (5s)</button>
        </div>
    </div>
`);

const mask = document.getElementById('popup-mask');
const popup = document.getElementById('detail-popup');

function renderNav() {
    const container = document.getElementById('app');
    container.innerHTML = '';

    navData.forEach(area => {
        const divider = document.createElement('div');
        divider.className = 'area-divider';
        divider.innerHTML = `<h2>${area.areaName}</h2>`;
        container.appendChild(divider);

        area.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            
            let linksHTML = category.links.map(link => `
                <div class="link-item" onclick="openQuickView(event, '${link.name}', '${link.desc || '点击下方按钮访问该站点详细内容'}', '${link.url}')">
                    ${link.name}
                </div>
            `).join('');

            card.innerHTML = `
                <div class="category-title"><i class="${category.icon}"></i><span>${category.title}</span></div>
                <div class="link-list-container" style="position:relative;">
                    <div class="link-list">${linksHTML}</div>
                    ${category.title === "境外专区" ? 
                    `<div id="mosaic" class="mosaic-overlay">
                        <button class="link-item" onclick="showDisclaimer(event)" style="background:var(--accent); color:white;">显示内容</button>
                    </div>` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// 按钮原点弹出逻辑
function openQuickView(e, name, desc, url) {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    
    // 设置定位和动画原点
    popup.style.left = `${Math.min(window.innerWidth - 300, Math.max(20, originX - 140))}px`;
    popup.style.top = `${originY - 100}px`;
    popup.style.transformOrigin = `center`;

    document.getElementById('popup-title').textContent = name;
    document.getElementById('popup-desc').textContent = desc;
    document.getElementById('popup-link').href = url;

    mask.style.display = 'block';
    setTimeout(() => popup.classList.add('active'), 10);
}

mask.onclick = () => {
    popup.classList.remove('active');
    setTimeout(() => mask.style.display = 'none', 400);
};

// 境外专区逻辑
function showDisclaimer(e) {
    const modal = document.getElementById('disclaimer-modal');
    const content = document.getElementById('modal-content');
    const btn = document.getElementById('modal-confirm-btn');

    const rect = e.currentTarget.getBoundingClientRect();
    content.style.transformOrigin = `${rect.left + rect.width/2}px ${rect.top + rect.height/2}px`;

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    let timeLeft = 5;
    btn.disabled = true;
    const timer = setInterval(() => {
        timeLeft--;
        btn.textContent = timeLeft > 0 ? `请阅读声明 (${timeLeft}s)` : "我已阅读并同意";
        if (timeLeft <= 0) { clearInterval(timer); btn.disabled = false; }
    }, 1000);

    btn.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => { 
            modal.style.display = 'none';
            document.getElementById('mosaic').style.opacity = '0';
            setTimeout(() => document.getElementById('mosaic').remove(), 500);
        }, 400);
    };
}
