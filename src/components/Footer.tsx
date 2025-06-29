import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGamepad,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="container mx-auto text-white mt-10 max-w-full  bg-black px-6 py-8 shadow   ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Logo & About */}
        <div>
          <Link
            className="flex flex-row items-center text-lg font-bold mb-2"
            href={"/"}
          >
            <Image
              src="/logo-bg.png"
              alt="logo icon"
              width={40}
              height={40}
              className="w-10 h-10 md:w-12 md:h-12 mr-2"
            />
            <span>Horizon-Blog</span>
          </Link>
          <p className="text-sm text-gray-300 mb-8">
            Our mission is to equip modern explorers with cutting-edge,
            functional, and stylish bags that elevate every adventure.
          </p>
          <p className="text-xs text-gray-400 mt-8">
            &copy;2024 Horizone. All rights reserved.
          </p>
        </div>
        {/* About */}
        <div>
          <h4 className="font-semibold mb-2">About</h4>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Career
              </Link>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Return
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        {/* Get Updates & Social */}
        <div>
          <h4 className="font-semibold mb-2">Get Updates</h4>
          <form className="flex mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-l-md px-3 py-2 w-full  border border-white text-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-md bg-white text-black px-4 py-2 font-semibold hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-3 mb-4">
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-xl"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-xl"
            >
              <FaGamepad />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-xl"
            >
              <FaTiktok />
            </a>
          </div>
          <div className="flex gap-4 text-xs text-gray-300">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
