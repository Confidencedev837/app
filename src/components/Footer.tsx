import React from 'react';
import { FaEnvelope,FaPhoneAlt,FaHome,FaTiktok,FaFacebook,FaInstagram} from 'react-icons/fa'; 
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div>
      <p className='sociallineicons'><FaHome /> Address: Payment point--2 Carpark</p>
      <p className='sociallineicons'><FaEnvelope /> Email: grace.pggscargo@gmail.com</p>
      <p className='sociallineicons'><FaPhoneAlt /> Phone: +2348116422587</p>
      <p className='sociallineicons'><FaPhoneAlt /> Phone: +2348033204246</p>
      </div>
      <div className="footer-socials">
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok />TikTok</a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook/>Facebook</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram />Instagram</a>
      </div>
      <p>Developed by Confidence™</p>
    </footer>
  );
};

export default Footer;
