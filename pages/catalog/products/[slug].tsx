import { useRouter } from "next/router";

export default function Home() {

    const router = useRouter();

    return (
        <div>
            <h1>Product: {router.query.slug}</h1>
        </div>
    )
}
