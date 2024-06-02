"use client"
import { useEffect, useState } from 'react';
import { Card } from "@/components/card/Card";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import {ButtonClassic} from '@/components/button/ButtonClassic';

async function getAllTimeTop(page, retries = 5) {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?page=${page}&key=a359d27af5fc427c87fb3af6dd0b91b4&ordering=-rating`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getAllTimeTop(page, retries - 1);
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
            const data = await getAllTimeTop(page);
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
            <h1 className='page-tittle'>All time top 250</h1>
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