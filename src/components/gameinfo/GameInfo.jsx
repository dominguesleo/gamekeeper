import Link from 'next/link'
import { formattedDate } from '@/utils/date/formattedDate'
import './gameinfo.css'

export const GameInfo = ({ data }) => {
    return (
        <div className='game-info-divisor'>
            <div className='game-info-container'>
                {data.metacritic && (
                    <div className='game-info-contain'>
                        <h5>Metascore:</h5>
                        <span>{data.metacritic}</span>
                    </div>
                )}
                {data.released && (
                    <div className='game-info-contain'>
                        <h5>Release date:</h5>
                        <span>{formattedDate(data.released)}</span>
                    </div>
                )}
                {data.updated && (
                    <div className='game-info-contain'>
                        <h5>Last updated:</h5>
                        <span>{formattedDate(data.updated)}</span>
                    </div>
                )}
                {data.playtime > 0 && (
                    <div className='game-info-contain'>
                        <h5>Playtime:</h5>
                        <span>{data.playtime} {data.playtime > 1 ? 'hours' : 'hour'}</span>
                    </div>
                )}
                {data.esrb_rating && (
                    <div className='game-info-contain'>
                        <h5>ESRB rating:</h5>
                        <span>{data.esrb_rating.name}</span>
                    </div>
                )}
            </div>
            <div className='game-info-container'>
                {data.platforms && (
                    <div className='game-info-contain'>
                        <h5>Platforms:</h5>
                        {data.platforms.map((data, index, array) => (
                            <span key={data.platform.id}>
                                <Link href={`/platforms/${data.platform.id}`}>{data.platform.name}</Link>
                                {index < array.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                )}
                {data.genres && (
                    <div className='game-info-contain'>
                        <h5>Genres:</h5>
                        {data.genres.map((data, index, array) => (
                            <span key={data.id}>
                                <Link href={`/genres/${data.slug}`}>{data.name}</Link>
                                {index < array.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                )}
                {data.developers != "" && (
                    <div className='game-info-contain'>
                        <h5>Developers:</h5>
                        {data.developers.map((data, index, array) => (
                            <span key={data.id}>
                                <Link href="/" className='disabled-link'>{data.name}</Link>
                                {index < array.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                )}
                {data.publishers != "" && (
                    <div className='game-info-contain'>
                        <h5>Publishers:</h5>
                        {data.publishers.map((data, index, array) => (
                            <span key={data.id}>
                                <Link href="/" className='disabled-link'>{data.name}</Link>
                                {index < array.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                )}
                {data.website && (
                    <div className='game-info-contain'>
                        <h5><Link href={data.website} target='blank'>Website</Link></h5>
                    </div>
                )}
            </div>
        </div>
    )
}
