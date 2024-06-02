"use client"
import { useEffect, useState } from 'react';
import { Card } from "@/components/card/Card";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import { useUser } from '@clerk/nextjs'
import { GameStatusLibrary } from '@/components/gamestatus/GameStatusLibrary'

export default function Home() {
    const { user, isSignedIn } = useUser();
    const [games, setGames] = useState([]);
    const [gamesId, setGamesId] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All");

    useEffect(() => {
        const fetchGames = async () => {
            if (gamesId && gamesId.length > 0) {
                try {
                    const games = await Promise.all(gamesId.map(async ({ id, status }) => {
                        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_TOKEN}`);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const gameData = await response.json();
                        // Agrega la propiedad status al objeto gameData
                        gameData.status = status;
                        return gameData;
                    }));
                    setGames(games);
                } catch (error) {
                    console.error('Failed to fetch games:', error);
                }
            }
        };
        fetchGames();
    }, [gamesId]);

    useEffect(() => {
        const fetchGamesId = async () => {
            if (user && user.id) {
                try {
                    const response = await fetch(`/api/games?userId=${user.id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const UserGamesId = await response.json();
                    if (UserGamesId) {
                        setGamesId(UserGamesId);
                    }
                } catch (error) {
                    console.error('Failed to fetch game status:', error);
                }
            }
        };
        fetchGamesId();
    }, [user]);

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
                    <h1 className='page-tittle'>My Library</h1>
                    <GameStatusLibrary selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                    <div className="data-container">
                        {games.filter(game => selectedStatus === 'All' || game.status === selectedStatus).map((game) => {
                            return <Card key={game.id} game={game} baseUrl="games" />;
                        })}
                    </div>
                </section>
            </main>
        </>
    );
}