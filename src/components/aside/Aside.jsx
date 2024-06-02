"use client";
import Link from 'next/link';
import {useUser} from '@clerk/nextjs'
import './aside.css';

export const Aside = () => {
  const user = useUser();
  return (
    <>
      <ul>
        <li key="1"><Link href="/">All Games</Link></li>
        {user.isSignedIn && <li key="2"><Link href="/my-library">My Library</Link></li>}
        <li key="3"><Link href="/" className='disabled-link'>New Releases</Link>
          <ul className='aside-list'>
                <li key="3.1"><Link href="/releases/this-week">This week</Link></li>
                <li key="3.2"><Link href="/releases/next-week">Next week</Link></li>
                <li key="3.3"><Link href="/releases/last-30-days">Last 30 days</Link></li>
          </ul>
        </li>
        <li key="4"><Link href="/" className='disabled-link'>Top</Link>
          <ul className='aside-list'>
                  <li key="4.1"><Link href="/top/best-of-the-year">Best of the year</Link></li>
                  <li key="4.2"><Link href="/top/popular-in-2023">Popular in 2023</Link></li>
                  <li key="4.3"><Link href="/top/all-time-top">All time top 250</Link></li>
          </ul>
        </li>
        <li key="5"><Link href="/platforms">Platforms</Link>
          <ul className='aside-list'>
              <li key="5.1"><Link href="/platforms/4">PC</Link></li>
              <li key="5.2"><Link href="/platforms/187">PlayStation 5</Link></li>
              <li key="5.3"><Link href="/platforms/186">Xbox Series S/X</Link></li>
              <li key="5.4"><Link href="/platforms/7">Nintendo Switch</Link></li>
          </ul>
        </li>
        <li key="6"><Link href="/genres">Genres</Link>
          <ul className='aside-list'>
                <li key="6.1"><Link href="/genres/4">Action</Link></li>
                <li key="6.2"><Link href="/genres/10">Strategy</Link></li>
                <li key="6.3"><Link href="/genres/5">RPG</Link></li>
                <li key="6.4"><Link href="/genres/2">Shooter</Link></li>
                <li key="6.5"><Link href="/genres/3">Adventure</Link></li>
                <li key="6.6"><Link href="/genres/7">Puzzle</Link></li>
                <li key="6.7"><Link href="/genres/1">Racing</Link></li>
                <li key="6.8"><Link href="/genres/15">Sport</Link></li>
          </ul>
        </li>
      </ul>
    </>
  )
}