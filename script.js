async function getListItems() {
  const data = await fetch("https://kitek.ktkv.dev/marketplace/api/items");
  const json = await data.json();
  return json;
}

async function updateData() {
  let items = await getListItems();

  const container = document.querySelector(".items-grid");
  const stats = document.querySelector(".stats");

  const totalItems = items.length;
  const totalBids = items.reduce((sum, item) => sum + item.bidCount, 0);
  const activeItems = items.filter((item) => item.status === "active").length;
  const averagePrice = items.reduce((sum, item) => sum + item.price, 0) / totalItems || 0;

  stats.innerHTML = `
    <div class="stat-item">
      <span class="stat-value">${totalItems}</span>
      <span class="stat-label">Товаров</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">${totalBids}</span>
      <span class="stat-label">Ставок</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">${activeItems}</span>
      <span class="stat-label">Активных</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">${averagePrice.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₽</span>
      <span class="stat-label">Средняя цена</span>
    </div>
  `;

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
        <div class="item-card">
            <img
                src="${item.imageUrl}"
                alt="${item.title}"
                class="item-image" />
            <div class="item-content">
                <span class="status-badge status-active">Активно</span>
                <h3 class="item-title">"${item.title}"</h3>
                <p class="item-description">
                    ${item.description}
                </p>
                <div class="item-footer">
                    <div>
                        <div class="item-price">${(item.highestBid || 0).toLocaleString('ru-RU')} ₽</div>
                        <div class="bid-info">
                            Текущая ставка: ${(item.highestBid || 0).toLocaleString('ru-RU')} ₽
                            <span class="bid-count">${item.bidCount}</span>
                        </div>
                    </div>
                    <div class="item-meta">
                        <span class="item-seller">
                            Продавец: ${item.username}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    container.appendChild(div);
  });
}

updateData();
