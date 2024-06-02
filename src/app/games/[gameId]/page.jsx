import { formattedDate } from '@/utils/date/formattedDate'
import { CarouselGameDetail } from '@/components/carousel/CarouselGameDetail'
import { getPlatformIcon } from '@/utils/icons/platformIconUtils'
import { Card } from "@/components/card/Card";
import { GameStatus } from '@/components/gamestatus/GameStatus'
import { GameRating } from '@/components/gamerating/GameRating'
import { GameBuy } from '@/components/gamebuy/GameBuy'
import { GameInfo } from '@/components/gameinfo/GameInfo'
import './gameid.css'

const DOMPurify = typeof window !== 'undefined' ? require('dompurify')(window) : null;

async function fetchWithRetries(url, retries = 5) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries})`);
            return fetchWithRetries(url, retries - 1);
        } else {
            console.error('Failed to fetch:', error);
            throw error;
        }
    }
}

async function getGameData(id, retries = 5) {
    const apiKey = 'a359d27af5fc427c87fb3af6dd0b91b4';
    const baseUrl = `https://api.rawg.io/api/games/${id}`;

    const gameUrl = `${baseUrl}?key=${apiKey}`;
    const screenshotsUrl = `${baseUrl}/screenshots?key=${apiKey}`;
    const editionsUrl = `${baseUrl}/additions?key=${apiKey}`;
    const sameSeriesUrl = `${baseUrl}/game-series?key=${apiKey}`;

    const [data, img, editions, sameSeries] = await Promise.all([
        fetchWithRetries(gameUrl, retries),
        fetchWithRetries(screenshotsUrl, retries),
        fetchWithRetries(editionsUrl, retries),
        fetchWithRetries(sameSeriesUrl, retries)
    ]);
    return { data, img, editions, sameSeries };
}

export default async function GameDetailPage({ params }) {

    const { data, img, editions, sameSeries } = await getGameData(params.gameId);
    const sanitizedDescription = DOMPurify ? DOMPurify.sanitize(data.description.replace(/\n/g, '<br />')) : data.description.replace(/\n/g, '<br />');

    return (
        <div className='game-details'>
            <div className="game-first-block">
                <div>
                    <div className='game-platform-icon'>
                        {data.parent_platforms && data.parent_platforms.map((platform) => (getPlatformIcon(platform.platform.name)))}
                        {data.released && <span> - {formattedDate(data.released)}</span>}
                    </div>
                    <h1>{data.name}</h1>
                    <GameStatus gameId={data.id}/>
                    <div className='game-details-rating'>
                        <GameRating rating={data.ratings} />
                    </div>
                    {img.results.length > 0 && <CarouselGameDetail img={img.results} />}
                </div>
                <div>
                    <div>
                        <h2>Game Description</h2>
                        <div
                            dangerouslySetInnerHTML={{ __html: sanitizedDescription }} className='game-description'
                        />
                    </div>
                    {data.stores.length > 0 && <GameBuy stores={data.stores} />}
                    <GameInfo data={data} />
                </div>
            </div>
            <div className='game-second-block'>
                {editions.results.length > 0 && (
                    <>
                        <h2>DLC’s and  others Editions</h2>
                        <div className="data-container">
                            {editions.results.map((game) => {
                                return <Card key={game.id} game={game} baseUrl="games" />;
                            })}
                        </div>
                    </>
                )}
            </div>
            <div className='game-third-block'>
                {sameSeries.results.length > 0 && (
                    <>
                        <h2>Games from the same series</h2>
                        <div className="data-container">
                            {sameSeries.results.map((game) => {
                                return <Card key={game.id} game={game} baseUrl="games" />;
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}