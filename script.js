// Global variables
let currentPlayers = [];
let isSearching = false;

// DOM elements
const playerSearch = document.getElementById('playerSearch');
const searchBtn = document.getElementById('searchBtn');
const playerDisplay = document.getElementById('playerDisplay');
const playerSkin = document.getElementById('playerSkin');
const playerName = document.getElementById('playerName');
const playerTier = document.getElementById('playerTier');
const playerMode = document.getElementById('playerMode');
const leaderboardList = document.getElementById('leaderboardList');
const enterArenaBtn = document.getElementById('enterArena');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    generateLeaderboard();
    startMatrixAnimation();
    updatePlayerCounts();
});

// Initialize application
function initializeApp() {
    console.log('🚀 mcTiers Arena Initialized');
    
    // Add loading animation to search button
    searchBtn.innerHTML = '<span class="btn-text">SCAN</span>';
    
    // Initialize mode cards with hover effects
    initializeModeCards();
    
    // Initialize tier cards with animations
    initializeTierCards();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

// Setup event listeners
function setupEventListeners() {
    // Player search functionality
    searchBtn.addEventListener('click', handlePlayerSearch);
    playerSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handlePlayerSearch();
        }
    });
    
    // Enter Arena button
    enterArenaBtn.addEventListener('click', function() {
        showNotification('🎮 Connecting to Arena...', 'info');
        setTimeout(() => {
            showNotification('⚡ Arena connection established!', 'success');
        }, 2000);
    });
    
    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Mode card interactions
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', function() {
            const mode = this.dataset.mode;
            showModeDetails(mode);
        });
    });
    
    // Tier card interactions
    document.querySelectorAll('.tier-card').forEach(card => {
        card.addEventListener('click', function() {
            const tier = this.dataset.tier;
            showTierDetails(tier);
        });
    });
}

// Handle player search
async function handlePlayerSearch() {
    const username = playerSearch.value.trim();
    
    if (!username) {
        showNotification('⚠️ Please enter a username', 'warning');
        return;
    }
    
    if (isSearching) return;
    
    isSearching = true;
    searchBtn.innerHTML = '<span class="loading-spinner"></span> SCANNING...';
    searchBtn.disabled = true;
    
    try {
        // Simulate API delay for realistic feel
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get player skin from Minotar
        const skinUrl = `https://minotar.net/avatar/${username}/100.png`;
        
        // Test if skin exists
        const skinExists = await testImage(skinUrl);
        
        if (skinExists) {
            displayPlayer(username, skinUrl);
            showNotification(`✅ Player ${username} found!`, 'success');
        } else {
            throw new Error('Player not found');
        }
        
    } catch (error) {
        showNotification(`❌ Player "${username}" not found`, 'error');
        hidePlayerDisplay();
    } finally {
        isSearching = false;
        searchBtn.innerHTML = '<span class="btn-text">SCAN</span>';
        searchBtn.disabled = false;
    }
}

