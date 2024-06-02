import Link from 'next/link';
import Image from 'next/image'
import './not-found.css'

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="central-body">
                <Image className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width={300} height={300} alt="404 image" />
                <Link href="/" className="btn-go-home">GO BACK HOME</Link>
            </div>
            <div className="objects">
                <Image className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width={40} height={40} alt="404 image" />
                <div className="earth-moon">
                    <Image className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width={100} height={100} alt="404 image" />
                    <Image className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width={80} height={80} alt="404 image" />
                </div>
                <div className="box_astronaut">
                    <Image className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width={140} height={300} alt="404 image" />
                </div>
            </div>
            <div className="glowing_stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>
        </div>
    )
}

export default NotFound;