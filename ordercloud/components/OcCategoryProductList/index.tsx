import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import useOcProductList from '../../hooks/useOcProductList'
import { OcCategoryListOptions } from '../../redux/ocProductList'
import Link from 'next/dist/client/link'
import ImageHelper from '../../../helper/Image'
import CategoryHero from '../../../components/CategoryHero'

interface ProductCardProps {
  product: BuyerProduct
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <div className="shadow-lg rounded h-full flex flex-col">
      <div className="flex flex-col p-4 pb-0 h-full">
        <div className="flex justify-between">
          <ImageHelper
            url={
              'https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/naked-bike/ktm-390-duke/logo/ktm-logo.png?h=54&iar=0&w=60&hash=1F0B91F394A4587739C6C405AA60829B'
            }
            className="w-auto h-full"
          />
        </div>
        <div className="card flex flex-col h-full">
          <ImageHelper
            url={product?.xp?.Images?.[0]?.Url}
            alt={product?.Name}
            pictureClasses="h-full"
          />
          <div className="productInfo mt-1">
            <p className="text-lg font-bold">{product.Name}</p>

            <div className="flex gap-4 mt-1">
              <div className="border-r-[1px] border-grey-400 w-full ">
                <p className="font-bold text-md">Engine Capacity</p>
                <p className="text-xs">{product?.xp?.['Engine Displacement']}</p>
              </div>
              <div className="border-r-[1px] border-grey-400 w-full">
                <p className="font-bold text-md">Max Power</p>
                <p className="text-xs">{product?.xp?.['PowerPS']}</p>
              </div>
              <div className="w-full">
                <p className="font-bold text-md">Max Torque</p>
                <p className="text-xs">{product?.xp?.['MAX Torque']}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        href={`/${product.ID}`}
        className="py-2 mt-4 w-full bg-primary uppercase border-primary rounded text-white text-lg font-bold flex items-center justify-center"
      >
        Explore
      </Link>
    </div>
  )
}

export interface OcCategoryListProps {
  options?: OcCategoryListOptions & { categoryID?: string }
  renderItem?: (product: BuyerProduct) => JSX.Element
}

const OcCategoryList: FunctionComponent<OcCategoryListProps> = ({ options }) => {
  const products = useOcProductList(options)

  return (
    <>
      {products && (
        <>
          <CategoryHero />
          <div className="shadow-productList h-full pb-[100px]">
            <div className="pt-12 grid gap-3 container mx-auto md:grid-cols-2 lg:grid-cols-3 items-stretch h-full">
              {products &&
                products.map((product) => <ProductCard key={product.ID} product={product} />)}
            </div>
          </div>
        </>
      )}

      {!products && (
        <div className=" bg-stone-100 text-center p-4 ">
          <p>No listed products found!</p>
        </div>
      )}
    </>
  )
}

export default OcCategoryList
