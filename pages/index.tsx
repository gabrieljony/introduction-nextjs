import { Title } from '../styles/pages/Home';
import { GetServerSideProps } from 'next';

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recomendedProducts: IProduct[];
}

export default function Home({ recomendedProducts }: HomeProps) {
  async function handleSum(){
    const math = (await import('../lib/math')).default;
    alert(math.sum(3,5));
  }

  return (
    <div>
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
