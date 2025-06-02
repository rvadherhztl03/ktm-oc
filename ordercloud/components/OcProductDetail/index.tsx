import { FunctionComponent, useEffect, useState } from 'react'
import useOcProductDetail from '../../hooks/useOcProductDetail'
import ImageHelper from '../../../helper/Image'
import OcProductSpecifications from '../OcProductSpecifications'
import FinanceOffers from '../../../components/FinanaceOffer'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { useRouter } from 'next/router'

interface OcProductDetailProps {
  productId: string
  lineItemId?: string
  onLineItemAdded?: () => void
  onLineItemUpdated?: () => void
}

interface ColorOption {
  ID: string
  Value: string
  ListOrder: number
  IsOpenText: boolean
  PriceMarkupType: string
  PriceMarkup: null
  xp: {
    Images: Array<{
      Url: string
    }>
    hexcode: string
  }
}

const OcProductDetail: FunctionComponent<OcProductDetailProps> = ({ productId }) => {
  const { product, specs } = useOcProductDetail(productId)
  const router = useRouter()
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    specs && (specs?.[0].Options?.[0] as ColorOption)
  )

  useEffect(() => {
    if (!selectedColor) {
      setSelectedColor(specs?.[0].Options?.[0] as ColorOption)
    }
  }, [specs])

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color)
  }
  console.log('@@specs', specs)

  // const router = useRouter()

  return product && specs ? (
    <div className="">
      <ImageHelper
        url={product?.xp?.AdditionalImages?.[0]?.BackgroundImage}
        pictureClasses="h-[400px] lg:h-auto"
        className="h-full object-cover"
      />
      {specs && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-4 tracking-wide">
                CHECK ON ROAD PRICE
              </h1>
              <p className="text-xl text-gray-600 font-medium">{product.Name}</p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Bike Image Section */}
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                  <div className="relative h-96 md:h-[400px]">
                    <ImageHelper url={selectedColor?.xp?.Images[0].Url} />
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 tracking-tight">
                    {product.Name}
                  </h2>
                </div>

                {/* Color Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Choose Color</h3>

                  <div className="flex items-center space-x-4">
                    {specs?.[0].Options.map((color) => (
                      <button
                        key={color.ID}
                        onClick={() => handleColorChange(color as ColorOption)}
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
                          selectedColor?.ID === color?.ID
                            ? 'border-blue-500 scale-110 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.xp.hexcode }}
                        aria-label={`Select ${color.Value} color`}
                      />
                    ))}
                  </div>

                  <p className="text-lg font-medium text-gray-600">{selectedColor?.Value}</p>
                </div>

                {/* Price Section */}
                <div className="relative overflow-hidden">
                  <div
                    className="rounded-2xl p-8 text-white relative"
                    style={{
                      background: `linear-gradient(135deg, ${selectedColor?.xp?.hexcode}, ${selectedColor?.xp?.hexcode}dd)`,
                    }}
                  >
                    <div className="relative z-10">
                      <p className="text-lg font-medium opacity-90 mb-2">Starting from</p>
                      <p className="text-4xl md:text-5xl font-black mb-2">
                        ₹ {product?.PriceSchedule?.PriceBreaks?.[0]?.Price}/-*
                      </p>
                      <p className="text-base opacity-80">Ex-showroom price in Delhi</p>
                    </div>

                    {/* Animated background effect */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 -right-4 w-24 h-24 bg-white rounded-full animate-pulse"></div>
                      <div className="absolute bottom-0 -left-4 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <Link
                  href={`${router.asPath}/booking`}
                  className="w-full  block bg-gradient-to-r from-primary to-red-400 text-white font-bold text-xl py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 uppercase tracking-wide"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <FinanceOffers />
      <OcProductSpecifications product={product} />
      {product?.xp?.ImageGallery && product?.xp?.ImageGallery.length > 0 && (
        <div className="imageGallery flex flex-col  bg-[#d9d9d9] pt-10 pl-10 pb-[60px]">
          <h2 className="text-2xl lg:text-[32px] font-bold">{product?.Name} Gallery</h2>
          <div className="mt-8 flex space-x-4 w-full overflow-x-scroll">
            {product.xp.ImageGallery.map((image, index: number) => (
              <div key={index} className="w-[300px] lg:w-[400px]">
                <ImageHelper
                  url={image}
                  className="w-full h-auto"
                  pictureClasses="w-[300px] lg:w-[300px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default OcProductDetail
