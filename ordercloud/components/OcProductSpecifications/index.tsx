import { FunctionComponent } from 'react'

interface ProductSpecificationsProps {
  product: {
    Name: string
    xp?: {
      'Engine Displacement'?: string
      'Engine Type'?: string
      PowerPS?: string
      'MAX Torque'?: string
    }
  }
}

const OcProductSpecifications: FunctionComponent<ProductSpecificationsProps> = ({ product }) => {
  return (
    <div className="specWrapper md:col-span-5  z-20">
      {/* Specifications Section */}
      <div className="bg-[#f37021]/80 py-20">
        <h2 className="text-3xl lg:text-[72px] uppercase text-center font-bold text-white">
          Specifications
        </h2>
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center">
            <div className="text-lg text-black/80 font-medium mb-2">Engine Displacement</div>
            <div className="text-4xl md:text-5xl font-bold text-white">
              {product.xp?.['Engine Displacement']}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg text-black/80 font-medium mb-2">Engine Type</div>
            <div className="text-2xl md:text-3xl font-bold text-white uppercase">
              {product.xp?.['Engine Type']?.split(',')[0]}
            </div>
            <div className="text-base text-white">
              {product.xp?.['Engine Type']
                ?.replace(product.xp?.['Engine Type']?.split(',')[0] + ',', '')
                .trim()}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg text-black/80 font-medium mb-2">Power (PS)</div>
            <div className="text-4xl md:text-5xl font-bold text-white">
              {product.xp?.['PowerPS']?.split('@')[0]?.trim()}
            </div>
            <div className="text-base text-white">
              @ {product.xp?.['PowerPS']?.split('@')[1]?.trim()}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg text-black/80 font-medium mb-2">Torque</div>
            <div className="text-4xl md:text-5xl font-bold text-white">
              {product.xp?.['MAX Torque']?.split('@')[0]?.trim()}
            </div>
            <div className="text-base text-white">
              @ {product.xp?.['MAX Torque']?.split('@')[1]?.trim()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OcProductSpecifications
