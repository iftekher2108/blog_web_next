import "@/app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { UserProvider } from "./userContext";
import { cookies } from "next/headers";
import Header from "./header";

export default async function AdminLayout({ children }) {

    const cookieStore = cookies();
    const error = await cookieStore.get("error")?.value;
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <Header />
                    {error && (
                        <p className="p-2 bg-error rounded text-white">{error}</p>
                    )}
                    {children}
                </UserProvider>
            </body>
        </html>
    )
}
