import ProfileComponent from "./profileComponent";
import { cookies } from "next/headers";
export default async function Profile() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')
    return(
        <>
            <ProfileComponent token={token} />
        </>
    )
}
