"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './carouselGameDetail.css';


export const CarouselGameDetail = ({img}) => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {img.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image src={image.image} width={image.width} height={image.height} alt="img" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
