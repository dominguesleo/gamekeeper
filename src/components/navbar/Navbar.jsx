"use client";
import { League_Gothic } from "next/font/google";
import Link from 'next/link'
import {UserButton, useUser} from '@clerk/nextjs'
import './Navbar.css'

const leagueGothic = League_Gothic({
  weights: [400],
  styles: ['normal'],
  subsets: ['latin'],
});

export const Navbar = () => {

  const user = useUser();

  return (
    <div className='navbar'>
      <Link href='/' className={leagueGothic.className}>GameKeeper</Link>
      <input className="input" placeholder="Search" />
        { user.isSignedIn
        ? <UserButton style={{ fontSize: '2em' }}/>
        : <div className="sign">
        <Link href='/sign-in' className="link">SING IN</Link>
        <Link href='/sign-up' className="link">SIGN UP</Link>
      </div>}
    </div>
  )
}
