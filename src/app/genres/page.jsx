"use client"
import { useEffect, useState } from 'react';
import { CardBasic } from "@/components/card/CardBasic";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import { ButtonClassic } from '@/components/button/ButtonClassic';

async function getGenres(page, retries = 5) {
    try {
        const response = await fetch(`https://api.rawg.io/api/genres?page=${page}&key=a359d27af5fc427c87fb3af6dd0b91b4`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getGenres(page, retries - 1);
        } else {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
}

export default function Home() {
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await getGenres(page);
            setGenres(oldGenres => {
                const newGenres = data.results.filter(newGenre => !oldGenres.some(newGenre => newGenre.id === newGenre.id));
                return [...oldGenres, ...newGenres];
            });
            setNext(data.next);
        };
        fetchGenres();
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
                    <h1 className='page-tittle'>Genres</h1>
                    <div className="data-container">
                        {genres.map((game) => {
                            return <CardBasic key={game.id} data={game} baseUrl="genres"/>;
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