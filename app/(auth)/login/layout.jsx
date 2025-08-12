import "@/app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"

export default function LoginLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}