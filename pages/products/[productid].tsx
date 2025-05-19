import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcProductDetail from '../../ordercloud/components/OcProductDetail'
import { useOcSelector } from '../../ordercloud/redux/ocStore'
import Image from 'next/image'

const ProductPage: FunctionComponent = () => {
  const { isReady, query, push } = useRouter()

  const productName = useOcSelector(
    (s) => s.ocProductDetail.product && s.ocProductDetail.product.Name
  )

  const handleLineItemUpdated = () => {
    push('/cart')
  }

  return (
    <>
      <div className="banner h-screen w-full relative flex items-center justify-center">
        <Image
          src="/images/3503-homepage-web.webp"
          alt="Home page"
          layout="fill"
          className="w-full overflow-hidden object-cover"
          unoptimized
          priority
        />
      </div>
      <div className="productBackgroundWrapper relative h-screen ">
        <Head>
          <title>{productName}</title>
        </Head>
        {isReady ? (
          <OcProductDetail
            onLineItemUpdated={handleLineItemUpdated}
            productId={query.productid as string}
            lineItemId={query.lineitem as string}
          />
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </>
  )
}

export default ProductPage