// Test if image exists
function testImage(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// Display player information
function displayPlayer(username, skinUrl) {
    playerSkin.src = skinUrl;
    playerSkin.alt = `${username}'s skin`;
    playerName.textContent = username;
    
    // Generate random tier and mode for demo
    const tiers = ['Tier I', 'Tier II', 'Tier III', 'Tier IV', 'Tier V'];
    const modes = ['Crystal PvP', 'Sword PvP', 'Axe PvP', 'Bow PvP', 'Pot PvP', 'UHC', 'Combo PvP'];
    
    playerTier.textContent = tiers[Math.floor(Math.random() * tiers.length)];
    playerMode.textContent = modes[Math.floor(Math.random() * modes.length)];
    
    // Show player display with animation
    playerDisplay.classList.remove('hidden');
    
    // Add glow effect to avatar
    setTimeout(() => {
        playerSkin.style.animation = 'avatarGlow 2s ease-in-out infinite alternate';
    }, 500);
}

// Hide player display
function hidePlayerDisplay() {
    playerDisplay.classList.add('hidden');
}

// Generate leaderboard
function generateLeaderboard() {
    const samplePlayers = [
        { name: 'CrystalMaster', tier: 'Tier V', mode: 'Crystal PvP', score: 2847 },
        { name: 'SwordLegend', tier: 'Tier V', mode: 'Sword PvP', score: 2756 },
        { name: 'AxeWarrior', tier: 'Tier IV', mode: 'Axe PvP', score: 2634 },
        { name: 'BowSniper', tier: 'Tier IV', mode: 'Bow PvP', score: 2589 },
        { name: 'PotionMage', tier: 'Tier IV', mode: 'Pot PvP', score: 2512 },
        { name: 'UHCKing', tier: 'Tier III', mode: 'UHC', score: 2445 },
        { name: 'ComboFighter', tier: 'Tier III', mode: 'Combo PvP', score: 2398 },
        { name: 'ElitePlayer', tier: 'Tier III', mode: 'Crystal PvP', score: 2334 },
        { name: 'ProGamer', tier: 'Tier II', mode: 'Sword PvP', score: 2267 },
        { name: 'SkillMaster', tier: 'Tier II', mode: 'Axe PvP', score: 2198 }
    ];
    
    leaderboardList.innerHTML = '';
    
    samplePlayers.forEach((player, index) => {
        const entry = createLeaderboardEntry(player, index + 1);
        leaderboardList.appendChild(entry);
        
        // Animate entry appearance
        setTimeout(() => {
            entry.style.opacity = '1';
            entry.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Create leaderboard entry
function createLeaderboardEntry(player, rank) {
    const entry = document.createElement('div');
    entry.className = 'leaderboard-entry';
    entry.style.opacity = '0';
    entry.style.transform = 'translateX(-20px)';
    entry.style.transition = 'all 0.5s ease';
    
    // Get rank color
    let rankColor = '#00ffff';
    if (rank === 1) rankColor = '#ffd700';
    else if (rank === 2) rankColor = '#c0c0c0';
    else if (rank === 3) rankColor = '#cd7f32';
    
    entry.innerHTML = `
        <div class="rank" style="color: ${rankColor};">#${rank}</div>
        <div class="player-name">
            <img src="https://minotar.net/avatar/${player.name}/32.png" alt="${player.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjMzMzIi8+Cjwvc3ZnPgo='">
            <span>${player.name}</span>
        </div>
        <div class="tier-badge">${player.tier}</div>
        <div class="mode">${player.mode}</div>
        <div class="score">${player.score.toLocaleString()}</div>
    `;
    
    // Add click event for player details
    entry.addEventListener('click', () => {
        showPlayerDetails(player);
    });
    
    return entry;
}

// Show player details
function showPlayerDetails(player) {
    showNotification(`🔍 Viewing ${player.name}'s profile`, 'info');
    
    // Simulate loading player data
    setTimeout(() => {
        playerSearch.value = player.name;
        handlePlayerSearch();
    }, 500);
}

// Initialize mode cards
function initializeModeCards() {
    document.querySelectorAll('.mode-card').forEach(card => {
        // Add particle effect on hover
        card.addEventListener('mouseenter', function() {
            createParticles(this);
        });
        
        // Add sound effect simulation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize tier cards
function initializeTierCards() {
    document.querySelectorAll('.tier-card').forEach((card, index) => {
        // Stagger animation on load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add tier-specific colors
        const tierColors = [
            '#8B4513', // Bronze
            '#C0C0C0', // Silver
            '#FFD700', // Gold
            '#E6E6FA', // Platinum
            '#FF1493'  // Diamond
        ];
        
        const tierNumber = card.querySelector('.tier-number');
        if (tierNumber && tierColors[index]) {
            tierNumber.style.background = `linear-gradient(135deg, ${tierColors[index]}, #00ffff)`;
            tierNumber.style.webkitBackgroundClip = 'text';
            tierNumber.style.webkitTextFillColor = 'transparent';
        }
    });
}

// Show mode details
function showModeDetails(mode) {
    const modeNames = {
        crystal: 'Crystal PvP',
        sword: 'Sword PvP',
        axe: 'Axe PvP',
        bow: 'Bow PvP',
        pot: 'Pot PvP',
        uhc: 'UHC',
        combo: 'Combo PvP'
    };
    
    showNotification(`🎯 Entering ${modeNames[mode]} arena...`, 'info');
    
    setTimeout(() => {
        showNotification(`⚔️ ${modeNames[mode]} match found!`, 'success');
    }, 2000);
}

// Show tier details
function showTierDetails(tier) {
    const tierNames = {
        1: 'Initiate',
        2: 'Warrior',
        3: 'Veteran',
        4: 'Elite',
        5: 'Legend'
    };
    
    showNotification(`🏆 Tier ${tier} - ${tierNames[tier]} requirements`, 'info');
}

// Create particle effects
function createParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-50px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        info: '#00ffff',
        success: '#00ff41',
        warning: '#ffaa00',
        error: '#ff0040'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: ${colors[type]};
        padding: 1rem 2rem;
        border-radius: 5px;
        border: 1px solid ${colors[type]};
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        z-index: 10000;
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Toggle mobile navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Start matrix animation
function startMatrixAnimation() {
    const matrixBg = document.querySelector('.matrix-bg');
    
    setInterval(() => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        matrixBg.style.background = `
            radial-gradient(circle at ${randomX}% ${randomY}%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${100-randomX}% ${100-randomY}%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${randomY}% ${randomX}%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)
        `;
    }, 5000);
}

// Update player counts with animation
function updatePlayerCounts() {
    const counters = document.querySelectorAll('.mode-stats .highlight');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(',', ''));
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
    
    // Update counts periodically
    setInterval(() => {
        counters.forEach(counter => {
            const current = parseInt(counter.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 20) - 10;
            const newValue = Math.max(100, current + change);
            counter.textContent = newValue.toLocaleString();
        });
    }, 30000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        playerSearch.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        playerSearch.value = '';
        hidePlayerDisplay();
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes avatarGlow {
        0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
        100% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.8); }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        border-top-color: currentColor;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .tier-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    @media (max-width: 768px) {
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-top: 1px solid rgba(0, 255, 255, 0.2);
        }
        
        .hamburger {
            display: flex !important;
        }
        
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log(`
%c
╔══════════════════════════════════════╗
║            mcTiers Arena             ║
║        Elite PvP Platform            ║
║                                      ║
║  🎮 7 Game Modes                     ║
║  🏆 5 Tier System                    ║
║  ⚔️  Competitive Ranking             ║
║                                      ║
║  Press Ctrl+K to search players      ║
╚══════════════════════════════════════╝
`, 'color: #00ffff; font-family: monospace;');

// Performance monitoring
let performanceMetrics = {
    pageLoadTime: performance.now(),
    searchCount: 0,
    lastSearch: null
};

// Track search performance
const originalHandlePlayerSearch = handlePlayerSearch;
handlePlayerSearch = function() {
    performanceMetrics.searchCount++;
    performanceMetrics.lastSearch = Date.now();
    return originalHandlePlayerSearch.call(this);
};

// Export for debugging (development only)
if (typeof window !== 'undefined') {
    window.mcTiers = {
        metrics: performanceMetrics,
        showNotification,
        generateLeaderboard,
        displayPlayer
    };
}
