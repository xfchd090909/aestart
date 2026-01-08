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
    <div class="modal-content" id="modal-content">
        <div class="modal-title">境外网络免责声明</div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: #eee; margin-bottom: 10px;"><strong>法律合规告知书</strong></p>
            <p>1. 本站作为静态导航页面，仅提供互联网公开链接的索引。所有链接均指向第三方平台。</p>
            <p>2. <strong>合规访问：</strong> 用户在访问境外网站时，须遵守《中国计算机信息网络国际联网管理暂行规定》等相关法律，不得从事危害国家安全、泄露国家秘密等活动。</p>
            <p>3. <strong>自备环境：</strong> 本站不提供、不分发、不推介任何翻墙软件或代理技术。用户需自行确保访问行为的合法性与合规性。</p>
            <p>4. <strong>风险自担：</strong> 点击“我已阅读并同意”即表示您已阅读并理解上述内容，因个人访问行为产生的一切法律后果由用户自行承担。</p>
        </div>
        <button id="modal-confirm-btn" class="modal-btn" disabled>请阅读声明 (5s)</button>
    </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// 2. 修改渲染逻辑，传递点击事件对象 e
function renderNav() {
    const container = document.getElementById('app');
    container.innerHTML = ''; // 清空防止重复渲染

    navData.forEach(area => {
        const divider = document.createElement('div');
        divider.className = 'area-divider';
        divider.innerHTML = `<h2>${area.areaName}</h2>`;
        container.appendChild(divider);

        area.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            
            // 按钮增加描述文字层
            let linksHTML = category.links.map(link => `
                <a href="${link.url}" target="_blank" class="link-item">
                    <span class="link-name">${link.name}</span>
                    <span class="link-desc">${link.desc || '点击访问网站'}</span>
                </a>
            `).join('');

            card.innerHTML = `
                <div class="category-title">
                    <i class="${category.icon}"></i>
                    <span>${category.title}</span>
                </div>
                <div class="link-list-container" style="position:relative;">
                    <div class="link-list">${linksHTML}</div>
                    ${category.title === "境外专区" ? 
                    `<div id="mosaic" class="mosaic-overlay">
                        <button class="link-item show-btn" onclick="showDisclaimerWithAnimation(event)" style="cursor:pointer; background:var(--accent); color:white; border:none; z-index:11;">
                            <span>显示内容</span>
                            <span class="link-desc">查看境外专区链接</span>
                        </button>
                    </div>` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// 2. 改进弹窗动画逻辑：强制坐标精确计算
function showDisclaimerWithAnimation(e) {
    const modal = document.getElementById('disclaimer-modal');
    const content = document.getElementById('modal-content');
    const btn = document.getElementById('modal-confirm-btn');

    // 获取点击按钮的确切中心位置
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // 设置动画起始原点
    content.style.transformOrigin = `${originX}px ${originY}px`;

    // 触发显示
    modal.style.display = 'flex';
    // 使用 requestAnimationFrame 确保 display:flex 已生效后再添加类名，触发动画
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });

    let timeLeft = 5;
    btn.disabled = true;
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
        modal.classList.remove('show');
        setTimeout(() => { 
            modal.style.display = 'none';
            // 移除遮罩
            const mosaic = document.getElementById('mosaic');
            if (mosaic) {
                mosaic.style.transform = 'scale(1.2)';
                mosaic.style.opacity = '0';
                setTimeout(() => mosaic.remove(), 400);
            }
        }, 400); 
    };
}
