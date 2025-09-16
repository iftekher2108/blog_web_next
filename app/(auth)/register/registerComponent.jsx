'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function RegisterComponent() {

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

            const res = await fetch('/api/register', {
                method: 'post',
                body: formData,
            })

            const data = await res.json();

            console.log(data)
            if (!res.ok) {
                // Zod error from backend
                if (data.errors) {
                    const formattedErrors = {};
                    data.errors.forEach(err => {
                        const field = err.path[0]; // 'email' or 'password'
                        formattedErrors[field] = err.message;
                    });
                    setErrors(formattedErrors); // Zod returns an array of issues
                } else if (data.error) {
                    setErrors([{ message: data.error }]); // single error case
                }
                return;
            }
            console.log("Register success:", data);
            if (typeof window !== 'undefined') {
                document.cookie = `token=${data.token}`;
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            router.push('/admin')
        }
        catch (err) {
            setErrors([{ message: "Something went wrong" }]);
            console.log(err)

        } finally {
            setLoading(false)
            formRef.current.reset()
        }

    }


    return (
        <>
            {errors.length > 0 && (
                <div className="mb-4 text-red-500">
                    {errors.map((err, idx) => (
                        <p key={idx}>{err.message}</p>
                    ))}
                </div>
            )}


            <div className="card-title p-4 bg-primary rounded text-white mb-5">Register</div>
            <div className="">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-control mb-5">
                        <label htmlFor="" className="floating-label">
                            <span>Name</span>
                            <input type="text" className="input input-primary w-full focus:outline-0" name="name" placeholder="Name" />
                        </label>
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
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
                                <i onClick={() => setPassShow(!passShow)} className={`fa-solid absolute top-[50%] right-2 z-[5] -translate-y-[50%] ${passShow ? 'fa-eye' : 'fa-eye-low-vision'} `}></i>
                            </div>
                        </label>
                        {errors.password && <p className="text-red-500">{errors.password}</p>}

                    </div>

                    <button className="btn w-full btn-primary">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Register'}</button>

                </form>

            </div>
        </>
    )
}
