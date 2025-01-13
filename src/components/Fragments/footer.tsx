import ScroolTopButton from "./scroolTopButton";

const Footer = () => {
  return (
    <div className="bg-[#1c1d25] text-white px-0 py-[3%]">
      <div className="flex flex-col items-center justify-center">
        <ScroolTopButton />
    
        <div className="flex justify-center p-4 flex-wrap gap-16">
          <div className="p-4">
            <h4 className="font-medium">Products</h4>
            <ul>
              <li>
                <a href="#" className="text-xs">
                  EduForge LMS Plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  MemberEdu LMS Plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  ProPanel
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Groups Management
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Gradebook
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Notes
                </a>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="font-medium">Support</h4>
            <ul>
              <li>
                <a href="#" className="text-xs">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="font-medium">Company</h4>
            <ul>
              <li>
                <a href="#" className="text-xs">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="font-medium">Our Partners</h4>
            <ul>
              <li>
                <a href="#" className="text-xs">
                  EduForge
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  MemberEduForge
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  ProPanel
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Groups Management
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Gradebook
                </a>
              </li>
              <li>
                <a href="#" className="text-xs">
                  Notes
                </a>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h4 className="font-medium">Stay Connected</h4>
            <p className="text-xs">Subscribe to our newsletter</p>
            <div className="flex mt-2 flex-row w-full border-[1px] bg-white color-[#1c1d25] rounded-2xl">
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 w-full rounded-2xl"
              />
              <button className="p-2 text-[#007BFF] rounded-2xl">
                Subscribe
              </button>
            </div>
            <ul className="flex gap-4 py-4">
              <li>
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  version="1.1"
                  fill="#007BFF"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M21.8,8.001c0,0-0.195-1.378-0.795-1.985c-0.76-0.797-1.613-0.801-2.004-0.847c-2.799-0.202-6.997-0.202-6.997-0.202 h-0.009c0,0-4.198,0-6.997,0.202C4.608,5.216,3.756,5.22,2.995,6.016C2.395,6.623,2.2,8.001,2.2,8.001S2,9.62,2,11.238v1.517 c0,1.618,0.2,3.237,0.2,3.237s0.195,1.378,0.795,1.985c0.761,0.797,1.76,0.771,2.205,0.855c1.6,0.153,6.8,0.201,6.8,0.201 s4.203-0.006,7.001-0.209c0.391-0.047,1.243-0.051,2.004-0.847c0.6-0.607,0.795-1.985,0.795-1.985s0.2-1.618,0.2-3.237v-1.517 C22,9.62,21.8,8.001,21.8,8.001z M9.935,14.594l-0.001-5.62l5.404,2.82L9.935,14.594z"></path>
                </svg>
              </li>
              <li>
                <svg
                  width="34"
                  height="34"
                  fill="#007BFF"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M13.982 10.622 20.54 3h-1.554l-5.693 6.618L8.745 3H3.5l6.876 10.007L3.5 21h1.554l6.012-6.989L15.868 21h5.245l-7.131-10.378Zm-2.128 2.474-.697-.997-5.543-7.93H8l4.474 6.4.697.996 5.815 8.318h-2.387l-4.745-6.787Z"></path>
                </svg>
              </li>
              <li>
                <svg
                  width="34"
                  height="34"
                  fill="#007BFF"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"></path>
                </svg>
              </li>
              <li>
                <svg
                  width="34"
                  height="34"
                  fill="#007BFF"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"></path>
                </svg>
              </li>
            </ul>
            <p className="text-xs">
              Copyright &copy; 2024. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
