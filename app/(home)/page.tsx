// app/(home)/page.tsx

import { HomeCarousel } from '@/components/shared/home/home-carousel'
import data from '@/lib/data'
import HomeCard from '@/components/shared/home/home-card'
import { 
  getAllCategories, 
  getRecentProducts, 
  getPopularProducts, 
  getProductsByPopularTags,
  getDealProducts
} from '@/lib/actions/product.actions'
import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/shared/product/product-slider'

// Force dynamic rendering to prevent build-time data fetching
export const dynamic = 'force-dynamic'

export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4)
  
  // Utiliser des fonctions plus fiables qui ne dépendent pas de tags spécifiques
  const newArrivals = await getRecentProducts(4)
  const bestSellers = await getPopularProducts(4)
  const featureds = await getProductsByPopularTags(4)
  
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category.name,
        image: category.image,
        href: `/search?category=${category.name}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'View All',
        href: '/search?sort=recent',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View All',
        href: '/search?sort=popular',
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop Now',
        href: '/search?sort=rating',
      },
    },
  ]

  const todaysDeals = await getDealProducts(8)

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
      </div>
  
      <Card className='w-full rounded-none'>
        <CardContent className='p-3 items-center gap-3'>
          <ProductSlider title="Today's Deals" products={todaysDeals} />
        </CardContent>
      </Card>
    </>
  )
}