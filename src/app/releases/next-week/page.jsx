"use client"
import { useEffect, useState } from 'react';
import { Card } from "@/components/card/Card";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import {ButtonClassic} from '@/components/button/ButtonClassic';

async function getGamesNextWeek(page, retries = 10) {
    const nextWeekStart = new Date();
    nextWeekStart.setDate(nextWeekStart.getDate() + (8 - nextWeekStart.getDay())); // Lunes de la próxima semana
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 6); // Domingo de la próxima semana
    try {
        const response = await fetch(`https://api.rawg.io/api/games?page=${page}&key=${process.env.NEXT_PUBLIC_RAWG_TOKEN}&dates=${nextWeekStart.toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit'})},${nextWeekEnd.toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit'})}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getGamesNextWeek(page, retries - 1);
        } else {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
}

export default function NextWeekPage() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const data = await getGamesNextWeek(page);
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
            <h1 className='page-tittle'>Next week</h1>
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