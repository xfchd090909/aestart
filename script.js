function renderNav() {
    const container = document.getElementById('app');
    container.innerHTML = ''; // 清空容器

    navData.forEach(area => {
        // 1. 创建并添加分隔线
        const divider = document.createElement('div');
        divider.className = 'area-divider';
        divider.innerHTML = `<h2>${area.areaName}</h2>`;
        container.appendChild(divider);

        // 2. 创建该专区下的所有卡片
        area.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            
            const titleHTML = `
                <div class="category-title">
                    <i class="${category.icon}"></i>
                    <span>${category.title}</span>
                </div>
            `;
            
            let linksHTML = '<div class="link-list">';
            category.links.forEach(link => {
                linksHTML += `
                    <a href="${link.url}" target="_blank" class="link-item" title="${link.desc}">
                        ${link.name}
                    </a>
                `;
            });
            linksHTML += '</div>';
            
            card.innerHTML = titleHTML + linksHTML;
            container.appendChild(card);
        });
    });
}
