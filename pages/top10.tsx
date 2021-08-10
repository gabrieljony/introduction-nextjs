import { Title } from '../styles/pages/Home';
import { GetStaticProps } from 'next';

interface IProduct {
    id: string;
    title: string;
}

interface Top10Props {
    products: IProduct[];
}

export default function Top10({ products }: Top10Props) {
    return (
        <div>
            <section>
                <Title>Top 10</Title>
                <ul>
                    {products.map((item: IProduct) => {
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

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
    const response = await fetch('http://localhost:3333/products');
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 10 //será atualizado a cada 10 segundos
    }
}
