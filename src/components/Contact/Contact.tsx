import DownloadButton from "../Blob/blob";
import ContactIcon from "./contactIcon";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white mt-6">
      <div className="flex space-x-4 text-2xl">
        <ContactIcon
          href="https://www.instagram.com/duartt.monique/"
          iconClass="bi bi-instagram"
          label="Instagram"
        />
        <ContactIcon
          href="mailto:moniquead95@gmail.com"
          iconClass="bi bi-envelope"
          label="Email"
        />
        <ContactIcon
          href="https://www.linkedin.com/in/moniquead"
          iconClass="bi bi-linkedin"
          label="LinkedIn"
        />
        <ContactIcon
          href="https://github.com/Monique-Duarte"
          iconClass="bi bi-github"
          label="GitHub"
        />
        <ContactIcon
          href="https://wa.me/19998000818"
          iconClass="bi bi-whatsapp"
          label="WhatsApp"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-0">
        <DownloadButton
          filePath="/curriculo-pt.pdf"
          fileName="curriculo-monique-duarte-pt.pdf"
          buttonText="📄 Baixar Currículo (PT)"
          variant="primary"
        />
        <DownloadButton
          filePath="/curriculo-en.pdf"
          fileName="curriculum-monique-duarte-en.pdf"
          buttonText="📄 Download Resume (EN)"
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default Contact;