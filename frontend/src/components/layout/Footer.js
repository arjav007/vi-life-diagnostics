const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Vi-Life Diagnostics</h3>
            <p className="text-gray-300 text-sm">
              Your Health, Our Priority. Delivering accurate, reliable pathology testing services.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/packages" className="text-gray-300 hover:text-white">Health Packages</a></li>
              <li><a href="/locations" className="text-gray-300 hover:text-white">Our Locations</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Home Sample Collection</li>
              <li className="text-gray-300">Digital Reports</li>
              <li className="text-gray-300">Health Checkups</li>
              <li className="text-gray-300">Pathology Tests</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">📞 +91 982-882-6646</p>
              <p className="text-gray-300">📧 info@vlifediagnostics.com</p>
              <p className="text-gray-300">🕒 6:30 AM - 7:30 PM</p>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="text-center text-sm text-gray-400">
          © 2025 Vi-Life Diagnostics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;