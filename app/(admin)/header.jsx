'use client'
import { useRouter } from "next/navigation"
import { useUser } from "./userContext";
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
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
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
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Setting </a></li>
                        <li><button onClick={handleLogout} >Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
