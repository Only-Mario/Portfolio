
// Initialisation Vue.js corrigée
const app = Vue.createApp({
    //el: '#app',  timeline
    data() {
        return {
            pageLoaded: false,
            scrolled: false,
            mobileMenuOpen: false,
            isMobile: false,
            activeSection: 'home',
            menuItems: [
                { id: 'home', name: 'Accueil', link: '#home' },
                { id: 'about', name: 'À propos', link: '#about' },
                { id: 'services', name: 'Services', link: '#services' },
                { id: 'experience', name: 'Expérience', link: '#experience' },
                { id: 'projects', name: 'Projets', link: '#projects' },
                { id: 'testimonials', name: 'Témoignages', link: '#testimonials' },
                { id: 'contact', name: 'Contact', link: '#contact' }
            ],
            showBackToTop: false,
            hoveredService: null,
            stats: [
                { number: '5+', label: 'Projets Terminés' },
                { number: '3+', label: 'Clients Satisfaits' },
                { number: '3', label: 'Années d\'expérience' }
            ],
            skillCategories: [
                {
                    name: 'Frontend',
                    skills: [
                        { name: 'HTML5', icon: 'html5' },
                        { name: 'CSS3', icon: 'css3-alt' },
                        { name: 'JS', icon: 'js' },
                        { name: 'VueJs', icon: 'vuejs' },
                        { name: 'Bootstrap', icon: 'bootstrap' },
                        { name: 'Flutter', icon: 'flutter' }
                    ]
                },
                {
                    name: 'Backend',
                    skills: [
                        { name: 'PHP', icon: 'php' },
                        { name: 'Python', icon: 'python' },
                        { name: 'Laravel', icon: 'laravel' },
                        { name: 'Symfony', icon: 'symfony' },
                        { name: 'MySQL', icon: 'database' }
                    ]
                },
                {
                    name: 'CMS',
                    skills: [
                        { name: 'WordPress', icon: 'wordpress' },
                        { name: 'Shopify', icon: 'shopify' },
                        { name: 'PixFizz', icon: 'code' }
                    ]
                }
            ],
            services: [
                {
                    title: 'Développement Web',
                    icon: 'fas fa-laptop-code',
                    description: 'Création de sites web modernes, rapides et responsive qui s\'adaptent à tous les appareils.',
                    features: [
                        'Sites vitrines et institutionnels',
                        'Applications web complexes',
                        'E-commerce et boutiques en ligne',
                        'Intégration de CMS'
                    ]
                },
                {
                    title: 'E-commerce',
                    icon: 'fas fa-shopping-cart',
                    description: 'Création et maintenance de boutiques en ligne performantes et sécurisées.',
                    features: [
                        'Sites Shopify personnalisés',
                        'Intégration de solutions de paiement',
                        'Optimisation des fiches produits',
                        'Gestion des stocks et commandes'
                    ]
                },
                {
                    title: 'Maintenance Web',
                    icon: 'fas fa-tools',
                    description: 'Services de maintenance et d\'amélioration pour sites web et applications existants.',
                    features: [
                        'Corrections de bugs',
                        'Mises à jour de sécurité',
                        'Amélioration des performances',
                        'Ajout de fonctionnalités'
                    ]
                },
                {
                    title: 'Refonte de Sites',
                    icon: 'fas fa-sync-alt',
                    description: 'Modernisation et refonte complète de sites web existants pour améliorer l\'expérience utilisateur.',
                    features: [
                        'Audit du site existant',
                        'Design moderne et responsive',
                        'Optimisation SEO',
                        'Migration des données'
                    ]
                },
                {
                    title: 'Développement Mobile',
                    icon: 'fas fa-mobile-alt',
                    description: 'Création d\'applications natives et cross-platform performantes avec Flutter pour iOS et Android.',
                    features: [
                        'Applications sur mesure avec Flutter',
                        'Développement multiplateforme (iOS/Android)',
                        'Intégration d\'API RESTful',
                        'UI/UX optimisée pour mobile',
                        'Publication sur les stores',
                        'Maintenance et mises à jour'
                    ]
                },
            ],
            timeline: [
                {
                    role: 'Développeur Web',
                    company: 'Trois Ventes Services (TVS)',
                    period: '2024 - Présent',
                    description: 'Développement et maintenance de sites web, refonte de boutiques en ligne et création d\'interfaces utilisateur.'
                },
                {
                    role: 'Développeur Web',
                    company: 'INSTI Lokossa',
                    period: '2023',
                    description: 'Développement de la plateforme de gestion de Travaux de Fin d\'Étude pour l\'Institut National Supérieur de Technologie Industrielle.'
                },
                {
                    role: 'Développeur Web',
                    company: 'ONG Campus pour Christ',
                    period: '2022',
                    description: 'Développement d\'applications web pour l\'ONG, incluant le projet "Les Semeurs du Royaume" pour la recherche de fonds pour les missionnaires.'
                }
            ],
            projects: [
                {
                    id: 7,
                    title: 'kinetik  Paris',
                    description: 'Maintenance et amélioration d\'une boutique Shopify pour vêtements dédiés au running et au trail.',
                    image: 'assets/images/kinetik.png',
                    category: 'E-commerce',
                    tags: ['Shopify', 'JavaScript', 'Liquid'],
                    demo: 'https://kinetikadrenalink.com/',
                    github: null,
                    details: 'Refonte des pages produits pour les catégories Homme, Femme. Optimisation de l\'expérience utilisateur sur la boutique en ligne.'
                },
                {
                    id: 6,
                    title: 'NEO ANIMALIA',
                    description: 'Refonte du site de NEO ANIMALIA, une entreprise belge fondée en 2009 par des professionnels du secteur vétérinaire...',
                    image: 'assets/images/neoanimalia.png',
                    category: 'Web',
                    tags: ['Bootstrap', 'CSS', 'JS'],
                    demo: 'https://neoanimalia.be/',
                    github: null,
                    details: 'Projet de refonte complète, la refonte de toutes les pages sans exception'
                },
                {
                    id: 5,
                    title: 'Les sens de capucine',
                    description: 'Refonte complète d\'un blog WordPress avec optimisation des fonctionnalités de recherche.',
                    image: 'assets/images/capucine.png',
                    category: 'Web',
                    tags: ['WordPress', 'PHP', 'CSS3'],
                    demo: 'https://lessensdecapucine.com/',
                    github: null,
                    details: 'Projet de refonte complète incluant la sauvegarde des données, la refonte de la page d\'accueil, des pages Beautés, Looks/Mode, Lifestyle, shopping et Contact. Refonte des menus et ajout de la fonctionnalité de recherche.'
                },
                {
                    id: 4,
                    title: 'Moguo Paris',
                    description: 'Maintenance et amélioration d\'une boutique Shopify pour une marque de mode.',
                    image: 'assets/images/moguo.png',
                    category: 'E-commerce',
                    tags: ['Shopify', 'JavaScript', 'Liquid'],
                    demo: 'https://moguoparis.fr/',
                    github: null,
                    details: 'Revue de fonctionnalités sur l\'ajout et l\'affichage de produits. Refonte des pages produits pour les catégories Homme, Femme et Enfant. Optimisation de l\'expérience utilisateur sur la boutique en ligne.'
                },
                {
                    id: 3,
                    title: 'PIPPACORNER',
                    description: 'Refonte de la page d\'accueil d\'un site e-commerce basé sur le CMS PIXFIZZ.',
                    image: 'assets/images/pippacorner.png',
                    category: 'E-commerce',
                    tags: ['PixFizz', 'CSS', 'JavaScript'],
                    demo: 'https://pippacorner.pixfizz.com/',
                    github: null,
                    details: 'Refonte complète de la page d\'accueil de la boutique en ligne PIPPACORNER pour améliorer l\'expérience utilisateur et l\'esthétique du site.'
                },
                {
                    id: 2,
                    title: 'Plateforme de gestion de TFE',
                    description: 'Application web Laravel pour la gestion des Travaux de Fin d\'Étude.',
                    image: 'assets/images/rapports.png',
                    category: 'Web',
                    tags: ['Laravel', 'PHP', 'MySQL'],
                    demo: 'https://rapports.insti.edu.bj/',
                    github: null,
                    details: 'Conception, développement et déploiement d\'une plateforme complète pour la gestion des Travaux de Fin d\'Étude à l\'INSTI Lokossa, permettant aux étudiants et aux enseignants de suivre et d\'évaluer les projets de fin d\'études.'
                },
                {
                    id: 1,
                    title: 'Les Semeurs du Royaume',
                    description: 'Application web Symfony pour la recherche de fonds pour les missionnaires.',
                    image: 'https://placehold.co/400x300',
                    category: 'Web',
                    tags: ['Symfony', 'PHP', 'MySQL'],
                    demo: null,
                    github: null,
                    details: 'Préparation des maquettes, élaboration d\'architecture et choix des besoins logiciels et matériels pour le développement d\'une application web destinée à la recherche de fonds pour les missionnaires de l\'ONG Campus pour Christ.'
                },
               
            ],
            currentFilter: 'all',
            projectCategories: ['Web', 'E-commerce'],
            testimonials: [
                {
                    name: 'Aimée KOUWAKPONOU',
                    position: 'Référente',
                    company: 'Trois Ventes Services (TVS)',
                    avatar: 'assets/images/aime.png',
                    content: 'Mario a fait preuve d\'un grand professionnalisme dans la refonte de nos sites web clients. Son expertise technique et sa capacité à comprendre les besoins des utilisateurs ont permis d\'améliorer significativement l\'expérience utilisateur.'
                },
                {
                    name: 'Dr KONNON M. Abel',
                    position: 'Chef de Département GEI',
                    company: 'INSTI Lokossa',
                    avatar: 'assets/images/abel.png',
                    content: 'Le développement de la plateforme de gestion des TFE par Mario a grandement facilité le suivi des projets de fin d\'études. Son travail a démontré une bonne maîtrise des technologies web et une capacité à livrer des solutions adaptées aux besoins spécifiques de l\'institut.'
                },
                {
                    name: 'Avérin AWELE',
                    position: 'Directeur',
                    company: 'ONG Campus pour Christ',
                    avatar: 'assets/images/averin.png',
                    content: 'L\'application développée par Mario pour notre projet "Les Semeurs du Royaume" a parfaitement répondu à nos attentes. Sa capacité à transformer notre vision en une solution web fonctionnelle a été déterminante pour le succès de notre initiative.'
                }
            ],
            currentTestimonial: 0,
            projectModalOpen: false,
            currentProject: null,

            //mail ....
            loading: false,
            statusMessage: '',
            emailjsConfig: {
                serviceId: 'service_hva8mah',
                templateId: 'template_h689iia',
                userId: 'vN-HLiAD_dY93n1s3'
            },
            lastSubmission: null,
        }
    },
    computed: {
        filteredProjects() {
            if (this.currentFilter === 'all') {
                return this.projects;
            } else {
                return this.projects.filter(project => project.category === this.currentFilter);
            }
        }
    },
    methods: {
        initAnimations() {
            gsap.utils.toArray('.hero h1, .hero h2, .hero p, .hero-buttons, .project-card').forEach(el => {
                gsap.from(el, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%"
                    }
                });
            });
        },

        // Navigation & UI
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            document.body.classList.toggle('no-scroll', this.mobileMenuOpen);
        },
        closeMenu() {
            if (this.mobileMenuOpen) {
                this.mobileMenuOpen = false;
                document.body.classList.remove('no-scroll');
            }
        },
        handleScroll() {
            // Header scrolled effect
            this.scrolled = window.scrollY > 50;

            // Back to top button
            this.showBackToTop = window.scrollY > 500;

            // Active section detection
            const sections = ['home', 'about', 'services', 'experience', 'projects', 'testimonials', 'contact'];
            let current = '';

            for (let section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section;
                        break;
                    }
                }
            }

            if (current !== '' && current !== this.activeSection) {
                this.activeSection = current;
            }
        },
        checkMobile() {
            this.isMobile = window.innerWidth < 768;
        },
        randomParticleStyle() {
            return {
                top: Math.random() * 90 + '%', // Limite à 90% pour éviter de sortir de l'écran
                left: Math.random() * 90 + '%', // Limite à 90% pour éviter de sortir de l'écran
                animationDuration: (Math.random() * 10 + 10) + 's',
                animationDelay: (Math.random() * 5) + 's',
                opacity: Math.random() * 0.5 + 0.1
            };
        },

        // About section
        calculateExperience() {
            const startYear = 2022;
            return new Date().getFullYear() - startYear;
        },
        downloadCV() {
            const link = document.createElement('a');
            link.href = 'https://cvdesignr.com/p/64e4062b71edd';
            link.download = 'Mario_Ligan_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        // Projects section
        filterProjects(category) {
            this.currentFilter = category;
        },
        openProjectModal(project) {
            this.currentProject = project;
            this.projectModalOpen = true;
            document.body.classList.add('no-scroll');
        },
        closeProjectModal() {
            this.projectModalOpen = false;
            document.body.classList.remove('no-scroll');
        },

        // Testimonials section
        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextTestimonial();
            }, 5000); // Change de témoignage toutes les 5 secondes
        },

        nextTestimonial() {
            gsap.to('.testimonial', {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
                    gsap.fromTo('.testimonial', { opacity: 0 }, { opacity: 1, duration: 0.3 });
                }
            });
        },
        prevTestimonial() {
            this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
        },

        // Typed text animation
        initTypedText() {
            if (!this.$refs.typedText) return;

            const textElement = this.$refs.typedText;
            if (!textElement) return;

            const textList = ['avec créativité', 'avec passion', 'avec précision'];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;

            function type() {
                const currentText = textList[textIndex];

                if (isDeleting) {
                    textElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    textElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }

                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 1000; // Pause at end
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textList.length;
                    typingSpeed = 500; // Pause before typing next
                }

                setTimeout(type, typingSpeed);
            }

            setTimeout(type, 1000);
        },

        // form
        async handleSubmit() {
            // Vérification du délai entre les envois
            if (this.lastSubmission && Date.now() - this.lastSubmission < 30000) {
                this.statusMessage = 'Veuillez patienter 30 secondes avant un nouvel envoi';
                return;
            }

            this.loading = true;
            this.statusMessage = '';

            try {
                await emailjs.sendForm(
                    this.emailjsConfig.serviceId,
                    this.emailjsConfig.templateId,
                    '#contact-form',
                    this.emailjsConfig.userId
                );

                this.statusMessage = '✅ Message envoyé avec succès !';
                document.getElementById('contact-form').reset();
                this.lastSubmission = Date.now();

                // Redirection optionnelle vers une page de confirmation
                // window.location.href = '/merci.html';

            } catch (error) {
                console.error('Erreur EmailJS:', error);
                this.statusMessage = '❌ Erreur d\'envoi : ' + this.getErrorMessage(error);
            } finally {
                this.loading = false;
                setTimeout(() => this.statusMessage = '', 5000);
            }
        },

        getErrorMessage(error) {
            if (error.status === 400) return 'Formulaire incomplet';
            if (error.status === 429) return 'Trop de tentatives. Réessayez plus tard';
            return 'Problème de connexion. Réessayez';
        },
    },
    mounted() {
        // Initialize
        setTimeout(() => {
            this.pageLoaded = true;
            this.initAnimations();
        }, 1500);

        // Check if mobile
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);

        // Scroll events
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll(); // Call once to set initial state

        // Initialize typed text effect
        this.initTypedText();

        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        this.startAutoPlay();
        this.pageLoaded = true;
        this.initAnimations();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkMobile);

        // Nettoie l'intervalle lorsque le composant est détruit
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}).mount('#app');

