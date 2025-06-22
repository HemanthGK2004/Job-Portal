import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='container flex items-center justify-between gap-4 px-4 py-3 mx-auto mt-20 2xl:px-20'>
        <img 
          className='w-[160px]' 
          src={assets.logo} 
          alt="Hemanthgk2004 logo"
        />
        <p className='flex-1 pl-4 text-sm text-gray-500 border-l border-gray-400 max-sm:hidden'>
          Copyright @Hemanthgk2004 | All rights reserved.
        </p>
        <div className='flex items-center gap-5'>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img 
                  className='w-[38px]' 
                  src={assets.facebook_icon} 
                  alt="Facebook icon" 
                />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img 
                  className='w-[38px]' 
                  src={assets.twitter_icon} 
                  alt="Twitter icon" 
                />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img 
                  className='w-[38px]' 
                  src={assets.instagram_icon} 
                  alt="Instagram icon" 
                />
            </a>
        </div>
    </div>
  );
}

export default Footer;
