import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
