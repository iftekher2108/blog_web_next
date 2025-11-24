'use client'
import { useRouter } from "next/navigation"
import { useUser } from "./userContext";
import Link from "next/link";
export default function Header() {
    const router = useRouter();
    function handleLogout() {
        if (typeof window !== 'undefined') {
            document.cookie = "token=;";
            localStorage.removeItem('user');
            router.replace("/login");
        }
    }
    const { user } = useUser();
    return (
        <div className="navbar bg-base-100 sticky top-0 z-10 shadow-sm px-4">
            <div className="flex-1">
                <Link href={'/admin'} className="btn btn-ghost text-xl">daisyUI</Link>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    { user?.name }
                    <div tabIndex={0} role="button" className="btn btn-ghost ms-1 btn-circle avatar">
                        <div className="rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href={'/admin/profile'} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><button onClick={handleLogout} >Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
