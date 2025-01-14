/* eslint-disable react/jsx-no-literals */
import ContactUsSection from '@/features/landing/components/ContactUsSection';
import Footer from '@/features/landing/components/Footer';
import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { Spacer } from '@/components/atoms/Spacer';

export const SupportPage = async () => {
  return (
    <>
      <LandingLayout.Container className="text-center text-white">
        <Spacer height={3} />
        <h1>Support & Confidentialité</h1>
        <Spacer height={8} />
      </LandingLayout.Container>

      <div className="bg-background-light">
        <LandingLayout.Container>
          Chez Hekima, nous accordons la plus grande importance à votre confidentialité et à la protection de vos
          échanges. C’est pourquoi nous avons mis en place les principes suivants pour préserver vos données et vous
          offrir un environnement sécurisé :
          <div className="mb-3 mt-5">
            <h3>Collecte Minimale de Données</h3>
            Nous ne recueillons que les informations essentielles pour vous fournir nos services : votre nom, votre
            numéro de téléphone lors de l’inscription, l’historique de vos interactions avec Hekima ainsi que vos
            interactions avec les liens et fonctionnalités sociales. Les données supplémentaires (analyses d’utilisation
            ou statistiques agrégées) sont strictement anonymisées et uniquement exploitées pour améliorer votre
            expérience.
          </div>
          <div className="mb-3 mt-5">
            <h3>Maîtrise par l’Utilisateur</h3>
            Vous conservez le contrôle total de vos informations personnelles. À tout moment, vous pouvez modifier vos
            données ou supprimer votre compte, vous assurant ainsi une autonomie complète sur la gestion de votre vie
            privée.
          </div>
          <div className="mb-3 mt-5">
            <h3>Protection et Respect de la Vie Privée</h3>
            Nous protégeons vos informations personnelles, nous nous engageons à ne jamais les partager avec des tiers
            et nous mettons tout en œuvre pour respecter votre vie privée.
          </div>
          <div className="mb-5 mt-16">
            Nous nous efforçons de mériter et de préserver votre confiance en maintenant la confidentialité de vos
            échanges. Pour toute question ou préoccupation concernant nos Normes de Confidentialité et de Sécurité,
            n’hésitez pas à contacter notre équipe d’assistance.
          </div>
          <ContactUsSection hideTitle />
          <Spacer height={5} />
          <Footer />
        </LandingLayout.Container>
      </div>
    </>
  );
};
