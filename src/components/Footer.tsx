import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div>
        <p>Address: [Your Address]</p>
        <p>Email: grace.pggscargo@gmail.com</p>
        <p>Phone: [Phone Number]</p>
      </div>
      <div className="footer-socials">
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <p>Developed by Confidence</p>
    </footer>
  );
};

export default Footer;
