import "@/app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { cookies } from "next/headers";
export default async function LoginLayout({ children }) {
    const cookieStore = await cookies();
    const error = cookieStore.get("error")?.value;

    return (
        <html lang="en">
            <body>
                {error && (
                    <p className="p-2 bg-error rounded text-white">{error}</p>
                )}
                {children}
            </body>
        </html>
    )
}