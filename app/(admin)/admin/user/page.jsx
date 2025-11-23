
import UserComponent from "./userComponent";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')
    return (
        <div>
            <UserComponent token={token} />
            {/* <UserList /> */}
            {/* <UserCreate /> */}
        </div>
    )
}