import Link from 'next/link'
import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import OcProductCard from '../../../ordercloud/components/OcProductCard'
import ClientOnly from '../../../helper/ClientOnly'
import OcCategoryList from '../../../ordercloud/components/OcCategoryProductList'

const CategoryListPage: FunctionComponent = () => {
  const router = useRouter()
  const { category } = router.query

  const handleRenderItem = (p: BuyerProduct) => {
    return (
      <Link href={`/${category}/${p.ID}`}>
        <OcProductCard product={p} />
      </Link>
    )
  }

  console.log('@@category', category)

  if (!category) {
    return <></>
  }
  return (
    <ClientOnly>
      <div className="productBackgroundWrapper ">
        <OcCategoryList
          options={{
            catalogID: 'KTM_Catalog',
            categoryID: category as string,
          }}
          renderItem={handleRenderItem}
        />
      </div>
    </ClientOnly>
  )
}

export default CategoryListPage
