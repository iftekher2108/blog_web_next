import { ChartColumnStacked, House, List, Rss, User, Settings2, Presentation } from "lucide-react"
import Link from "next/link"
export default function SideNav() {

    const sideNav = [
        {
            icon: <House size={18} />,
            name: "Dashboard",
            slug: "/admin",
        },
        {
            icon: <Presentation size={18} />,
            name: "Slider",
            slug: "/admin/slider",
        },
        {
            icon: <ChartColumnStacked size={18} />,
            name: "Catelog",
            children: [
                {
                    icon: <List size={18} />,
                    name: "Category",
                    slug: "/admin/category",
                },
                {
                    icon: <Rss size={18} />,
                    name: "Blog",
                    slug: "/admin/blog",
                }
            ]
        },
        {
            icon: <User size={18} />,
            name: 'User',
            slug: "/admin/user",
        },
        {
            icon: <Settings2 size={18} />,
            name: 'Setting',
            slug: '/admin/setting',
        }

    ]

    return (
        <div className="p-2 bg-primary min-h-screen">
            <ul className="menu bg-base-300 min-h-screen w-full">
                {
                    sideNav.map((nav,index) => {
                        if (nav.children) {
                            return (
                                <li key={index}>
                                    <details>
                                        <summary className="p-3">{ nav.icon }{nav.name}</summary>
                                        <ul>
                                            {
                                                nav.children.map((child,index) => (
                                                    <li key={index}><Link href={child.slug} className="p-3">{ child.icon }{child.name}</Link></li>
                                                ))
                                            }
                                        </ul>
                                    </details>
                                </li>
                            )
                        } else {
                            return (
                                <li key={index}><Link href={nav.slug} className="p-3">{ nav.icon }{nav.name}</Link></li>
                            )
                        }
                    })
                }


            </ul>
        </div>
    )
}
