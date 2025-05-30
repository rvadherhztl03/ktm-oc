import React from 'react'
import ImageHelper from '../helper/Image'

export default function CategoryHero({
  categoryName,
  heading,
}: {
  categoryName?: string
  heading?: string
}) {
  return (
    <div className="categoryHero ">
      <div className="relative">
        <ImageHelper url="https://www.ktmindia.com/-/media/Images/ktm/ktm-bikes/naked-bike/webp-new/spotlight_ktm_listingpage.webp" />
        <div className="absolute bottom-[10%] lg:bottom-[20%] left-[10%] flex flex-col gap-1 lg:gap-4 text-white uppercase">
          <span className="text-lg ">{categoryName || 'KTM RC Supersport'}</span>
          <h2 className={'text-3xl lg:text-[60px]'}>{heading || 'Sport Bikes in India'}</h2>
        </div>
      </div>
      <div className="container mx-auto py-[60px] flex justify-center items-center text-xl text-center">
        {
          "A completely new generation of KTM RC is lining up on the starting grid. With new styling based on KTM's MotoGPTM machines, an all-new chassis with improved ergonomics, and all newelectronics ,the new KTM RC range is truly READY TO RACE."
        }
      </div>
    </div>
  )
}
