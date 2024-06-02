import Image from 'next/image'
import './gamerating.css'

export const GameRating = ({ rating }) => {

    const ratingPercent = {
        exceptional: rating.find((item) => item.title === 'exceptional')?.percent,
        recommended: rating.find((item) => item.title === 'recommended')?.percent,
        meh: rating.find((item) => item.title === 'meh')?.percent,
        skip: rating.find((item) => item.title === 'skip')?.percent
    }

    const ratingSumPercent = {
        exceptional: (ratingPercent.exceptional ?? 0),
        recommended: (ratingPercent.exceptional ?? 0) + (ratingPercent.recommended ?? 0),
        meh: (ratingPercent.exceptional ?? 0) + (ratingPercent.recommended ?? 0) + (ratingPercent.meh ?? 0),
        skip: (ratingPercent.exceptional ?? 0) + (ratingPercent.recommended ?? 0) + (ratingPercent.meh ?? 0) + (ratingPercent.skip ?? 0)
    }

    const maxPercentObject = rating.reduce((max, obj) => obj.percent > max.percent ? obj : max, rating[0]);

    return (
        <div>
            {rating.length > 0 && (
                <div className='majorRating'>
                    {maxPercentObject
                        ? <div>
                            <h3>{maxPercentObject.title.charAt(0).toUpperCase() + maxPercentObject.title.slice(1)}</h3>
                            <Image src={`/icons/rating/${maxPercentObject.title}.png`} alt='skipIcon' width={30} height={30} />
                        </div>
                        : "No Rating data"}
                </div>
            )}
            <div className='game-rating'>
                {rating.length > 0 && (
                    <>
                        <div className='overlayDiv skip' style={{ width: `100%` }}>
                            {ratingPercent.skip > 6 && <Image src='/icons/rating/skip.png' alt='skipIcon' width={35} height={35} />}
                        </div>
                        <div className='overlayDiv meh' style={{ width: `${ratingSumPercent.meh}%` }}>
                            {ratingPercent.meh > 6 && <Image src='/icons/rating/meh.png' alt='mehIcon' width={35} height={35} />}
                        </div>
                        <div className='overlayDiv recommended' style={{ width: `${ratingSumPercent.recommended}%` }}>
                            {ratingPercent.recommended > 6 && <Image src='/icons/rating/recommended.png' alt='recommendedIcon' width={35} height={35} />}
                        </div>
                        <div className='overlayDiv exceptional' style={{ width: `${ratingSumPercent.exceptional}%` }}>
                            {ratingPercent.exceptional > 6 && <Image src='/icons/rating/exceptional.png' alt='exceptionalIcon' width={35} height={35} />}
                        </div>
                    </>
                )}
            </div>
            <div className='game-rating-info'>
                <div className='rating-info-container'>
                    <div className='rating-color color-exceptional'></div>
                    <span>Exceptional</span>
                </div>
                <div className='rating-info-container'>
                    <div className='rating-color color-recommended'></div>
                    <span>Recommended</span>
                </div>
                <div className='rating-info-container'>
                    <div className='rating-color color-meh'></div>
                    <span>Meh</span>
                </div>
                <div className='rating-info-container'>
                    <div className='rating-color color-skip'></div>
                    <span>Skip</span>
                </div>
            </div>
        </div>
    )
}

