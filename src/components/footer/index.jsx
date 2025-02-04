import inst from "../../assets/icon/instagram.png";
import tecPc from "../../assets/icon/pc.png";
import whatsApp from "../../assets/icon/whatsapp.png";
import './Footer.css';

const SocialButton = ({ href, imgSrc, altText }) => (
  <button>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} alt={altText} />
    </a>
  </button>
);

const Footer = () => {
  return (
    <footer className="main-content">
      <div className="tecnico">
        <h3>DESARROLLADOR - <strong>LEANDRO INSFRAN</strong></h3>
      </div>
      <div className="social-buttons">
        <SocialButton href="https://www.instagram.com/kintsugi.miel/" imgSrc={inst} altText="Instagram" />

        <SocialButton  href="https://wa.me/541133081248?text=Hola%2C%20estoy%20interesado%20en%20tus%20servicios%20de%20desarrollo%20web." imgSrc={whatsApp} altText="WhatsApp" />

        <SocialButton href="https://www.facebook.com/profile.php?id=100041555655966" imgSrc={tecPc} altText="Computadora Portátil" />

      </div>
    </footer>
  );
};

export default Footer;
