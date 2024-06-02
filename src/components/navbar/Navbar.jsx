"use client";
import { League_Gothic } from "next/font/google";
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './navbar.css'

const leagueGothic = League_Gothic({
  variants: [
    {
      weight: '400',
      style: 'normal',
    },
  ],
  subsets: ['latin'],
});

export const Navbar = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search/${inputValue}`);
    }
  };

  return (
    <div className='navbar'>
      <Link href='/' className={leagueGothic.className}>GameKeeper</Link>
      <div className="input-container">
        <input
          className="input"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ flexGrow: 1 }}
        />
        <div className="user-clerk">
          {isSignedIn && <UserButton />}
        </div>

      </div>
      {!isSignedIn && (
        <div className="sign">
          <Link href='/sign-in' className="link">SING IN</Link>
          <Link href='/sign-up' className="link">SIGN UP</Link>
        </div>
      )}
    </div>
  )
}