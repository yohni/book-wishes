import React from "react";
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-gray-100">
      <footer className="pt-10 pb-5 footer text-base-content container">
        <div>
          <span className="footer-title">Techs</span>
          <a
            href="https://reactjs.org/"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <a
            href="https://near.org/"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            NEAR
          </a>
          <a
            href="https://daisyui.com/"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daisy UI
          </a>
          <a
            href="https://tailwindcss.com"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
        </div>
        <div>
          <span className="footer-title">About</span>
          <a
            href="https://yohnifinan.com/about"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Me
          </a>
          <a
            href="https://yohnifinan.com"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portofolio
          </a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a
              className="hover:text-bookwishes"
              href="https://twitter.com/yohni_finan"
            >
              <RiLinkedinBoxFill size={28} />
            </a>
            <a
              className="hover:text-bookwishes"
              href="https://github.com/yohni"
            >
              <RiGithubFill size={28} />
            </a>
            <a
              className="hover:text-bookwishes"
              href="mailto:yohni.123@gmail.com"
            >
              <RiMailFill size={28} />
            </a>
          </div>
        </div>
      </footer>
      <div className="text-center w-full text-sm opacity-30 py-2">
        © Copyright 2020 Yohni
      </div>
    </div>
  );
};

export default Footer;
