function Footer({ darkMode }) {
    return (
      <footer
        className={`fixed bottom-0 left-0 w-full p-4 ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
        } border-t border-white`}
      >
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-sm sm:text-base">© 2025 Task Manager. All rights reserved.</p>
  
          <div className="flex space-x-4">
            <a href="javascript:void(0)" className="text-sm sm:text-base hover:underline">
              Privacy Policy
            </a>
            <a href="javascript:void(0)" className="text-sm sm:text-base hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  