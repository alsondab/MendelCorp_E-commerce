const data = {
    headerMenus: [
        {
          name: "L'offre du jour",
          href: '/search?tag=todays-deal',
        },
        {
          name: 'Nouveaux arrivages',
          href: '/search?tag=new-arrival',
        },
        {
          name: 'Produits de marque',
          href: '/search?tag=featured',
        },
        {
          name: 'Meilleures ventes',
          href: '/search?tag=best-seller',
        },
        {
          name: 'Historique de navigation',
          href: '/#browsing-history',
        },
        {
          name: 'Service client',
          href: '/page/customer-service',
        },
        {
          name: 'A propos',
          href: '/page/about-us',
        },
        {
          name: 'Aide',
          href: '/page/help',
        },
      ],

      carousels: [
        {
          // Cette bannière cible la sécurité, un besoin fondamental
          title: 'Équipements de Sécurité Incendie - Votre Première Ligne de Défense',
          buttonCaption: 'Voir les Produits',
          image: '/images/banner1.jpg', // Image équipements incendie
          url: '/search?category=Securite-Incendie',
          isPublished: true,
        },
        {
          // Cette promotion gaming met l'accent sur l'économie réalisée
          title: 'Économisez Jusqu\'à 300$ sur les Écrans Gaming MSI',
          buttonCaption: 'Profiter de l\'Offre',
          image: '/images/banner2.jpg', // Image écran gaming MSI
          url: '/search?category=Ecrans-Gaming',
          isPublished: true,
        },
        {
          // Cette bannière technologique vise les entreprises modernes
          title: 'Solutions de Vidéosurveillance Automatisées',
          buttonCaption: 'Découvrir la Gamme',
          image: '/images/banner3.jpg', // Image caméra surveillance
          url: '/search?category=Cameras-Surveillance',
          isPublished: true,
        },
      ],
}

export default data
