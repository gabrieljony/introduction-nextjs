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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recomendedProducts = await response.json();

  return {
    props: {
      recomendedProducts
    }
  }
}
