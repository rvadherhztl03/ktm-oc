import Link from 'next/link'
import React, { useState } from 'react'
import ImageHelper from '../helper/Image'
import { ChevronLeft, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModelsMenuOpen, setIsModelsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'KTM pro-xp', href: 'https://www.ktmindia.com/pro-experience' },
    { label: 'KTM app', href: 'https://www.ktmindia.com/ktmindiaapp' },
    { label: 'Locate Us', href: 'https://www.ktmindia.com/ktmdealerlocator' },
    { label: 'Association', href: 'https://www.ktmindia.com/associations' },
    { label: 'Bike collection', href: '/bikes' },
    { label: 'KTM Blogs', href: 'http://ktmindia.com/blogs' },
    { label: 'KTM Service', href: 'https://www.ktmindia.com/service' },
  ]

  return (
    <header className={`header w-full relative font-semibold text-sm lg:text-lg pb-[85px]`}>
      <div
        className={`fixed w-full px-5 flex justify-between lg:justify-normal gap-5 items-center relative uppercase text-md   ${
          isModelsMenuOpen ? 'bg-white text-black' : 'bg-transparent shadow-header text-white'
        }`}
      >
        <div className="flex items-center gap-5">
          <Link href={'/'}>
            <div>
              <ImageHelper
                url="https://cdn.bajajauto.com/images/ktm/header/ktm-logo.png"
                alt="home page"
                className="block w-[120px] lg:w-auto"
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

        {/* Mobile Navigation */}
        <div
          className={`fixed z-20 top-0 right-0 h-full w-full bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
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

        {/* Models Dropdown */}
        <div
          className={`absolute z-40 top-0 left-0 w-full bg-white text-black h-screen transition-transform duration-300 ease-in-out transform ${
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
              <div className="flex  gap-4 ">
                <div className="font-bold">NAKED BIKE</div>
                <div className="font-bold">SUPERSPORT</div>
                <div className="font-bold">TRAVEL</div>
                <div className="font-bold">MOTOCROSS</div>
                <div className="font-bold">ENDURO</div>
                <div className="font-bold">DUALSPORT</div>
              </div>

              {/* Placeholder Bikes (Example structure) */}
              <div className="grid grid-cols-4 gap-4 w-3/4">
                <div className="flex flex-col items-center">
                  <div className="w-full h-32 bg-gray-300 mb-2"></div>
                  <div>KTM 1390 SUPER DUKE R</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-32 bg-gray-300 mb-2"></div>
                  <div>KTM 890 DUKE R</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-32 bg-gray-300 mb-2"></div>
                  <div>KTM 390 DUKE</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-32 bg-gray-300 mb-2"></div>
                  <div>KTM 250 DUKE</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-32 bg-gray-300 mb-2"></div>
                  <div>KTM 200 DUKE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
