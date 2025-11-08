import "@/app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { UserProvider } from "./userContext";
import { cookies } from "next/headers";
import SideNav from "./sideNav";
import Header from "./header";

export default async function AdminLayout({ children }) {

    const cookieStore = await cookies();
    const error = cookieStore.get("error")?.value;
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <Header />
                    {error && (
                        <p className="p-2 bg-error rounded text-white">{error}</p>
                    )}
                    <div className="grid md:grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <SideNav />
                        </div>

                        <div className="col-span-9">
                            <div className="p-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </UserProvider>
            </body>
        </html>
    )
}
