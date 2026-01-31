// script.js
console.log("Versatile Engineer Solutions Site Loaded");

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
            menuBtn.innerHTML = isExpanded ? '✕' : '☰';
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('service-modal');
    const closeBtn = document.querySelector('.close-modal');
    const serviceCards = document.querySelectorAll('.service-card');

    // Data for Modals
    const serviceData = {
        'automotive': {
            title: 'Automotive Services',
            icon: '🚗',
            desc: 'We provide all types of automotive repair services for commercial fleets and private vehicles. No job too big or small.',
            details: [
                'Full Vehicle Diagnostics & Repairs',
                'Engine Replacements & Rebuilds',
                'Gearbox, Clutch & Transmission Work',
                'Brakes, Suspension & Steering',
                'Electrical & Air Conditioning Systems',
                'All Mechanical Repairs',
                'Fleet Maintenance Contracts',
                'MOT Preparation & Servicing',
                'Roadside Assistance & Breakdown Recovery'
            ]
        },
        'hydraulics': {
            title: 'Hydraulic Repair',
            icon: '🔧',
            desc: 'Our mobile hydraulic workshops come to you. We minimize downtime with rapid hose replacement and ram repairs.',
            details: [
                '24/7 Mobile Hose Replacement',
                'Hydraulic Ram/Cylinder Refurbishment',
                'Pump & Motor Repairs',
                'System Pressure Testing',
                'Bespoke Hose Assembly On-site'
            ]
        },
        'forktrucks': {
            title: 'Forktruck Maintenance',
            icon: '🏭',
            desc: 'Keep your warehouse moving with our expert forklift services. We handle all major brands (Linde, Toyota, Jungheinrich).',
            details: [
                'Emergency Breakdown Support',
                'Planned Preventative Maintenance (PPM)',
                'LOLER Thorough Examinations',
                'Battery & Charger Maintenance',
                'Parts Supply & Fitting'
            ]
        },
        'agricultural': {
            title: 'Agricultural Engineering',
            icon: '🚜',
            desc: 'Specialized support for the farming community. We understand the seasonal pressures and offer priority harvest support.',
            details: [
                'Tractor & Combine Repairs',
                'On-site welding & fabrication',
                'PTO Shaft & Gearbox Repairs',
                'Hydraulic Systems for Ag Machinery',
                'Pre-season Inspections'
            ]
        }
    };

    // Open Modal
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const data = serviceData[serviceKey];

            if (data) {
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-icon').textContent = data.icon;
                document.getElementById('modal-description').textContent = data.desc;

                // Populate List
                const listEl = document.getElementById('modal-details');
                listEl.innerHTML = ''; // Clear old lists
                data.details.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    listEl.appendChild(li);
                });

                // Show Modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                }
            }
        });
    });
});

