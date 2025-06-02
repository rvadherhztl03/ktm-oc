import { FunctionComponent } from 'react'
import { LineItem } from 'ordercloud-javascript-sdk'
import { Trash2 } from 'lucide-react'
import ImageHelper from '../../../helper/Image'
import Link from 'next/link'

interface OcLineItemCardProps {
  lineItem: LineItem
  editable?: boolean
  onQuantityChange?: (quantity: number) => void
  onRemove?: () => void
}

const OcLineItemCard: FunctionComponent<OcLineItemCardProps> = ({
  lineItem,
  editable,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/bikes/DjYPUqLT0EqPOFLo19zlrA/${lineItem.Product?.ID}`}>
        <div className="relative h-32 w-32 sm:h-24 sm:w-24 flex-shrink-0">
          <ImageHelper
            url={lineItem.Product?.xp?.Images?.[0]?.Url || '/images/placeholder.jpg'}
            alt={lineItem.Product?.Name || 'Product image'}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </Link>

      <div className="flex-grow w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
              {lineItem.Product?.Name}
            </h3>
            <p className="text-gray-500 text-sm mb-2 line-clamp-2">
              {lineItem.Product?.Description}
            </p>
          </div>
          <div className="text-primary font-bold text-xl">₹{1999}</div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Quantity:</span>
              <div className="px-3 py-1.5 bg-gray-50 rounded-md text-gray-700 font-medium">
                {lineItem.Quantity}
              </div>
            </div>
          </div>

          {editable && (
            <button
              onClick={onRemove}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OcLineItemCard
