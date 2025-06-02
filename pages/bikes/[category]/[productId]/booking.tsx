// pages/products/[productId]/booking.js
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Me } from 'ordercloud-javascript-sdk'
import useOcProductDetail from '../../../../ordercloud/hooks/useOcProductDetail'
import ImageHelper from '../../../../helper/Image'
import formatPrice from '../../../../ordercloud/utils/formatPrice'
import useOcCart from '../../../../ordercloud/redux/useOcCart'

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  email: Yup.string().email().required('Email is required'),
  location: Yup.string().required('Location is required'),
  dealer: Yup.string().required('Please select a dealer'),
})

export default function ProductBookingPage() {
  const router = useRouter()
  const { productId } = router.query
  const { product, specs } = useOcProductDetail(productId as string)
  const [isBooked, setIsBooked] = useState(false)
  const { addToCart } = useOcCart()
  const [variants, setVariants] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  const [dealers, setDealers] = useState<string[]>([''])

  useEffect(() => {
    const getVariants = async () => {
      const res = await Me.ListVariants(product?.ID)
      setVariants(res?.Items)
    }
    if (product?.ID) getVariants()
  }, [product?.ID])

  useEffect(() => {
    // Set first color from specs as default if available
    if (specs?.[0]?.Options?.[0]) {
      const firstColor = specs[0].Options[0]
      setSelectedColor(firstColor.Value)
      setCurrentImage(firstColor.xp?.Images?.[0]?.Url)
    }
  }, [specs])

  const handleColorChange = (colorData) => {
    setSelectedColor(colorData.Value)
    setCurrentImage(colorData.xp?.Images?.[0]?.Url)
  }

  // Mock data - replace with your actual data
  useEffect(() => {
    const getDealers = async () => {
      const res = await Me.ListBuyerSellers()
      setDealers(res?.Items?.map((x) => x?.Name))
    }
    if (product?.ID) getDealers()
  }, [product?.ID])

  const handleSubmit = async (values, { setSubmitting }) => {
    localStorage.setItem('userEmail', values.email)
    setSubmitting(true)
    try {
      const xp = { ...values, selectedColor: selectedColor }
      await addToCart({ productId: product?.ID, quantity: 1, specs: variants?.[0]?.Specs, xp: xp })
      router.push(`/checkout`)
      // router.push(`/checkout`)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!product) return null

  return (
    <div className="mx-auto min-h-screen">
      {/* Header and Product Image Section */}
      <div className="flex flex-col lg:flex-row  justify-between h-full relative">
        {/* Product Image */}
        <div className="pt-[90px] h-full flex flex-col  items-center w-full gap-10 bg-[#f7f7f7] w-full lg:min-h-screen">
          <h2 className="text-3xl font-bold">{product?.Name}</h2>
          <ImageHelper url={currentImage} className="max-w-[600px] h-auto" />
        </div>

        {/* Right Column Section - Conditionally Rendered */}
        <div className="pt-[90px] space-y-6 w-full lg:w-1/2">
          {!isBooked ? (
            <>
              <div className="px-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-700">SELECT COLOR</h3>
                  <div className="flex items-center gap-4">
                    {specs?.[0]?.Options?.map((colorData, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 rounded-full flex justify-center items-center border-2  cursor-pointer ${
                          selectedColor === colorData.Value
                            ? 'border-primary' // Highlight with blue border when selected
                            : 'border-gray-500'
                        }`}
                        style={{ backgroundColor: colorData.xp?.hexcode }}
                        onClick={() => handleColorChange(colorData)}
                      >
                        {selectedColor === colorData.Value && (
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox=" 22 22"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  {selectedColor && <p className="text-sm text-gray-600 mt-2">{selectedColor}</p>}
                </div>

                {/* Pure Facts Section */}
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-700">Pure Facts</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {product?.xp?.Facts?.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking Details and Price Section */}
              <div className="lg:fixed lg:right-0 lg:bottom-0 lg:w-1/3 animate-slide-up ">
                <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="text-xl font-bold text-gray-800 flex flex-col">
                    <p className="text-sm font-normal text-gray-600">*Ex-showroom price - </p>
                    {formatPrice(product?.PriceSchedule?.PriceBreaks?.[0]?.Price)}
                    <span className="text-primary cursor-pointer">New Delhi</span>{' '}
                  </div>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setIsBooked(true)}
                      className="bg-primary text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
                    >
                      BOOK NOW @ ₹ 1999
                    </button>
                    <p className="text-green-700 font-bold text-center">Fully Refundable</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-4">
              <h2 className="text-2xl font-bold">FILL YOUR DETAILS BELOW</h2>
              <Formik
                initialValues={{
                  name: '',
                  mobile: '',
                  location: '',
                  dealer: '',
                  email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="pb-6 mt-10 lg:w-2/3  ">
                    {/* Name Input */}
                    <div className="mt-3">
                      <label htmlFor="name" className="text-md font-bold">
                        Enter name
                      </label>
                      <div className="relative mt-2">
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full text-sm p-2 py-3 pl-4 border-0 border-[1px] border-black  focus:ring-0 rounded-none"
                          placeholder="Enter name"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Mobile Number Input */}
                    <div className="mt-3">
                      <label htmlFor="mobile" className="text-md font-bold">
                        Enter mobile number
                      </label>
                      <div className="relative mt-2">
                        <Field
                          type="number"
                          id="mobile"
                          name="mobile"
                          className="w-full text-sm p-2 py-3 pl-4 border-0 border-[1px] border-black  focus:ring-0 rounded-none"
                          placeholder="Enter mobile number"
                        />
                      </div>
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="mt-3">
                      <label htmlFor="mobile" className="text-md font-bold">
                        Enter email address
                      </label>
                      <div className="relative mt-2">
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="w-full text-sm p-2 py-3 pl-4 border-0 border-[1px] border-black  focus:ring-0 rounded-none"
                          placeholder="Enter email address"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Location Input */}
                    <div className="mt-3">
                      <label htmlFor="location" className="text-md font-bold">
                        Enter Area "e.g. Andheri"
                      </label>
                      <div className="relative mt-2">
                        <Field
                          type="text"
                          id="location"
                          name="location"
                          className="w-full text-sm p-2 py-3 pl-4 border-0 border-[1px] border-black  focus:ring-0 rounded-none pr-24"
                          placeholder='Enter Area "e.g. Andheri"'
                        />
                      </div>
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Dealer Select */}
                    <div className="mt-3">
                      <label htmlFor="dealer" className="text-md font-bold">
                        Select Dealer
                      </label>
                      <div className="relative mt-2">
                        <Field
                          as="select"
                          id="dealer"
                          name="dealer"
                          className="w-full text-sm pr-4 py-3 pl-4 border-0 border-[1px] border-black  focus:ring-0 rounded-none"
                        >
                          <option value="">Select Dealer</option>
                          {dealers.map((dealer, index) => (
                            <option key={index} value={dealer}>
                              {dealer}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="dealer"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Verify and Pay Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary my-6 text-white font-bold py-3 rounded-md transition-colors duration-200 disabled:bg-gray-400"
                    >
                      {isSubmitting ? 'PROCESSING...' : 'VERIFY AND PAY'}
                    </button>

                    {/* T&C and Privacy Policy */}
                    <p className="text-center text-sm text-gray-600">
                      By clicking on Verify and Pay, you agree to our{' '}
                      <Link href="#" className="text-primary hover:underline">
                        T&C
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
