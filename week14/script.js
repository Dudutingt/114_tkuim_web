document.addEventListener('DOMContentLoaded', () => {
    // 1. Ask AI Button Interaction
    const askAiBtn = document.getElementById('askAiBtn');
    askAiBtn.addEventListener('click', () => {
        alert('This would open the AI chat interface!');
        // In a real app, this would toggle a modal or chat widget
    });

    // 2. Search Box Interaction (Visual only)
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('click', () => {
        console.log('Search clicked');
        // Simulate focus or open search modal
        searchBox.style.borderColor = '#2563eb';
        setTimeout(() => {
             searchBox.style.borderColor = '#e5e7eb';
        }, 200);
    });

    // 3. Theme Toggle (Simple implementation)
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Note: Real implementation would need more CSS handles for dark mode
        console.log('Theme toggled');
    });

    // 4. Scroll Spy for TOC highlighting
    // Select all sections that have IDs (none in the simplified HTML, but logical structure)
    // For demo, we'll just toggle active state on sidebar clicks
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
        });
    });

    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchBox.click();
        }
    });
});
