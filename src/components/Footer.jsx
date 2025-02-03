import { Link } from "react-router-dom";
import { Calendar, Users, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Cally</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={16} />
              <span>Event Management</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Users size={16} />
              <span>User Collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>Calendar Integration</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cally-privacy-policy.anujthakur.dev"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">anujthakur0103@gmail.com</p>
            <p>© {currentYear} Cally. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
