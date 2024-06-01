import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import state from '../valtio/store';
import { Button } from "@/components/ui/button"
const Home = () => {
    const snap = useSnapshot(state);

    const { data, isLoading } = useQuery({
        queryKey: ['pays'],
        queryFn: () => state.valtioCount.getPays()
    });

    console.log("chargement ", isLoading)
    console.log("pays ", snap.valtioCount.pays)
    console.log("data ", data)

    return (
        <>
            <div>Home</div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start selling as soon as you add a product.
                    </p>
                    <Button className="mt-4">Add Product</Button>
                </div>
            </div>
        </>
    )
}

export default Home