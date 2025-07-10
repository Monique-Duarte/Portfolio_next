import React from "react";

interface ContactIconProps {
  href: string;
  iconClass: string;
  label: string;
}

const ContactIcon: React.FC<ContactIconProps> = ({ href, iconClass, label }) => {
  return (
    <div className="p-0">
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <i className={`${iconClass} fs-3 mx-1 text-white`}></i>
      </a>
    </div>
  );
};

export default ContactIcon; 