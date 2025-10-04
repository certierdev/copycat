// Placeholder player data
const players = [];
for (let i = 1; i <= 10; i++) {
    players.push({
        name: `Testing${i}`,
        rank: i,
        combat: "COMBAT MASTER",
        region: i % 2 === 0 ? "NA" : "EU",
        points: Math.floor(Math.random() * 100000),
        tiers: ["HT1", "HT1", "HT1"],
        achievements: ["S", "C", "U"]
    });
}

// Function to generate card HTML
function generateCard(player) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="rank-badge">${player.rank}</div>
        <div class="player-info">
            <div class="name">${player.name}</div>
            <div class="combat-badge">${player.combat}</div>
            <div class="region-badge region-${player.region}">${player.region}</div>
            <div class="achievements">
                ${player.achievements.map(a => `<div class="achievement-icon">${a}</div>`).join('')}
            </div>
            <div class="tiers">
                ${player.tiers.map(t => `<div class="tier ${t}">${t}</div>`).join('')}
            </div>
        </div>
        <div class="points">${player.points}</div>
    `;
    return card;
}

// Populate cards
const container = document.getElementById("leaderboard-cards");
players.forEach(player => {
    container.appendChild(generateCard(player));
});
