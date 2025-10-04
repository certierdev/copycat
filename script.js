// Placeholder player data
const players = [
    {
        name: "Testing 1",
        skin: "https://minotar.net/helm/Steve/32.png",
        solo: "HT1",
        duos: "HT1",
        squads: "HT1",
        overall: "HT1"
    },
    {
        name: "Testing 2",
        skin: "https://minotar.net/helm/Alex/32.png",
        solo: "HT2",
        duos: "HT2",
        squads: "HT2",
        overall: "HT2"
    }
];

// Map tiers to CSS classes
function tierClass(tier) {
    return tier.toLowerCase();
}

// Populate table
const tableBody = document.getElementById('players-table');

players.forEach(player => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td class="player-name">
            <img src="${player.skin}" alt="${player.name}">
            ${player.name}
        </td>
        <td><span class="tier-badge ${tierClass(player.solo)}">${player.solo}</span></td>
        <td><span class="tier-badge ${tierClass(player.duos)}">${player.duos}</span></td>
        <td><span class="tier-badge ${tierClass(player.squads)}">${player.squads}</span></td>
        <td><span class="tier-badge ${tierClass(player.overall)}">${player.overall}</span></td>
    `;

    tableBody.appendChild(row);
});
