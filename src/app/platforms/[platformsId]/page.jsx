"use client"
import { useEffect, useState } from 'react';
import { Card } from "@/components/card/Card";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import { ButtonClassic } from '@/components/button/ButtonClassic';

async function getPlatformGames(page, platformsId, retries = 10) {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?page=${page}&platforms=${platformsId}&key=${process.env.NEXT_PUBLIC_RAWG_TOKEN}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getPlatformGames(page, retries - 1);
        } else {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
}

async function getPlatformName(platformsId, retries = 10) {
    try {
        const response = await fetch(`https://api.rawg.io/api/platforms/${platformsId}?key=${process.env.NEXT_PUBLIC_RAWG_TOKEN}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getPlatformName(platformsId, retries - 1);
        } else {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
}

export default function PlatformsGamesPage({ params }) {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(null);
    const [platform, setPlatform] = useState({});

    useEffect(() => {
        const fetchPlatformName = async () => {
            const data = await getPlatformName(params.platformsId);
            setPlatform(data);
        };
        fetchPlatformName();
    }, []);

    useEffect(() => {
        const fetchGames = async () => {
            const data = await getPlatformGames(page, params.platformsId);
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
                    <h1 className='page-tittle'>{platform.name}</h1>
                    <div className="data-container">
                        {games.map((game) => {
                            return <Card key={game.id} game={game} baseUrl="games" />;
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