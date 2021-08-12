import { Title } from '@/styles/pages/Home';
import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recomendedProducts: IProduct[];
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
          {recomendedProducts.map((item: IProduct) => {
            return (
              <li key={item.id}>
                {item.title}
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recomendedProducts = await response.json();

  return {
    props: {
      recomendedProducts
    }
  }
}
