const players = [
    {name:"Testing1", title:"Arch Ace", score:1200, region:"EU", tiers:["HT1","LT1"]},
    {name:"Testing2", title:"Arch Specialist", score:1150, region:"EU", tiers:["HT2","LT2"]},
    {name:"Testing3", title:"Arch Pro", score:1100, region:"EU", tiers:["HT1","LT1"]},
    {name:"Testing4", title:"Arch Novice", score:1000, region:"EU", tiers:["HT3","LT2"]},
    {name:"Testing5", title:"Arch Veteran", score:950, region:"EU", tiers:["HT2","LT1"]},
    {name:"Testing6", title:"Arch Master", score:900, region:"EU", tiers:["HT1","LT3"]}
];

const leaderboard = document.getElementById("leaderboard");

players.forEach((player, index) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
        <div class="rank">${index+1}</div>
        <div class="avatar">🧱</div>
        <div class="player-info">
            <div class="player-name">${player.name}</div>
            <div class="player-title">${player.title}</div>
        </div>
        <div class="score">${player.score}</div>
        <div class="region">${player.region}</div>
        <div class="tiers">
            ${player.tiers.map(t => `<div class="tier">${t}</div>`).join('')}
        </div>
    `;
    leaderboard.appendChild(row);
});
