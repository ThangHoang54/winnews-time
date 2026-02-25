import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import type { AppContextType } from '@app/Layout';

// Translations 
const translations = {
  tocTitle: { en: 'On this page', fr: 'Sur cette page' },
  title: { en: 'Terms of Service', fr: "Conditions d'Utilisation" },
  lastUpdated: { en: 'Last Updated: November 12, 2025', fr: 'Dernière mise à jour : 12 novembre 2025' },

  // Section: Agreement
  agreementTitle: { en: '1. Agreement to Terms', fr: '1. Acceptation des Conditions' },
  agreementBody: {
    en: 'By accessing or using The WinNews Time (the "Application"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these terms, you may not use the Application.',
    fr: 'En accédant ou en utilisant The WinNews Time (l\'"Application"), vous acceptez d\'être lié par ces Conditions d\'Utilisation ("Conditions"). Si vous n\'acceptez pas ces conditions, vous ne pouvez pas utiliser l\'Application.',
  },

  // Section: Our Service
  serviceTitle: { en: '2. The Service', fr: '2. Le Service' },
  serviceBody: {
    en: 'The WinNews Time is a client-side news aggregator. It provides an interface to browse, save, and react to news articles fetched from third-party sources (e.g., NewsAPI.org). The Application does not host, create, or publish any news content itself. It is a tool for accessing content, not a publisher.',
    fr: 'The WinNews Time est un agrégateur de nouvelles côté client. Il fournit une interface pour parcourir, sauvegarder et réagir aux articles de presse récupérés de sources tierces (par ex., NewsAPI.org). L\'Application n\'héberge, ne crée ni ne publie aucun contenu d\'actualité elle-même. C\'est un outil d\'accès au contenu, pas un éditeur.',
  },

  // Section: Third Party
  thirdPartyTitle: { en: '3. Third-Party Content', fr: '3. Contenu de Tiers' },
  thirdPartyBody: {
    en: 'The articles, images, headlines, and descriptions displayed in the Application are sourced from third-party news providers. We do not control, endorse, or take responsibility for any third-party content. This content is provided "as-is" and we make no guarantees regarding its accuracy, timeliness, or reliability. Any views expressed in the content belong to the original authors and publishers.',
    fr: 'Les articles, images, titres et descriptions affichés dans l\'Application proviennent de fournisseurs de nouvelles tiers. Nous ne contrôlons, n\'approuvons ni n\'assumons la responsabilité du contenu de tiers. Ce contenu est fourni "tel quel" et nous ne donnons aucune garantie quant à son exactitude, sa pertinence ou sa fiabilité. Les opinions exprimées dans le contenu appartiennent aux auteurs et éditeurs originaux.',
  },

  // Section: User Conduct
  conductTitle: { en: '4. User Conduct', fr: '4. Conduite de l\'Utilisateur' },
  conductBody: {
    en: 'You agree not to use the Application to:',
    fr: 'Vous acceptez de ne pas utiliser l\'Application pour :',
  },
  conductList: {
    en: [
      'Violate any local, state, national, or international law.',
      'Reverse-engineer, decompile, or attempt to extract the source code of the Application.',
      'Scrape, crawl, or use any automated means to access the Application\'s data or the third-party content it displays.',
      'Interfere with the proper working of the Application.',
    ],
    fr: [
      'Enfreindre toute loi locale, étatique, nationale ou internationale.',
      'Faire de l\'ingénierie inverse, décompiler ou tenter d\'extraire le code source de l\'Application.',
      'Scraper, crawler ou utiliser tout moyen automatisé pour accéder aux données de l\'Application ou au contenu tiers qu\'elle affiche.',
      'Interférer avec le bon fonctionnement de l\'Application.',
    ],
  },

  // Section: IP
  ipTitle: { en: '5. Intellectual Property', fr: '5. Propriété Intellectuelle' },
  ipBody: {
    en: 'All rights, title, and interest in and to the Application itself (including its code, design, branding, and "The WinNews Time" name) are the exclusive property of its creators. All rights in and to the third-party content (articles, images, etc.) are the property of their respective owners and publishers.',
    fr: 'Tous les droits, titres et intérêts relatifs à l\'Application elle-même (y compris son code, sa conception, sa marque et le nom "The WinNews Time") sont la propriété exclusive de ses créateurs. Tous les droits relatifs au contenu de tiers (articles, images, etc.) sont la propriété de leurs propriétaires et éditeurs respectifs.',
  },

  // Section: Privacy
  privacyTitle: { en: '6. Privacy', fr: '6. Confidentialité' },
  privacyBody1: {
    en: 'Your privacy is important to us. Our',
    fr: 'Votre vie privée est importante pour nous. Notre',
  },
  privacyBodyLink: { en: 'Privacy Policy', fr: 'Politique de Confidentialité' },
  privacyBody2: {
    en: 'explains how your data is handled. As all data is stored locally on your device, we do not collect, transmit, or store your personal data.',
    fr: 'explique comment vos données sont traitées. Comme toutes les données sont stockées localement sur votre appareil, nous ne collectons, ne transmettons ni ne stockons vos données personnelles.',
  },

  // Section: Disclaimers
  disclaimerTitle: { en: '7. Disclaimer of Warranties', fr: '7. Exclusion de Garanties' },
  disclaimerBody: {
    en: 'The Application is provided "AS IS" and "AS AVAILABLE", without warranty of any kind. We explicitly disclaim any warranties of merchantability, fitness for a particular purpose, or non-infringement. We make no warranty that the service will be uninterrupted, secure, or error-free.',
    fr: 'L\'Application est fournie "TELLE QUELLE" et "TELLE QUE DISPONIBLE", sans garantie d\'aucune sorte. Nous déclinons explicitement toute garantie de qualité marchande, d\'adéquation à un usage particulier ou de non-contrefaçon. Nous ne garantissons pas que le service sera ininterrompu, sécurisé ou exempt d\'erreurs.',
  },

  // Section: Liability
  liabilityTitle: { en: '8. Limitation of Liability', fr: '8. Limitation de Responsabilité' },
  liabilityBody: {
    en: 'To the maximum extent permitted by law, the creators of this Application shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of your access to or use of the Application.',
    fr: 'Dans la mesure maximale permise par la loi, les créateurs de cette Application ne seront pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de toute perte de profits ou de revenus, découlant de votre accès ou de votre utilisation de l\'Application.',
  },

  // Section: Changes
  changesTitle: { en: '9. Changes to Terms', fr: '9. Modifications des Conditions' },
  changesBody: {
    en: 'We reserve the right to modify these Terms at any time. We will post the revised Terms on this page. By continuing to use the Application after the changes become effective, you agree to the revised Terms.',
    fr: 'Nous nous réservons le droit de modifier ces Conditions à tout moment. Nous publions les Conditions révisées sur cette page. En continuant à utiliser l\'Application après l\'entrée en vigueur des modifications, vous acceptez les Conditions révisées.',
  },

  // Section: Contact
  contactTitle: { en: '10. Contact Us', fr: '10. Contactez-nous' },
  contactBody: {
    en: 'If you have any questions about these Terms, please contact us at developer@winnews.com.',
    fr: 'Si vous avez des questions concernant ces Conditions, veuillez nous contacter à developer@winnews.com.',
  },
};


