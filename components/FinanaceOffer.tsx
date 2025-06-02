import React from 'react'
import ImageHelper from '../helper/Image'
import Link from 'next/link'

const FinanceOffers = () => {
  return (
    <div className="relative overflow-hidden w-full items-center ">
      <ImageHelper
        url="https://cdn.bajajauto.com/-/media/images/ktm/ktm-bikes/enduro/ktm-200-duke/loan-banner/loan-web.webp"
        className="hidden md:block"
      />
      <ImageHelper
        url="https://cdn.bajajauto.com/-/media/images/ktm/ktm-bikes/enduro/ktm-200-duke/loan-banner/loan-mob.webp"
        className="md:hidden bg-cover h-full"
        pictureClasses="h-[400px] bg-cover md:hidden"
      />
      {/* Left side - Can be used for additional content if needed */}

      {/* Right side - Content */}
      <div className="absolute left-[10%] md:left-[51%] top-[8%] text-white">
        <ul className="loan-features-list flex flex-col gap-4 mb-8 text-lg">
          <li className="flex gap-3">
            <div className="img-icon-sec">
              <img
                src="https://cdn.bajajauto.com/-/media/images/ktm/ktm-bikes/enduro/ktm-200-duke/loan-banner/icon/tenure.png"
                alt="Vector (2)"
                className="d-block"
                title=""
                height="27"
                width="23"
                loading="lazy"
              />
            </div>
            <div className="loan-icon-description">
              <div className="sub-desc">
                <p className="para-sec">Max tenure: 48 months</p>
              </div>
            </div>{' '}
          </li>
          <li className="flex gap-3">
            <div className="img-icon-sec">
              <img
                src="https://cdn.bajajauto.com/-/media/images/ktm/ktm-bikes/enduro/ktm-200-duke/loan-banner/icon/price.png"
                alt="Vector (5)"
                className="d-block"
                title=""
                height="26"
                width="26"
                loading="lazy"
              />
            </div>
            <div className="loan-icon-description">
              <div className="sub-desc">
                <p className="para-sec">Lowest Processing Fees: 1% or Rs 750 whichever is lowest</p>
              </div>
            </div>{' '}
          </li>
          <li className="flex gap-3">
            <div className="img-icon-sec">
              <img
                src="https://cdn.bajajauto.com/-/media/images/ktm/ktm-bikes/enduro/ktm-200-duke/loan-banner/icon/roi.png"
                alt="Vector (3)"
                className="d-block"
                title=""
                height="26"
                width="23"
                loading="lazy"
              />
            </div>
            <div className="loan-icon-description">
              <div className="sub-desc">
                <p className="para-sec">Lowest ROI: 9.49%</p>
              </div>
            </div>{' '}
          </li>
          <li className="flex gap-3">
            <div className="img-icon-sec">
              <img
                src="https://cdn.bajajauto.com/-/media/images/ktm/ktm-bikes/enduro/ktm-200-duke/loan-banner/icon/emi.png"
                alt="Vector (4)"
                className="d-block"
                title=""
                height="23"
                width="23"
                loading="lazy"
              />
            </div>
            <div className="loan-icon-description">
              <div className="sub-desc">
                <p className="para-sec">EMI: Less than Rs 100 per day</p>
              </div>
            </div>{' '}
          </li>
        </ul>
        <Link
          href="https://availfinance.bajajauto.com/"
          className="bg-[#ff6600] text-white font-bold  py-5 px-8  hover:bg-gray-100 transition duration-300 text-lg"
        >
          CHECK FINANCE OFFERS
        </Link>
      </div>
    </div>
  )
}

export default FinanceOffers
