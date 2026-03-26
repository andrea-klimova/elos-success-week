import type { Product } from '@/types/content'

interface Props {
  title: string
  products: Product[]
}

export default function ProductsSection({ title, products }: Props) {
  return (
    <section className="py-16 px-6 md:px-10 bg-white" id="produkty">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-elos-navy text-center mb-10">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl p-6 border-2 ${
                product.featured
                  ? 'border-elos-orange bg-orange-50'
                  : 'border-elos-border bg-white'
              } relative`}
            >
              {product.featured && product.tag && (
                <span className="absolute top-4 right-4 bg-elos-orange text-elos-dark text-xs font-bold px-2 py-1 rounded-full">
                  {product.tag}
                </span>
              )}
              <h3 className="text-xl font-bold text-elos-navy mb-2">{product.name}</h3>
              <p className="text-elos-gray">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
