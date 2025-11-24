import { cookies } from "next/headers";
import SliderComponent from "./sliderComponent";
export default async function Slider() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    return (
        <>
            <SliderComponent token={token} />
        </>
    )
}