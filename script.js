document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initCharts();
    initTheme();
    initUserDropdown();
});

function initMap() {
    const map = L.map('map').setView([3.1390, 101.6869], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Store map reference globally for theme switching
    window.floodMap = map;
    
    const locations = [
        { name: 'SRI MUDA', coords: [3.1390, 101.6869], type: 'flooded' },
        { name: 'KUNCI AIR PADANG JAWA', coords: [3.1500, 101.7000], type: 'raining' }
    ];
    
    locations.forEach(location => {
        const color = location.type === 'flooded' ? '#dc3545' : '#17a2b8';
        const icon = L.divIcon({
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
            iconSize: [20, 20]
        });
        L.marker(location.coords, { icon: icon }).addTo(map).bindPopup(location.name);
    });
}

function initCharts() {
    // Flood Alerts Chart
    new Chart(document.getElementById('floodAlertsChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                label: 'monthly',
                data: [8, 6, 8, 6, 8, 6, 6, 4, 3, 5, 7, 9],
                backgroundColor: '#4e73df'
            }, {
                label: 'daily',
                data: [2, 1, 3, 2, 4, 2, 1, 0, 0, 1, 2, 3],
                backgroundColor: '#f6c23e'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f0f0f0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Rain Cumulative Chart
    new Chart(document.getElementById('rainCumulativeChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
            datasets: [{
                label: 'Monthly Highest',
                data: [50, 120, 180, 250, 300, 350, 380, 390, 400],
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78, 115, 223, 0.1)',
                fill: true
            }, {
                label: "Today's Highest",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: '#f6c23e',
                backgroundColor: 'rgba(246, 194, 62, 0.1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // Tides Chart
    new Chart(document.getElementById('tidesChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'level',
                data: [0.8, 1.2, 1.8, 2.2, 2.0, 1.5, 0.9],
                borderColor: '#1cc88a',
                backgroundColor: 'rgba(28, 200, 138, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // No Data Chart
    new Chart(document.getElementById('noDataChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
            datasets: [{
                data: [2, 4, 3, 6, 5, 4, 3, 2],
                borderColor: '#6c757d',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-theme', this.checked);
            localStorage.setItem('darkTheme', this.checked);
            
            // Update subtitle colors
            updateSubtitleColors(this.checked);
            
            // Update map tiles for dark mode
            if (window.floodMap) {
                if (this.checked) {
                    // Switch to dark map tiles
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                        attribution: '© OpenStreetMap contributors, © CARTO'
                    }).addTo(window.floodMap);
                } else {
                    // Switch back to light map tiles
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(window.floodMap);
                }
            }
        });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'true') {
            toggle.checked = true;
            document.body.classList.add('dark-theme');
            updateSubtitleColors(true);
        }
    }
    
    // Add status color coding
    addStatusColors();
}

function addStatusColors() {
    const statusCells = document.querySelectorAll('.alert-content td:last-child');
    statusCells.forEach(cell => {
        const text = cell.textContent.trim();
        cell.style.fontWeight = '600';
        
        if (text === 'Critical' || text === 'Heavy') {
            cell.style.color = '#dc3545';
        } else if (text === 'High' || text === 'Moderate') {
            cell.style.color = '#fd7e14';
        } else if (text === 'Medium') {
            cell.style.color = '#ffc107';
        } else if (text === 'Light') {
            cell.style.color = '#28a745';
        } else if (text === 'Rising') {
            cell.style.color = '#e83e8c';
        }
    });
}

function updateSubtitleColors(isDark) {
    const subtitles = document.querySelectorAll('.widget-header h3');
    subtitles.forEach(subtitle => {
        if (isDark) {
            subtitle.style.color = '#ffffff';
        } else {
            subtitle.style.color = '#495057';
        }
    });
}

function initUserDropdown() {
    const dropdownBtn = document.getElementById('userDropdownBtn');
    const dropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Toggle dropdown
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            // Here you would typically redirect to login page or clear session
            alert('Logging out...');
            // window.location.href = '/login'; // Uncomment for actual logout
        }
    });
    
    // Profile and Settings functionality
    const profileItem = dropdown.querySelector('.dropdown-item:first-child');
    const settingsItem = dropdown.querySelector('.dropdown-item:nth-child(2)');
    
    profileItem.addEventListener('click', function() {
        alert('Profile page would open here');
        dropdown.classList.remove('show');
    });
    
    settingsItem.addEventListener('click', function() {
        alert('Settings page would open here');
        dropdown.classList.remove('show');
    });
}
