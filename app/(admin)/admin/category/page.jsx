import { cookies } from "next/headers";
import CategoryComponent from "./categoryComponent";
export default async function Category() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value;
   
    return (
        <>
           <CategoryComponent token={token} />
        </>
    )
}