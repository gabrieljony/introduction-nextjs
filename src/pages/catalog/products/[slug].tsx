import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";
import dynamic from 'next/dynamic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { client } from "@/lib/prismic";

interface ProductProps {
    product: Document;
}

const AddToCartModal = dynamic(
    () => import("@/components/AddToCartModal"),
    { loading: () =>{
        return (
            <p>Loading...</p>
        )
    }, ssr: false }   
);

export default function Product({ product }: ProductProps) {

    const router = useRouter();
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

    function handleAddCart(){
        setIsAddToCartModalVisible(true);
    }

    if(router.isFallback){
        return <p>Carregando Produto...</p>
    }


    console.log('product.data', product.data)

    return (
        <div>
            <h1>Product: {PrismicDOM.RichText.asText(product.data.title)}</h1>

            <img src={product.data.thumbnail.url} width="400" alt=""/>

            <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description)}}></div>
            <p>Price: ${product.data.price}</p>

            <button onClick={handleAddCart}>Add to cart</button>

            { isAddToCartModalVisible && <AddToCartModal/> }
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
    const { slug } = context.params;

    const product = await client().getByUID('product', String(slug), {});


    return {
        props: {
            product: product
        },
        revalidate: 5 //será atualizado a cada 5 segundos
    }
}
