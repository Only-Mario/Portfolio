// Portfolio de Mario Merveille Ligan : données et interactions (Vue 3)
const WHATSAPP_NUMBER = '2290151875012';
const CAREER_START = 2022; // première mission professionnelle (CV : ONG Campus pour Christ, 2022)

const app = Vue.createApp({
    data() {
        return {
            scrolled: false,
            mobileMenuOpen: false,
            activeSection: 'accueil',
            theme: document.documentElement.getAttribute('data-theme') || 'dark',
            currentYear: new Date().getFullYear(),
            experienceStart: CAREER_START,

            menuItems: [
                { id: 'projets', name: 'Réalisations' },
                { id: 'services', name: 'Services' },
                { id: 'methode', name: 'Méthode' },
                { id: 'avis', name: 'Avis' },
                { id: 'apropos', name: 'À propos' },
                { id: 'contact', name: 'Contact' }
            ],

            socials: [
                { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/in/ligan-mario-965077218/' },
                { label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/Only-Mario' },
                { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/mariomerveille.ligan.9/' },
                { label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/' + WHATSAPP_NUMBER }
            ],

            clients: ['XWE Speed', 'Aligbonon', 'Kinetik Paris', 'Moguo Paris', 'NEO ANIMALIA', 'Les Sens de Capucine', 'PIPPACORNER', 'INSTI Lokossa', 'Trois Ventes Services', 'Campus pour Christ'],

            skillCategories: [
                {
                    name: 'Mobile & Front',
                    skills: [
                        { name: 'Flutter', icon: 'fa-solid fa-mobile-screen' },
                        { name: 'Vue 3', icon: 'fa-brands fa-vuejs' },
                        { name: 'TypeScript', icon: 'fa-brands fa-js' },
                        { name: 'Tailwind', icon: 'fa-solid fa-wind' },
                        { name: 'HTML / CSS', icon: 'fa-brands fa-html5' }
                    ]
                },
                {
                    name: 'Back-end',
                    skills: [
                        { name: 'Laravel', icon: 'fa-brands fa-laravel' },
                        { name: 'PHP', icon: 'fa-brands fa-php' },
                        { name: 'Symfony', icon: 'fa-brands fa-symfony' },
                        { name: 'MySQL', icon: 'fa-solid fa-database' },
                        { name: 'API REST', icon: 'fa-solid fa-plug' }
                    ]
                },
                {
                    name: 'CMS & E-commerce',
                    skills: [
                        { name: 'WordPress', icon: 'fa-brands fa-wordpress' },
                        { name: 'Shopify', icon: 'fa-brands fa-shopify' },
                        { name: 'Mobile Money', icon: 'fa-solid fa-wallet' }
                    ]
                }
            ],

            services: [
                {
                    title: 'Applications web & mobiles sur mesure',
                    icon: 'fa-solid fa-layer-group',
                    description: 'Plateformes, espaces clients, applis iOS & Android : un produit solide, pensé pour vos utilisateurs et prêt à grandir.',
                    features: ['Application Flutter iOS & Android', 'API et back-office Laravel', 'Paiement Mobile Money et carte', 'Connexion sécurisée (OTP, comptes)'],
                    stack: ['Flutter', 'Laravel', 'Vue 3', 'MySQL']
                },
                {
                    title: 'Sites vitrines qui convertissent',
                    icon: 'fa-solid fa-display',
                    description: 'Un site rapide, beau et bien référencé, qui donne confiance et transforme les visiteurs en demandes.',
                    features: ['Design moderne et responsive', 'Référencement Google de base', 'Bouton WhatsApp et formulaires']
                },
                {
                    title: 'Boutiques en ligne',
                    icon: 'fa-solid fa-bag-shopping',
                    description: 'Vendez 24 h/24 avec une boutique simple à gérer et des fiches produits qui donnent envie d\'acheter.',
                    features: ['Shopify ou WordPress', 'Mobile Money et carte bancaire', 'Gestion des commandes']
                },
                {
                    title: 'Refonte & modernisation',
                    icon: 'fa-solid fa-wand-magic-sparkles',
                    description: 'Votre site date ? Je le modernise sans perdre vos contenus ni votre référencement.',
                    features: ['Audit de l\'existant', 'Nouveau design', 'Migration des contenus']
                },
                {
                    title: 'Maintenance & évolutions',
                    icon: 'fa-solid fa-shield-halved',
                    description: 'Mises à jour, sécurité, corrections et nouvelles fonctionnalités : votre site reste rapide et fiable.',
                    features: ['Mises à jour de sécurité', 'Corrections de bugs', 'Nouvelles fonctionnalités']
                }
            ],

            processSteps: [
                { icon: 'fa-solid fa-comments', title: 'Échange', text: 'On clarifie vos objectifs, votre cible et votre budget. Vous recevez une proposition claire.' },
                { icon: 'fa-solid fa-pen-ruler', title: 'Maquette', text: 'Je conçois le parcours et le design. Vous validez avant la moindre ligne de code.' },
                { icon: 'fa-solid fa-code', title: 'Développement', text: 'Je développe et vous montre l\'avancement régulièrement, sur une version en ligne.' },
                { icon: 'fa-solid fa-rocket', title: 'Lancement & suivi', text: 'Mise en ligne, prise en main, puis maintenance et évolutions si vous le souhaitez.' }
            ],

            timeline: [
                {
                    role: 'Développeur fullstack',
                    company: 'XWE Speed · Aligbonon',
                    period: '2026 · en cours',
                    description: 'Conception et développement de deux plateformes complètes : une application immobilière (Flutter + Laravel) et une plateforme de formation et de streaming audiovisuel (Vue 3 + Laravel).'
                },
                {
                    role: 'Développeur web',
                    company: 'Trois Ventes Services (TVS)',
                    period: '2024 · aujourd\'hui',
                    description: 'Refonte et maintenance de sites et de boutiques en ligne pour des clients en France et en Belgique (Shopify, WordPress, sites sur mesure).'
                },
                {
                    role: 'Développeur web',
                    company: 'INSTI Lokossa',
                    period: '2023',
                    description: 'Conception, développement et déploiement de la plateforme de gestion des Travaux de Fin d\'Étude (Laravel), utilisée aujourd\'hui pour plus de 980 rapports.'
                },
                {
                    role: 'Développeur web',
                    company: 'ONG Campus pour Christ',
                    period: '2022',
                    description: 'Maquettes, architecture et développement d\'applications web pour l\'ONG (Symfony).'
                },
                {
                    role: 'Licence professionnelle',
                    company: 'INSTI Lokossa',
                    period: '2020 · 2023',
                    description: 'Génie électrique et informatique, option informatique et télécommunications.'
                }
            ],

            // Projets à la une : en cours de développement
            featuredProjects: [
                {
                    id: 'xwe',
                    title: 'XWE Speed',
                    status: 'En cours de développement',
                    category: 'Mobile',
                    categoryLabel: 'Application mobile & web',
                    client: 'Bénin',
                    domain: 'xwespeed.1gb.ru',
                    image: 'assets/images/projects/xwespeed.webp',
                    tagline: 'La plateforme immobilière qui permet de louer, acheter, faire construire ou régler ses formalités foncières au Bénin, avec des annonces vérifiées.',
                    highlights: ['Appli Flutter iOS & Android + site web', 'Paiement Mobile Money (Kkiapay)', 'Connexion par code OTP email et WhatsApp'],
                    tags: ['Flutter', 'Laravel 13', 'MySQL', 'Kkiapay'],
                    demo: 'http://xwespeed.1gb.ru/',
                    github: null,
                    details: 'XWE Speed est une plateforme immobilière pensée pour le Bénin : les particuliers louent, achètent, font construire ou règlent leurs formalités foncières, et peuvent proposer leurs propres biens. L\'équipe vérifie chaque annonce avant publication. Je développe l\'ensemble du produit : l\'application mobile, le site web, l\'API et le panel d\'administration.',
                    role: ['Application mobile Flutter (iOS & Android) : catalogue, filtres, favoris, carte et messagerie', 'Site web public de recherche de biens', 'API REST et panel d\'administration Laravel 13', 'Connexion par code OTP (email et WhatsApp)', 'Paiement Mobile Money intégré avec Kkiapay']
                },
                {
                    id: 'aligbonon',
                    title: 'Aligbonon Acoustic & Production',
                    status: 'En cours de développement',
                    category: 'Web',
                    categoryLabel: 'Plateforme web',
                    client: 'Bénin',
                    domain: 'aligbonon',
                    image: 'assets/images/projects/aligbonon.webp',
                    tagline: 'La plateforme de formation aux métiers du son, du cinéma et de la télévision, avec sa propre chaîne de streaming : Aligbonon TV.',
                    highlights: ['Espace étudiant : cours, quiz et progression', 'Aligbonon TV : streaming par catégories', 'Back-office : inscriptions, paiements, statistiques'],
                    tags: ['Vue 3', 'TypeScript', 'Laravel 13', 'Tailwind'],
                    demo: 'https://aligbonon-frotend.netlify.app/',
                    github: null,
                    details: 'Aligbonon Acoustic & Production forme aux métiers de l\'audiovisuel à Agori (Abomey-Calavi). Je développe la plateforme complète à partir de leur cahier des charges : le site vitrine, l\'espace étudiant, la chaîne de streaming Aligbonon TV et l\'administration.',
                    role: ['Site vitrine et catalogue des formations', 'Espace étudiant : cours vidéo, quiz et suivi de progression', 'Aligbonon TV : plateforme de streaming par catégories', 'Back-office : validation des inscriptions, paiements, statistiques', 'API Laravel 13 sécurisée (Sanctum)']
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
                    description: 'Refonte du site de NEO ANIMALIA, organisme belge de formation continue pour vétérinaires (110 journées de formation par an).',
                    image: 'assets/images/projects/neoanimalia.webp',
                    category: 'Web',
                    tags: ['Bootstrap', 'CSS', 'JS'],
                    demo: 'https://neoanimalia.be/',
                    github: null,
                    client: 'Belgique',
                    role: ['Refonte de toutes les pages du site', 'Intégration responsive (mobile, tablette, ordinateur)', 'Mise en avant du catalogue de formations et des chiffres clés'],
                    details: 'Refonte complète de toutes les pages du site de NEO ANIMALIA, organisme belge fondé en 2009 par des professionnels du secteur vétérinaire. Design moderne et responsive, mise en avant du catalogue de formations (chirurgie, échographie, cardiologie…), des chiffres clés (110 journées de formation par an, plus de 2 700 vétérinaires formés) et de l\'espace de connexion des participants.'
                },
                {
                    id: 5,
                    title: 'Les sens de capucine',
                    description: 'Refonte complète d\'un blog WordPress beauté, mode et lifestyle actif depuis 2012, avec une recherche optimisée.',
                    image: 'assets/images/projects/capucine.webp',
                    category: 'Web',
                    tags: ['WordPress', 'PHP', 'CSS3'],
                    demo: 'https://lessensdecapucine.com/',
                    github: null,
                    client: 'France',
                    role: ['Sauvegarde et migration des contenus', 'Refonte de l\'accueil et des rubriques (Beauté, Looks/Mode, Lifestyle, Shopping)', 'Nouveaux menus et moteur de recherche'],
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
                    description: 'Plateforme Laravel de l\'INSTI Lokossa : près de 1 000 rapports et mémoires consultables par filière, niveau et année.',
                    image: 'assets/images/projects/rapports.webp',
                    category: 'Web',
                    tags: ['Laravel', 'PHP', 'MySQL'],
                    demo: 'https://rapports.insti.edu.bj/',
                    github: 'https://github.com/Only-Mario/Gestion_de_tfe-laravel-',
                    client: 'Bénin',
                    role: ['Conception de la base de données et de l\'architecture', 'Développement Laravel (dépôt, suivi et évaluation des TFE)', 'Recherche et filtres par filière, niveau et année', 'Déploiement en production'],
                    details: 'Conception, développement et déploiement d\'une plateforme complète pour la gestion des Travaux de Fin d\'Étude à l\'INSTI Lokossa, permettant aux étudiants et aux enseignants de suivre et d\'évaluer les projets de fin d\'études. Elle publie aujourd\'hui plus de 980 rapports et mémoires (Licence, Master, Doctorat), avec une recherche par thème, auteur, encadrant ou lieu de stage et des filtres par filière et par année.'
                }
            ],

            filters: [
                { value: 'all', label: 'Tout' },
                { value: 'Web', label: 'Sites & plateformes' },
                { value: 'E-commerce', label: 'E-commerce' }
            ],
            currentFilter: 'all',

            testimonials: [
                {
                    name: 'Aimée KOUWAKPONOU',
                    position: 'Référente',
                    company: 'Trois Ventes Services (TVS)',
                    avatar: 'assets/images/aime.webp',
                    content: 'Mario a fait preuve d\'un grand professionnalisme dans la refonte de nos sites web clients. Son expertise technique et sa capacité à comprendre les besoins des utilisateurs ont permis d\'améliorer significativement l\'expérience utilisateur.'
                },
                {
                    name: 'Dr KONNON M. Abel',
                    position: 'Chef de Département GEI',
                    company: 'INSTI Lokossa',
                    avatar: 'assets/images/abel.webp',
                    content: 'Le développement de la plateforme de gestion des TFE par Mario a grandement facilité le suivi des projets de fin d\'études. Son travail a démontré une bonne maîtrise des technologies web et une capacité à livrer des solutions adaptées aux besoins spécifiques de l\'institut.'
                },
                {
                    name: 'Avérin AWELE',
                    position: 'Directeur',
                    company: 'ONG Campus pour Christ',
                    avatar: 'assets/images/averin.webp',
                    content: 'L\'application développée par Mario pour notre projet "Les Semeurs du Royaume" a parfaitement répondu à nos attentes. Sa capacité à transformer notre vision en une solution web fonctionnelle a été déterminante pour le succès de notre initiative.'
                }
            ],

            projectModalOpen: false,
            modalVisible: false,
            currentProject: null,

            loading: false,
            statusMessage: '',
            emailjsConfig: {
                serviceId: 'service_hva8mah',
                templateId: 'template_h689iia',
                userId: 'vN-HLiAD_dY93n1s3'
            },
            lastSubmission: null
        };
    },

    computed: {
        experienceYears() {
            return new Date().getFullYear() - CAREER_START;
        },
        allProjects() {
            return [...this.featuredProjects, ...this.projects];
        },
        filteredProjects() {
            const list = this.projects.map(p => ({
                ...p,
                categoryLabel: p.categoryLabel || (p.category === 'E-commerce' ? 'E-commerce' : 'Site & plateforme')
            }));
            return this.currentFilter === 'all' ? list : list.filter(p => p.category === this.currentFilter);
        },
        whatsappLink() {
            const text = 'Bonjour Mario, j\'ai vu votre portfolio et j\'aimerais vous parler d\'un projet.';
            return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
        }
    },

    methods: {
        toggleTheme() {
            const next = this.theme === 'dark' ? 'light' : 'dark';
            const root = document.documentElement;
            root.classList.add('theme-transition');
            root.setAttribute('data-theme', next);
            this.theme = next;
            try { localStorage.setItem('theme', next); } catch (e) { }
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', next === 'dark' ? '#070b14' : '#f6f7fb');
            setTimeout(() => root.classList.remove('theme-transition'), 500);
        },
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
            this.scrolled = window.scrollY > 40;
            const ids = ['accueil', ...this.menuItems.map(i => i.id)];
            let current = this.activeSection;
            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                const r = el.getBoundingClientRect();
                if (r.top <= 120 && r.bottom > 120) { current = id; break; }
            }
            this.activeSection = current;
        },
        openProjectModal(project) {
            this.currentProject = {
                ...project,
                categoryLabel: project.categoryLabel || (project.category === 'E-commerce' ? 'E-commerce' : 'Site & plateforme')
            };
            this.projectModalOpen = true;
            document.body.classList.add('no-scroll');
            requestAnimationFrame(() => requestAnimationFrame(() => { this.modalVisible = true; }));
        },
        closeProjectModal() {
            this.modalVisible = false;
            this.projectModalOpen = false;
            document.body.classList.remove('no-scroll');
        },
        onKeydown(e) {
            if (e.key === 'Escape') {
                if (this.projectModalOpen) this.closeProjectModal();
                this.closeMenu();
            }
        },
        async handleSubmit(e) {
            const form = e.target;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            if (this.lastSubmission && Date.now() - this.lastSubmission < 30000) {
                this.statusMessage = 'Merci de patienter 30 secondes avant un nouvel envoi.';
                return;
            }
            this.loading = true;
            this.statusMessage = '';
            try {
                await emailjs.sendForm(this.emailjsConfig.serviceId, this.emailjsConfig.templateId, '#contact-form', this.emailjsConfig.userId);
                this.statusMessage = '✅ Message envoyé ! Je vous réponds très vite.';
                form.reset();
                this.lastSubmission = Date.now();
            } catch (error) {
                console.error('Erreur EmailJS:', error);
                this.statusMessage = '❌ ' + this.getErrorMessage(error) + ' Vous pouvez aussi m\'écrire sur WhatsApp.';
            } finally {
                this.loading = false;
                setTimeout(() => { this.statusMessage = ''; }, 7000);
            }
        },
        getErrorMessage(error) {
            if (error && error.status === 400) return 'Formulaire incomplet.';
            if (error && error.status === 429) return 'Trop de tentatives, réessayez plus tard.';
            return 'Problème de connexion.';
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('keydown', this.onKeydown);
        this.handleScroll();

        // Défilement doux vers les ancres internes (compense l'en-tête fixe)
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            const id = link.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - (id === '#accueil' ? 0 : 72);
            window.scrollTo({ top, behavior: 'smooth' });
        });
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('keydown', this.onKeydown);
    }
});

app.mount('#app');
