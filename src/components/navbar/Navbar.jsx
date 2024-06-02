"use client";
import { League_Gothic } from "next/font/google";
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { useState } from 'react';
import { useRouter } from 'next/router';
import './navbar.css'

const leagueGothic = League_Gothic({
  weights: [400],
  styles: ['normal'],
  subsets: ['latin'],
});

export const Navbar = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const user = useUser();

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
      <input
        className="input"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {user.isSignedIn
        ? <UserButton style={{ fontSize: '2em' }} />
        : <div className="sign">
          <Link href='/sign-in' className="link">SING IN</Link>
          <Link href='/sign-up' className="link">SIGN UP</Link>
        </div>}
    </div>
  )
}
