import React from 'react';
import Image from 'next/image'
import { formattedDate } from '@/utils/date/formattedDate'
import { getPlatformIcon } from '@/utils/icons/platformIconUtils'
import { getStoreIcon } from '@/utils/icons/storeIconUtils'
import { ButtonCard } from '@/components/button/ButtonCard'
import './card.css'

export const Card = ({ game, baseUrl }) => {

    return (
        <div className="card-container">
            <div className="card" >
                <div className="front-content">
                    <div className='img'>
                        {game.background_image && <Image src={game.background_image} alt={`${game.name} image`} width={500} height={300} />}
                    </div>
                    <div className='info'>
                        <div className='top'>
                            {game.platforms && (
                                <div className='cardIcons'>
                                    {game.parent_platforms.map((platform, index) => (
                                        <React.Fragment key={index}>
                                            {getPlatformIcon(platform.platform.name)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                            <span>{game.released && formattedDate(game.released)}</span>
                        </div>
                        <h3>{game.name && game.name}</h3>
                    </div>
                </div>
                <div className="content">
                    <div className='stats'>
                        <span>Genres:</span>
                        {game.genres && game.genres.length > 0 && (
                            <div className='result'>
                                {game.genres.slice(0, -1).map((genre) => (
                                    <span key={genre.id}>{genre.name}, </span>
                                ))}
                                <span>{game.genres.slice(-1)[0].name}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='stats'>
                        <span>Playtime:</span>
                        {game.playtime > 0 && (
                            <div className='result'>
                                <span>{game.playtime} {game.playtime > 1 ? 'hours' : 'hour'}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='stats'>
                        <span>Metacritic:</span>
                        {game.metacritic && (
                            <div className='result'>
                                <span>{game.metacritic} {game.metacritic > 1 ? 'points' : 'point'}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='stats'>
                        <span>Where to buy:</span>
                        {game.stores && (
                            <div className='result'>
                                <div className='cardIcons'>
                                    {game.stores.map((store) => (getStoreIcon(store.store.name)))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='button'>
                        <ButtonCard url={`/${baseUrl}/${game.id}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}