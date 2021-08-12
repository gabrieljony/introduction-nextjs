import { Title } from '@/styles/pages/Home';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recomendedProducts: Document[];
}

export default function Home({ recomendedProducts }: HomeProps) {
  async function handleSum(){
    console.log('process.env.API_UR - Variavel de ambiente restrita', process.env.API_UR)
    console.log('process.env.NEXT_PUBLIC_API_URL - Variável de ambiente publica', process.env.NEXT_PUBLIC_API_URL)
    const math = (await import('@/lib/math')).default;
    alert(math.sum(3,5));
  }

  return (
    <div>
      <SEO 
        title="DevCommerce, your best ecommerce!"
        image="boost.png"
        shouldExcludeTitleSuffix/>
      <Title>Hello NextJs!</Title>

      <section>
        <Title>Products</Title>
        <ul>
          {recomendedProducts.map((item: Document) => {
            return (
              <li key={item.id}>
                <Link href={`/catalog/products/${item.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(item.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recomendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);
  console.log('recomendedProducts', recomendedProducts)

  return {
    props: {
      recomendedProducts: recomendedProducts.results
    }
  }
}
