import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import ImageHelper from '../helper/Image'
import { ChevronLeft, Menu, X } from 'lucide-react'
import { useOcSelector } from '../ordercloud/redux/ocStore'
import { BuyerProduct, Category, RequiredDeep } from 'ordercloud-javascript-sdk'
import { ICategoryProductAssignment } from '../types/ordercloud/ICategoryProductAssignment'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModelsMenuOpen, setIsModelsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { categories } = useOcSelector((s) => {
    const entities = s.ocProductCache?.categories.entities || {}
    const ids = s.ocProductCache.categories.ids || []
    const categoryList = ids
      .map((id) => entities[id])
      .filter((category): category is RequiredDeep<Category> => category !== undefined)
    return {
      categories: categoryList,
    }
  })
  const { products } = useOcSelector((s) => {
    const entities = s.ocProductCache?.products.entities || {}
    const ids = s.ocProductCache.products.ids || []
    const productsList = ids
      .map((id) => entities[id])
      .filter((products): products is RequiredDeep<BuyerProduct> => products !== undefined)
    return {
      products: productsList,
    }
  })
  const { categoriesProductAssignment } = useOcSelector((s) => {
    const entities = s.ocProductCache?.categoriesProductAssignment.entities || {}
    const ids = s.ocProductCache.categoriesProductAssignment.ids || []
    const productsList = ids
      .map((id) => entities[id])
      .filter(
        (
          categoriesProductAssignmentList
        ): categoriesProductAssignmentList is RequiredDeep<ICategoryProductAssignment> =>
          products !== undefined
      )
    return {
      categoriesProductAssignment: productsList,
    }
  })

  const navLinks = [
    { label: 'KTM pro-xp', href: 'https://www.ktmindia.com/pro-experience' },
    { label: 'KTM app', href: 'https://www.ktmindia.com/ktmindiaapp' },
    { label: 'Locate Us', href: 'https://www.ktmindia.com/ktmdealerlocator' },
    { label: 'Association', href: 'https://www.ktmindia.com/associations' },
    { label: 'Bike collection', href: '/bikes' },
    { label: 'KTM Blogs', href: 'http://ktmindia.com/blogs' },
    { label: 'KTM Service', href: 'https://www.ktmindia.com/service' },
  ]

  const getProductsForCategory = (categoryId: string) => {
    const productIds = categoriesProductAssignment
      .filter((assignment) => assignment.CategoryID === categoryId)
      .map((assignment) => assignment.ProductID)

    return products.filter((product) => productIds.includes(product.ID))
  }

  // Set first category as selected by default
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].ID)
    }
  }, [categories, selectedCategory])

  return (
    <header className={`header w-full  font-semibold text-sm lg:text-lg relative `}>
      <div
        className={`fixed bg-transparent z-30 w-full px-5 flex justify-between lg:justify-normal gap-5 items-center  uppercase text-md   ${
          isModelsMenuOpen ? 'bg-white text-black' : 'shadow-header text-white'
        }`}
      >
        <div className="flex items-center gap-5">
          <Link href={'/'}>
            <div>
              <ImageHelper
                url="https://cdn.bajajauto.com/images/ktm/header/ktm-logo.png"
                alt="home page"
                className="block w-[95px] lg:w-auto"
              />
            </div>
          </Link>
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setIsModelsMenuOpen(!isModelsMenuOpen)}
              className="flex items-center"
            >
              <Link href={'#'}>{'Models'}</Link>
              <ChevronLeft
                className={`-rotate-90 text-[#f60] transition-transform duration-300 ${
                  isModelsMenuOpen ? 'rotate-90' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-4">
          {navLinks?.map((link, index) => (
            <Link key={index} href={link.href} className="hover:text-[#f60] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={34} /> : <Menu size={34} />}
        </button>

        {/* Models Dropdown */}
        <div
          className={`absolute hidden lg:block z-40 top-0 left-0 w-full bg-white text-black h-screen transition-transform duration-300 ease-in-out transform ${
            isModelsMenuOpen ? 'translate-y-0 mt-[85px]' : '-translate-y-full '
          }`}
        >
          <div className="container mx-auto p-8">
            {/* Close Button */}
            <div className="flex justify-end">
              <button onClick={() => setIsModelsMenuOpen(false)}>
                <X size={24} className="text-gray-700" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {/* Categories */}
              <div className="flex gap-4">
                {categories &&
                  categories.map((category) => (
                    <button
                      key={category.ID}
                      onClick={() => setSelectedCategory(category.ID)}
                      className={`px-4 py-2 rounded ${
                        selectedCategory === category.ID
                          ? 'bg-[#f60] text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {category.Name}
                    </button>
                  ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-4 gap-4 w-3/4">
                {getProductsForCategory(selectedCategory || '').length > 0 ? (
                  getProductsForCategory(selectedCategory || '').map((product) => (
                    <Link
                      key={product.ID}
                      href={`/bikes/${selectedCategory}/${product.ID}`}
                      className="flex flex-col items-center hover:opacity-80 transition-opacity"
                      onClick={() => setIsModelsMenuOpen(false)}
                    >
                      <div className="w-full h-32 bg-gray-300 mb-2">
                        {product.xp?.Images?.[0]?.Url && (
                          <ImageHelper
                            url={product.xp.Images[0].Url}
                            alt={product.Name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>{product.Name}</div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-4 text-center text-gray-500">
                    No products are available for this category
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div
        className={`fixed text-white lg:hidden z-50 top-0 right-0 h-full w-full bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end py-8 px-4">
            <button className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={34} />
            </button>
          </div>
          <nav className="flex flex-col p-4">
            <div className="flex items-center mb-4">
              <Link href={'#'} className="mr-2">
                {'Models'}
              </Link>
              <ChevronLeft className="-rotate-90 text-[#f60]" />
            </div>
            {navLinks?.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="py-3 hover:text-[#f60] transition-colors border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Header
