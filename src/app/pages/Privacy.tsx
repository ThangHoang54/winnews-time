import React from 'react';
import { useOutletContext } from 'react-router-dom';
import type { AppContextType } from '@app/Layout';
import { Archive, Eye, Heart, Palette, ShieldOff, Server, UserSquare, Sun,Trash2, FileText } from 'lucide-react';

// Translations
const translations = {
  title: { en: 'Privacy Policy', fr: 'Politique de Confidentialité' },
  lastUpdated: { en: 'Last Updated: November 12, 2025', fr: 'Dernière mise à jour : 12 novembre 2025' },
  summaryTitle: { en: 'In Simple Terms', fr: 'En Termes Simples' },
  summaryBody: {
    en: "What you do in this app stays in this app. We do not have a server, we do not have user accounts, and we do not track you. All your data (like saved articles and reactions) is stored only on your own device.",
    fr: "Ce que vous faites dans cette application reste dans cette application. Nous n'avons pas de serveur, nous n'avons pas de comptes utilisateurs et nous ne vous suivons pas. Toutes vos données (comme les articles sauvegardés et les réactions) sont stockées uniquement sur votre propre appareil.",
  },
  whatWeCollectTitle: {
    en: 'Information We Use (Locally)',
    fr: 'Informations que nous utilisons (localement)',
  },
  whatWeCollectIntro: {
    en: 'This application stores a small amount of data in your browser. This data is essential for the app to function and is never sent to us.',
    fr: "Cette application stocke une petite quantité de données dans votre navigateur. Ces données sont essentielles au fonctionnement de l'application et ne nous sont jamais envoyées.",
  },
  collectList: {
    en: [
      {
        icon: Archive,
        title: 'Saved Articles',
        desc: 'A list of articles you explicitly save for later, stored in your browser.',
      },
      {
        icon: Eye,
        title: 'Read Status',
        desc: 'A list of article URLs you have clicked on, used to visually dim them.',
      },
      {
        icon: Heart,
        title: 'Reactions',
        desc: 'A record of the emojis you have reacted with on articles.',
      },
      {
        icon: Palette,
        title: 'Your Preferences',
        desc: 'We store your chosen theme (light/dark) and language (en/fr) so we can remember them for your next visit.',
      },
    ],
    fr: [
      {
        icon: Archive,
        title: 'Articles Sauvegardés',
        desc: 'Une liste d’articles que vous enregistrez explicitement pour plus tard, stockée dans votre navigateur.',
      },
      {
        icon: Eye,
        title: 'Statut de Lecture',
        desc: 'Une liste des URL d’articles sur lesquels vous avez cliqué, utilisée pour les estomper visuellement.',
      },
      {
        icon: Heart,
        title: 'Réactions',
        desc: 'Un enregistrement des émojis avec lesquels vous avez réagi aux articles.',
      },
      {
        icon: Palette,
        title: 'Vos Préférences',
        desc: "Nous mémorisons le thème (clair/sombre) et la langue (en/fr) que vous avez choisis pour s'en souvenir lors de votre prochaine visite.",
      },
    ],
  },
  whatWeDontCollectTitle: {
    en: 'Information We Never Collect',
    fr: 'Informations que nous ne collectons jamais',
  },
  dontCollectIntro: {
    en: 'This app is built to be private. We do not have the infrastructure or the desire to collect your personal data.',
    fr: 'Cette application est conçue pour être privée. Nous n’avons ni l’infrastructure ni le désir de collecter vos données personnelles.',
  },
  dontCollectList: {
    en: [
      {
        icon: UserSquare,
        title: 'Personal Information',
        desc: 'We never ask for or store your name, email, phone number, or any other Personal Identifiable Information (PII).',
      },
      {
        icon: Server,
        title: 'Server-Side Data',
        desc: 'We do not run a back-end server that logs your activity. This app is a "client-side" application.',
      },
      {
        icon: ShieldOff,
        title: 'Tracking Cookies',
        desc: 'We do not use analytics, advertising, or cross-site tracking cookies. Period.',
      },
    ],
    fr: [
      {
        icon: UserSquare,
        title: 'Informations Personnelles',
        desc: 'Nous ne demandons ni ne stockons jamais votre nom, votre e-mail, votre numéro de téléphone ou toute autre information d identification personnelle (PII).',
      },
      {
        icon: Server,
        title: 'Données Côté Serveur',
        desc: 'Nous n’exploitons pas de serveur back-end qui enregistre votre activité. Cette application est une application "côté client".',
      },
      {
        icon: ShieldOff,
        title: 'Cookies de Suivi',
        desc: "Nous n'utilisons pas de cookies d'analyse, de publicité ou de suivi intersite. Un point c'est tout.",
      },
    ],
  },
  storageTitle: {
    en: 'How Your Data is Stored',
    fr: 'Comment vos données sont stockées',
  },
  storageBody: {
    en: "All data listed above is stored using localStorage, a standard feature of your web browser. This data is stored on your device and is not accessible by us or any other website. If you clear your browser's data for this site, all your saved articles, reactions, and preferences will be permanently deleted.",
    fr: "Toutes les données répertoriées ci-dessus sont stockées à l'aide de localStorage, une fonctionnalité standard de votre navigateur Web. Ces données sont stockées sur votre appareil et ne sont pas accessibles par nous ou par tout autre site Web. Si vous effacez les données de votre navigateur pour ce site, tous vos articles, réactions et préférences enregistrés seront définitivement supprimés.",
  },
  thirdPartyTitle: {
    en: 'Third-Party Services',
    fr: 'Services Tiers',
  },
  thirdPartyBody: {
    en: "To provide news and weather, the app must request data from external services. These requests are made directly from your browser to their servers.",
    fr: "Pour fournir les informations et la météo, l'application doit demander des données à des services externes. Ces requêtes sont effectuées directement depuis votre navigateur vers leurs serveurs.",
  },
  thirdPartyList: {
    en: [
      {
        icon: FileText,
        title: 'News API (NewsAPI.org)',
        desc: 'To fetch news headlines. This service will see your IP address, just as any website you visit does. We do not send any personal data to them.',
      },
      {
        icon: Sun,
        title: 'Weather API',
        desc: 'The weather widget requests data from a third-party weather service, which will also receive your IP address.',
      },
    ],
    fr: [
      {
        icon: FileText,
        title: 'News API (NewsAPI.org)',
        desc: "Pour récupérer les titres de l'actualité. Ce service verra votre adresse IP, comme tout site Web que vous visitez. Nous ne leur envoyons aucune donnée personnelle.",
      },
      {
        icon: Sun,
        title: 'API Météo',
        desc: "Le widget météo demande des données à un service météo tiers, qui recevra également votre adresse IP.",
      },
    ],
  },
  yourRightsTitle: {
    en: 'Your Rights & Choices',
    fr: 'Vos Droits et Choix',
  },
  yourRightsBody: {
    en: "You have complete control over your data.",
    fr: "Vous avez un contrôle total sur vos données.",
  },
  yourRightsList: {
    en: [
      {
        icon: Trash2,
        title: 'Clear Your Data',
        desc: "You can delete all locally stored data at any time by going to your browser's settings and clearing the 'Site Data' or 'Cache' for this website.",
      },
    ],
    fr: [
      {
        icon: Trash2,
        title: 'Effacer vos données',
        desc: "Vous pouvez supprimer toutes les données stockées localement à tout moment en accédant aux paramètres de votre navigateur et en effaçant les 'Données du site' ou le 'Cache' de ce site Web.",
      },
    ],
  },
  changesTitle: {
    en: 'Changes to This Policy',
    fr: 'Modifications de cette politique',
  },
  changesBody: {
    en: 'We may update this policy from time to time. Any changes will be posted on this page. By continuing to use the app, you agree to the new policy.',
    fr: 'Nous pouvons mettre à jour cette politique de temps à autre. Tout changement sera publié sur cette page. En continuant à utiliser l application, vous acceptez la nouvelle politique.',
  },
  contactTitle: {
    en: 'Contact Us',
    fr: 'Contactez-nous',
  },
  contactBody: {
    en: 'If you have any questions about this Privacy Policy, please contact us at developer@winnews.com.',
    fr: 'Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter à developer@winnews.com.',
  },
};

