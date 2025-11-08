import { cookies } from "next/headers";
import CategoryComponent from "./categoryComponent";
export default async function Category() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
   
    return (
        <>
           <CategoryComponent token={token} />
        </>
    )
}