"use client"
import { useEffect, useState } from 'react';
import { Card } from "@/components/card/Card";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import {ButtonClassic} from '@/components/button/ButtonClassic';

async function getGamesLast30Days(page, retries = 5) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    try {
        const response = await fetch(`https://api.rawg.io/api/games?page=${page}&key=a359d27af5fc427c87fb3af6dd0b91b4&dates=${startDate.toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit'})},${endDate.toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit'})}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getGamesLast30Days(page, retries - 1);
        } else {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
}

export default function Home() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const data = await getGamesLast30Days(page);
            setGames(oldGames => {
                const newGames = data.results.filter(newGame => !oldGames.some(oldGame => oldGame.id === newGame.id));
                return [...oldGames, ...newGames];
            });
            setNext(data.next);
        };
        fetchGames();
    }, [page]);

    return (
        <>
        <header>
            <Navbar />
        </header>
        <main>
            <aside>
                <Aside />
            </aside>
            <section>
            <h1 className='page-tittle'>Best of the year</h1>
            <div className="data-container">
                {games.map((game) => {
                    return <Card key={game.id} game={game} baseUrl="games"/>;
                })}
            </div>
            <div className='next-button'>
                <ButtonClassic onClick={() => setPage(oldPage => oldPage + 1)} disabled={!next}>
                    Load more
                </ButtonClassic>
            </div>
            </section>
        </main>
    </>
    );
}