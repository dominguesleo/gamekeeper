"use client"
import { useEffect, useState } from 'react';
import { CardBasic } from "@/components/card/CardBasic";
import { Navbar } from "@/components/navbar/Navbar";
import { Aside } from "@/components/aside/Aside";
import { ButtonClassic } from '@/components/button/ButtonClassic';

async function getPlatforms(page, retries = 10) {
    try {
        const response = await fetch(`https://api.rawg.io/api/platforms?page=${page}&page_size=80&key=${process.env.NEXT_PUBLIC_RAWG_TOKEN}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return getPlatforms(page, retries - 1);
        } else {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
}

export default function Home() {
    const [platforms, setPlatforms] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(null);

    useEffect(() => {
        const fetchPlatforms = async () => {
            const data = await getPlatforms(page);
            setPlatforms(oldPlatforms => {
                const newPlatforms = data.results.filter(newPlatform => !oldPlatforms.some(newPlatform => newPlatform.id === newPlatform.id));
                return [...oldPlatforms, ...newPlatforms];
            });
            setNext(data.next);
        };
        fetchPlatforms();
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
                    <h1 className='page-tittle'>Platforms</h1>
                    <div className="data-container">
                        {platforms.map((game) => {
                            return <CardBasic key={game.id} data={game} baseUrl="platforms"/>;
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