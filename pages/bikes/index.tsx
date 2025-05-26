import { FunctionComponent } from 'react'
import ClientOnly from '../../helper/ClientOnly'
import OcProductList from '../../ordercloud/components/OcProductList'
import { BuyerProduct } from 'ordercloud-javascript-sdk'
import Link from 'next/link'
import OcProductCard from '../../ordercloud/components/OcProductCard'
import { useRouter } from 'next/router'

const ProductListPage: FunctionComponent = () => {
  const handleRenderItem = (p: BuyerProduct) => {
    const router = useRouter()
    const { category } = router.query
    return (
      <Link href={`/${category}/${p.ID}`}>
        <OcProductCard product={p} />
      </Link>
    )
  }
  return (
    <ClientOnly>
      <div className="productBackgroundWrapper container mx-auto ">
        <div className="mt-12">
          <h1 className="text-[49px] lg:text-[70px] font-bold">EXPLORE KTM ALL BIKES COLLECTION</h1>
          <p className="font-semibold">
            KTM bikes are known for their high-performance, rugged design, and advanced technology.
            Built for both street and off-road adventures, KTM motorcycles offer powerful engined,
            sharp handling, and a distinctive style, making them a top choice for racing enthusiasts
            and thrill-seekers worldwide.
          </p>
        </div>
        <OcProductList
          options={{
            catalogID: 'KTM_Catalog',
          }}
          renderItem={handleRenderItem}
        />
      </div>
    </ClientOnly>
  )
}

export default ProductListPage