// Sections used for ToC
const sections = [
  { id: 'agreement', titleKey: 'agreementTitle' },
  { id: 'service', titleKey: 'serviceTitle' },
  { id: 'third-party', titleKey: 'thirdPartyTitle' },
  { id: 'conduct', titleKey: 'conductTitle' },
  { id: 'ip', titleKey: 'ipTitle' },
  { id: 'privacy', titleKey: 'privacyTitle' },
  { id: 'disclaimer', titleKey: 'disclaimerTitle' },
  { id: 'liability', titleKey: 'liabilityTitle' },
  { id: 'changes', titleKey: 'changesTitle' },
  { id: 'contact', titleKey: 'contactTitle' },
];

const Terms: React.FC = () => {
  const { language } = useOutletContext<AppContextType>();

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-12 px-6 lg:px-8 gap-12">
      {/* Sticky Table of Contents */}
      <aside className="lg:w-1/4 w-full lg:sticky lg:top-24 self-start border border-ink/10 dark:border-dark-ink/10 rounded-2xl bg-ink/5 dark:bg-dark-ink/5 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-ink dark:text-dark-ink">
          {translations.tocTitle[language]}
        </h3>
        <ol className="space-y-2 text-sm leading-snug">
          {sections.map((section) => {
            const title =
              translations[section.titleKey as keyof typeof translations][language];
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleTocClick(e, section.id)}
                  className="block text-ink/70 dark:text-dark-ink/70 hover:text-accent dark:hover:text-dark-accent transition-colors duration-150"
                >
                  {typeof title === 'string'
                    ? title.replace(/^\d+\.\s/, '')
                    : ''}
                </a>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Main Content */}
      <main className="lg:w-3/4 w-full">
        <header className="mb-12 border-b border-ink/10 dark:border-dark-ink/10 pb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink dark:text-dark-ink tracking-tight">
            {translations.title[language]}
          </h1>
          <p className="mt-3 text-sm text-ink/60 dark:text-dark-ink/60">
            {translations.lastUpdated[language]}
          </p>
        </header>

        {/* Added all 10 sections to match the ToC */}
        <article
          className="prose dark:prose-invert max-w-none text-ink/80 dark:text-dark-ink/80 leading-relaxed prose-headings:font-semibold prose-headings:text-ink dark:prose-headings:text-dark-ink prose-a:text-accent dark:prose-a:text-dark-accent space-y-16"
        >
          {/* Shared section styles */}
          {[
            {
              id: 'agreement',
              title: translations.agreementTitle[language],
              body: <p>{translations.agreementBody[language]}</p>,
            },
            {
              id: 'service',
              title: translations.serviceTitle[language],
              body: <p>{translations.serviceBody[language]}</p>,
            },
            {
              id: 'third-party',
              title: translations.thirdPartyTitle[language],
              body: <p>{translations.thirdPartyBody[language]}</p>,
            },
            {
              id: 'conduct',
              title: translations.conductTitle[language],
              body: (
                <>
                  <p>{translations.conductBody[language]}</p>
                  <ul className="list-disc list-inside space-y-2 mt-3 marker:text-accent dark:marker:text-dark-accent">
                    {translations.conductList[language].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              id: 'ip',
              title: translations.ipTitle[language],
              body: <p>{translations.ipBody[language]}</p>,
            },
            {
              id: 'privacy',
              title: translations.privacyTitle[language],
              body: (
                <p>
                  {translations.privacyBody1[language]}{' '}
                  <Link
                    to="/privacy"
                    className="relative text-accent dark:text-dark-accent font-medium after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-current after:transition-all hover:after:w-full"
                  >
                    {translations.privacyBodyLink[language]}
                  </Link>{' '}
                  {translations.privacyBody2[language]}
                </p>
              ),
            },
            {
              id: 'disclaimer',
              title: translations.disclaimerTitle[language],
              body: <p>{translations.disclaimerBody[language]}</p>,
            },
            {
              id: 'liability',
              title: translations.liabilityTitle[language],
              body: <p>{translations.liabilityBody[language]}</p>,
            },
            {
              id: 'changes',
              title: translations.changesTitle[language],
              body: <p>{translations.changesBody[language]}</p>,
            },
            {
              id: 'contact',
              title: translations.contactTitle[language],
              body: <p>{translations.contactBody[language]}</p>,
            },
          ].map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 relative group"
            >
              {/* Decorative heading underline */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-dark-ink mb-2">
                  {section.title}
                </h2>
                <div className="h-[2px] w-16 bg-accent dark:bg-dark-accent rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>

              <div className="pl-1">{section.body}</div>
            </section>
          ))}
        </article>

      </main>
    </div>
  );
};

export default Terms;