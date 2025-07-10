import React from 'react';

interface ModalButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ModalButton: React.FC<ModalButtonProps> = ({ href, onClick, children, className = '', type = 'button', ...rest }) => {
  // Força a cor correta no dark mode
  const baseClass = `px-4 py-2 rounded bg-yellow-400 font-bold hover:bg-yellow-500 transition text-gray-900 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClass}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ModalButton; 