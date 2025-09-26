import React from 'react';

interface ContactIconProps {
  href: string;
  iconClass: string;
  label: string;
}

const ContactIcon: React.FC<ContactIconProps> = ({ href, iconClass, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-gray-400 transition-colors"
    >
      <i className={iconClass}></i>
    </a>
  );
};

export default ContactIcon;