import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-ink/20 dark:border-dark-ink/20 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-ink/60 dark:text-dark-ink/60">
        <p>&copy; {new Date().getFullYear()} The WinNews Time. All Rights Reserved.</p>
        <p className="mt-1">Powered by News API</p>
      </div>
    </footer>
  );
};

export default Footer;
