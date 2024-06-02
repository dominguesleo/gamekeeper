import Image from 'next/image'
import Link from 'next/link'
import { ButtonCard } from '@/components/button/ButtonCard'
import './cardbasic.css'

export const CardBasic = ({data, baseUrl}) => {

    return (
        <div className="card-basic-container">
            <div className="card-basic" >
                <div className="front-content">
                    <div className='img'>
                        {data.image_background && <Image src={data.image_background} alt={`${data.name} image`} width={500} height={300} />}
                    </div>
                    <div className='info'>
                        <div className='top'>
                            <span>Games count: {data.games_count ? data.games_count : "No data"}</span>
                        </div>
                        <h3>{data.name && data.name}</h3>
                    </div>
                </div>
                <div className="content">
                    <div className='stats'>
                        <span>Games</span>
                        {data.games && (
                            <div className='result'>
                                {data.games.map((game) => (
                                    <Link key={game.id} href={`/games/${game.id}`}>{game.name}</Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='button'>
                        <ButtonCard url={`/${baseUrl}/${data.id}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}