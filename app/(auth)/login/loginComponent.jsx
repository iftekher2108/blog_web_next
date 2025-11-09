'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeClosed } from "lucide-react"

export default function LoginComponent() {

    const router = useRouter()

    const [passShow, setPassShow] = useState(false)

    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        setErrors([])
        try {
            const formData = new FormData(e.currentTarget)

            const res = await fetch('/api/login', {
                method: 'post',
                body: formData,
            })

            const data = await res.json();

            console.log(data)
            if (!res.ok) {
                // Zod error from backend
                if (data.errors) {
                    setErrors(data.errors); // Zod returns an array of issues
                } else if (data.message) {
                    setErrors({ message: data.message }); // single error case
                }
                return;
            }
            console.log("Login success:", data);
             if(typeof window !== 'undefined') {
                document.cookie = `token=${data.token}`;
                localStorage.setItem('user',JSON.stringify(data.user))
            }
            router.push('/admin')
        }
        catch (err) {
            setErrors({ message: "Something went wrong" });

        } finally {
            setLoading(false)
            formRef.current.reset()
        }

    }

    return (
        <>

            {errors.message && (
                <div className="mb-4 text-red-500">
                        <p>{errors.message}</p>
                </div>
            )}


            <div className="card-title p-4 bg-primary rounded text-white mb-5">Login</div>
            <div className="">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-control mb-5">
                        <label htmlFor="" className="floating-label">
                            <span>Email</span>
                            <input type="email" className="input input-primary w-full focus:outline-0" name="email" placeholder="Email" />
                        </label>
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    <div className="form-control mb-5">
                        <label htmlFor="" className="floating-label">
                            <span>Password</span>
                            <div className="relative">
                                <input type={passShow ? "text" : "password"} className="input input-primary w-full focus:outline-0" name="password" placeholder="Password" />
                                { passShow ?
                                 <Eye size={20} onClick={() => setPassShow(!passShow)}  className="absolute top-[50%] right-2 z-5 -translate-y-[50%]" /> : <EyeClosed onClick={() => setPassShow(!passShow)} className="absolute top-[50%] right-2 z-5 -translate-y-[50%]" size={20} /> } 
                                 {/* <i onClick={() => setPassShow(!passShow)} className={`fa-solid absolute top-[50%] right-2 z-[5] -translate-y-[50%] ${passShow ? 'fa-eye' : 'fa-eye-low-vision'} `}></i> */}
                            </div>
                        </label>
                        {errors.password && <p className="text-red-500">{errors.password}</p>}

                    </div>

                    <button className="btn w-full btn-primary">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Login'}</button>

                </form>

            </div>
        </>
    )
}