// Helper Component
interface InfoItemProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 p-2 bg-accent/10 dark:bg-dark-accent/10 rounded-full">
      <Icon className="w-5 h-5 text-accent dark:text-dark-accent" />
    </div>
    <div>
      <h4 className="font-semibold text-ink dark:text-dark-ink">{title}</h4>
      <p className="text-sm text-ink/80 dark:text-dark-ink/80">{desc}</p>
    </div>
  </div>
);

// Main Page Component
const Privacy: React.FC = () => {
  const { language } = useOutletContext<AppContextType>();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* 1. Header */}
      <div className="text-center border-b border-ink/10 dark:border-dark-ink/10 pb-6 mb-8">
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-dark-ink mb-2">
          {translations.title[language]}
        </h1>
        <p className="text-sm text-ink/60 dark:text-dark-ink/60">
          {translations.lastUpdated[language]}
        </p>
      </div>

      {/* 2. Summary */}
      <blockquote className="border-l-4 border-accent dark:border-dark-accent bg-stone-100 dark:bg-gray-800 p-6 rounded-r-lg mb-12">
        <h3 className="font-semibold text-lg text-ink dark:text-dark-ink mb-2">
          {translations.summaryTitle[language]}
        </h3>
        <p className="text-ink/80 dark:text-dark-ink/80" dangerouslySetInnerHTML={{ __html: translations.summaryBody[language] }} />
      </blockquote>

      {/* 3. What We Collect */}
      <section className="mb-12 space-y-6">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink">
          {translations.whatWeCollectTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.whatWeCollectIntro[language]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {translations.collectList[language].map((item) => (
            <InfoItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* 4. What We DON'T Collect */}
      <section className="mb-12 space-y-6">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink">
          {translations.whatWeDontCollectTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.dontCollectIntro[language]}
        </p>
        <div className="space-y-6">
          {translations.dontCollectList[language].map((item) => (
            <InfoItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* 5. How Data is Stored */}
      <section className="mb-12 p-6 bg-stone-100 dark:bg-gray-800 rounded-lg border border-ink/10 dark:border-dark-ink/10">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink mb-4">
          {translations.storageTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: translations.storageBody[language] }} />
      </section>
      
      {/* 6. Third Parties */}
      <section className="mb-12 space-y-6">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink">
          {translations.thirdPartyTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.thirdPartyBody[language]}
        </p>
        <div className="space-y-6">
          {translations.thirdPartyList[language].map((item) => (
            <InfoItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* 7. Your Rights */}
      <section className="mb-12 space-y-6">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink">
          {translations.yourRightsTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.yourRightsBody[language]}
        </p>
        <div className="space-y-6">
          {translations.yourRightsList[language].map((item) => (
            <InfoItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* 8. Changed */}
      <section className="mb-12 p-6 bg-stone-100 dark:bg-gray-800 rounded-lg border border-ink/10 dark:border-dark-ink/10">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink mb-4">
          {translations.changesTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.changesBody[language]}
        </p>
      </section>

      {/* 9. Contact */}
      <section className="mb-12 p-6 bg-stone-100 dark:bg-gray-800 rounded-lg border border-ink/10 dark:border-dark-ink/10">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink mb-4">
          {translations.contactTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.contactBody[language]}
        </p>
      </section>
    </div>
  );
};

export default Privacy;