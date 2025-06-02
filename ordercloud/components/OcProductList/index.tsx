import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import useOcProductList from '../../hooks/useOcProductList'
import { OcProductListOptions } from '../../redux/ocProductList'
import Link from 'next/dist/client/link'
import ImageHelper from '../../../helper/Image'
import formatPrice from '../../utils/formatPrice'

interface ProductCardProps {
  product: BuyerProduct
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <div className="h-full flex flex-col relative p-4 shadow-lg">
      <div className="flex justify-between">
        <ImageHelper
          url={
            'https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/naked-bike/ktm-390-duke/logo/ktm-logo.png?h=54&iar=0&w=60&hash=1F0B91F394A4587739C6C405AA60829B'
          }
          className="w-auto h-full"
        />
        <div className="font-bold uppercase bg-primary h-[45px] text-white flex items-center relative  right-0 w-fit px-5 before:absolute before:top-0 before:-left-[22px] before:border-before before:border-beforeColor  after:absolute after:rounded-full after:border-4 after:!border-white after:left-0">
          <p>New</p>
        </div>
      </div>
      <div className="card flex flex-col h-full">
        <ImageHelper
          url={product?.xp?.Images?.[0]?.Url}
          alt={product?.Name}
          pictureClasses="h-full"
        />
        <div className="productInfo mt-1">
          <p className="text-2xl font-bold">{product.Name}</p>
          <p className="text-primary text-2xl font-bold">
            {formatPrice(product?.PriceSchedule?.PriceBreaks?.[0]?.Price)}
          </p>
          <div className="flex gap-4 mt-8">
            <div className="border-r-[1px] border-grey-400 w-full ">
              <p className="font-bold text-lg">Engine Capacity</p>
              <p className="text-xs">{product?.xp?.['Engine Displacement']}</p>
            </div>
            <div className="border-r-[1px] border-grey-400 w-full">
              <p className="font-bold text-lg">Max Power</p>
              <p className="text-xs">{product?.xp?.['PowerPS']}</p>
            </div>
            <div className="w-full">
              <p className="font-bold text-lg">Max Torque</p>
              <p className="text-xs">{product?.xp?.['MAX Torque']}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-12">
          <Link
            href={`/${product.ID}`}
            className="py-1 w-full border-2 uppercase border-primary text-primary text-lg font-bold flex items-center justify-center"
          >
            Explore
          </Link>
          <Link
            href={`/bikes/DjYPUqLT0EqPOFLo19zlrA/${product?.ID}/booking`}
            className="py-1 w-full uppercase  text-white bg-primary text-lg font-bold flex items-center justify-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export interface OcProductListProps {
  options?: OcProductListOptions
  renderItem?: (product: BuyerProduct) => JSX.Element
}

const OcProductList: FunctionComponent<OcProductListProps> = ({ options }) => {
  const products = useOcProductList(options)

  return (
    <>
      {products && (
        <div className="pt-10 grid gap-3 container mx-auto md:grid-cols-2 lg:grid-cols-3 items-stretch ">
          {products &&
            products.map((product) => <ProductCard key={product.ID} product={product} />)}
        </div>
      )}

      {!products && (
        <div className=" bg-stone-100 text-center p-4 ">
          <p>No listed products found!</p>
        </div>
      )}
    </>
  )
}

export default OcProductList
