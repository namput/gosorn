import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-4">
      <div className="container mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} NUEATECH COMPANY LIMITED. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
