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

const modalHTML = `
<div id="disclaimer-modal" class="modal-mask">
    <div class="modal-content">
        <div class="modal-title">境外网络免责声明</div>
        <div class="modal-body">
            <p><strong>尊敬的用户：</strong></p>
            <p>1. 本站仅作为网页收藏工具，所列境外网站链接均来自互联网公开信息。</p>
            <p>2. 用户在访问境外网站时，必须严格遵守所在地法律法规。严禁访问、传播任何违法违规、危害国家安全或淫秽色情之内容。</p>
            <p>3. 访问境外网络所需的网络环境由用户自行负责，本站不提供任何科学上网工具或技术支持。</p>
            <p>4. 凡因用户个人行为导致的法律纠纷，本站概不承担任何直接或间接责任。</p>
            <p>点击“确定”即代表您已成年并同意承担相关访问风险。</p>
        </div>
        <button id="modal-confirm-btn" class="modal-btn" disabled>请阅读声明 (5s)</button>
    </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

function renderNav() {
    const container = document.getElementById('app');
    
    navData.forEach(area => {
        const divider = document.createElement('div');
        divider.className = 'area-divider';
        divider.innerHTML = `<h2>${area.areaName}</h2>`;
        container.appendChild(divider);

        area.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            // 给境外专区添加特殊 ID 或 Class
            if (category.title === "境外专区") card.id = "overseas-section";
            
            let linksHTML = category.links.map(link => `
                <a href="${link.url}" target="_blank" class="link-item">${link.name}</a>
            `).join('');

            card.innerHTML = `
                <div class="category-title">
                    <i class="${category.icon}"></i>
                    <span>${category.title}</span>
                </div>
                <div class="link-list-container" style="position:relative;">
                    <div class="link-list">${linksHTML}</div>
                    ${category.title === "境外专区" ? '<div id="mosaic" class="mosaic-overlay"><button class="link-item" onclick="showDisclaimer()" style="cursor:pointer; background:var(--accent); color:white;">显示内容</button></div>' : ''}
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// 弹窗逻辑
function showDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    const btn = document.getElementById('modal-confirm-btn');
    modal.style.display = 'flex';

    let timeLeft = 5;
    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            btn.textContent = `请阅读声明 (${timeLeft}s)`;
        } else {
            clearInterval(timer);
            btn.disabled = false;
            btn.textContent = "我已阅读并同意";
        }
    }, 1000);

    btn.onclick = () => {
        modal.style.display = 'none';
        // 移除马赛克
        const mosaic = document.getElementById('mosaic');
        if (mosaic) mosaic.remove();
    };
}

// 搜索和时钟保持不变...
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        if (query) window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    }
});

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
}

renderNav();
setInterval(updateClock, 1000);
updateClock();
