import Link from 'next/link'
import { getStoreIcon } from '@/utils/icons/storeIconUtils'
import { ButtonClassic } from '@/components/button/ButtonClassic';
import './gamebuy.css'

export const GameBuy = ({ stores }) => {
    return (
        <div className='game-buy-container'>
            <h5>Where to Buy</h5>
            <div className='game-buy'>
                {stores.map((stores) => (
                    <ButtonClassic key={stores.id}>
                        <Link className='btn-contain' href={`https://${stores.url != "" ? stores.url : stores.store.domain}`} target='_blank'>
                            <span>{stores.store.name}</span>
                            {getStoreIcon(stores.store.name)}
                        </Link>
                    </ButtonClassic>
                ))}
            </div>
        </div>
    )
}
