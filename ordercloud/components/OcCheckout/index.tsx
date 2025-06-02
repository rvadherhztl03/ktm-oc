import { FunctionComponent } from 'react'
// import { OcCurrentOrderState } from '../../redux/ocCurrentOrder'
// import OcCheckoutBilling from './OcCheckoutBilling'
// import OcCheckoutPayment from './OcCheckoutPayment'
import OcCheckoutReview from './OcCheckoutReview'
import { useRouter } from 'next/router'
// import OcCheckoutShipping from './OcCheckoutShipping'
// import OcCheckoutSummary from './OcCheckoutSummary'

export interface OcCheckoutStepProps {
  onNext?: () => void
  onPrev?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OcCheckout: FunctionComponent<{ onSubmitted: any; setCheckoutStep?: any }> = ({
  setCheckoutStep,
}) => {
  const { push } = useRouter()

  const handleNextClick = () => {
    setCheckoutStep((s) => s + 1)
  }

  const handleOrderSubmitted = (orderId: string) => {
    push(`/confirmation/${orderId}`)
  }

  return (
    <div className="w-full">
      <OcCheckoutReview onNext={handleNextClick} onOrderSubmitted={handleOrderSubmitted} />
    </div>
  )
}

export default OcCheckout
