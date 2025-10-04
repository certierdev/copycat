<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>archtiers.net</title>
    <style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #fff;
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.logo {
    font-size: 20px;
    color: #888;
    font-weight: 500;
}

.search {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    width: 250px;
    outline: none;
    transition: all 0.3s;
}

.search::placeholder {
    color: #666;
}

.search:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
}

.icons-row {
    display: flex;
    justify-content: center;
    gap: 250px;
    margin-bottom: 50px;
}

.icon {
    font-size: 48px;
    opacity: 0.8;
}

.leaderboard {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.player-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 30px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s;
}

.player-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

.player-left {
    display: flex;
    align-items: center;
    gap: 30px;
}

.rank {
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    min-width: 60px;
}

.player-avatar {
    width: 64px;
    height: 64px;
    image-rendering: pixelated;
}

.player-info h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
}

.player-rank {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #aaa;
}

.rank-icon {
    width: 16px;
    height: 16px;
}

.ace {
    color: #ff6b6b;
}

.specialist {
    color: #a78bfa;
}

.cadet {
    color: #60a5fa;
}

.player-right {
    display: flex;
    align-items: center;
    gap: 30px;
}

.region-badge {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;
}

.badges {
    display: flex;
    gap: 15px;
}

.badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.badge-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.badge-icon.lightning {
    background: rgba(234, 179, 8, 0.2);
    border: 2px solid #eab308;
}

.badge-icon.portal {
    background: rgba(168, 85, 247, 0.2);
    border: 2px solid #a855f7;
}

.badge-label {
    font-size: 11px;
    font-weight: 600;
    color: #888;
}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">archtiers.net</div>
            <input type="text" class="search" placeholder="Search player..">
        </header>

        <div class="icons-row">
            <div class="icon">🏆</div>
            <div class="icon">🔱</div>
            <div class="icon">🏹</div>
        </div>

        <div class="leaderboard" id="leaderboard"></div>
    </div>

    <script>
const players = [
    {
        name: 'Testing1',
        rank: 'Arch Ace',
        points: 120,
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAANklEQVQYV2NkYGD4z4AHMDGQCFA0MDL8Z2BgYGRgYPjPyPCfEUUBugJGFAWMyAowFGBRgKwAAOBKCAf/MhqEAAAAAElFTkSuQmCC',
        region: 'EU',
        badges: [{type: 'lightning', label: 'HT1'}, {type: 'portal', label: 'HT1'}]
    },
    {
        name: 'Testing2',
        rank: 'Arch Specialist',
        points: 90,
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAANklEQVQYV2NkYGD4z4AHMDGQCFA0MDL8Z2BgYGRgYPjPyPCfEUUBugJGFAWMyAowFGBRgKwAAOBKCAf/MhqEAAAAAElFTkSuQmCC',
        region: 'EU',
        badges: [{type: 'lightning', label: 'LT1'}, {type: 'portal', label: 'LT1'}]
    },
    {
        name: 'Testing3',
        rank: 'Arch Specialist',
        points: 75,
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAANklEQVQYV2NkYGD4z4AHMDGQCFA0MDL8Z2BgYGRgYPjPyPCfEUUBugJGFAWMyAowFGBRgKwAAOBKCAf/MhqEAAAAAElFTkSuQmCC',
        region: 'EU',
        badges: [{type: 'portal', label: 'LT1'}, {type: 'lightning', label: 'HT2'}]
    },
    {
        name: 'Testing4',
        rank: 'Arch Specialist',
        points: 65,
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAANklEQVQYV2NkYGD4z4AHMDGQCFA0MDL8Z2BgYGRgYPjPyPCfEUUBugJGFAWMyAowFGBRgKwAAOBKCAf/MhqEAAAAAElFTkSuQmCC',
        region: 'EU',
        badges: [{type: 'lightning', label: 'LT1'}, {type: 'portal', label: 'LT2'}]
    },
    {
        name: 'Testing5',
        rank: 'Arch Cadet',
        points: 40,
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAANklEQVQYV2NkYGD4z4AHMDGQCFA0MDL8Z2BgYGRgYPjPyPCfEUUBugJGFAWMyAowFGBRgKwAAOBKCAf/MhqEAAAAAElFTkSuQmCC',
        region: 'EU',
        badges: [{type: 'portal', label: 'HT2'}, {type: 'lightning', label: 'HT3'}]
    },
    {
        name: 'Testing7',
        rank: 'Arch Cadet',
        points: 40,
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAANklEQVQYV2NkYGD4z4AHMDGQCFA0MDL8Z2BgYGRgYPjPyPCfEUUBugJGFAWMyAowFGBRgKwAAOBKCAf/MhqEAAAAAElFTkSuQmCC',
        region: 'EU',
        badges: [{type: 'portal', label: 'HT2'}, {type: 'lightning', label: 'HT3'}]
    }
];

function getRankClass(rank) {
    if (rank.includes('Ace')) return 'ace';
    if (rank.includes('Specialist')) return 'specialist';
    if (rank.includes('Cadet')) return 'cadet';
    return '';
}

function getRankIcon(rank) {
    if (rank.includes('Ace')) return '⚔️';
    if (rank.includes('Specialist')) return '◆';
    if (rank.includes('Cadet')) return '◎';
    return '';
}

function renderLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        const badgesHTML = player.badges.map(badge => `
            <div class="badge">
                <div class="badge-icon ${badge.type}">
                    ${badge.type === 'lightning' ? '⚡' : '🌀'}
                </div>
                <div class="badge-label">${badge.label}</div>
            </div>
        `).join('');
        
        card.innerHTML = `
            <div class="player-left">
                <div class="rank">${index + 1}</div>
                <img src="${player.avatar}" alt="${player.name}" class="player-avatar" style="width: 64px; height: 64px; background: #555; border-radius: 4px;">
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <div class="player-rank ${getRankClass(player.rank)}">
                        <span>${getRankIcon(player.rank)}</span>
                        <span>${player.rank}</span>
                        <span>(${player.points} pts)</span>
                    </div>
                </div>
            </div>
            <div class="player-right">
                <div class="region-badge">${player.region}</div>
                <div class="badges">
                    ${badgesHTML}
                </div>
            </div>
        `;
        
        leaderboard.appendChild(card);
    });
}

renderLeaderboard();
    </script>
</body>
</html>
