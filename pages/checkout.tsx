import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcCheckout from '../ordercloud/components/OcCheckout'
// import OcCheckoutSummary from '../ordercloud/components/OcCheckout/OcCheckoutSummary'
// import OcLineItemList from '../ordercloud/components/OcLineItemList'
import { useOcSelector } from '../ordercloud/redux/ocStore'

const CheckoutPage: FunctionComponent = () => {
  const { push } = useRouter()
  const { initialized } = useOcSelector((s) => s.ocCurrentOrder)

  return initialized ? (
    <div className="container mx-auto flex flex-col flex-col-reverse gap-10 lg:flex-row  w-full checkout">
      <OcCheckout onSubmitted={(orderId: string) => push(`/confirmation/${orderId}`)} />
    </div>
  ) : null
}

export default CheckoutPage
