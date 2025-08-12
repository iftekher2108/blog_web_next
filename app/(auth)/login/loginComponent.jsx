'use client'

import { useState, useRef } from "react"

export default function LoginComponent() {

    const [passShow, setPassShow] = useState(false)

    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])



    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData(e.currentTarget)

            const res = await fetch('/api/login', {
                method: 'post',
                body: formData,

            })

            const data = res.json();

            setError(data.errors)
            

        } catch (e) {
            console.log(e)

        } finally {
            setLoading(false)
            formRef.current.reset()
        }


        // To log form data key-values:
        //   for (const [key, value] of formData) {
        //     console.log(key, value);
        //   }


    }

    return (
        <>

        {
            error && <div>
                {error}
            </div>
        }

            <div className="card-title p-4 bg-primary rounded text-white mb-5">Login</div>
            <div className="">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-control mb-5">
                        <label htmlFor="" className="floating-label">
                            <span>Email</span>
                            <input type="email" className="input input-primary w-full focus:outline-0" name="email" placeholder="Email" />
                        </label>
                    </div>

                    <div className="form-control mb-5">
                        <label htmlFor="" className="floating-label">
                            <span>Password</span>
                            <div className="relative">
                                <input type={passShow ? "text" : "password"} className="input input-primary w-full focus:outline-0" name="password" placeholder="Password" />
                                <i onClick={() => setPassShow(!passShow)} className={`fa-solid absolute top-[50%] right-2 z-[5] -translate-y-[50%] ${passShow ? 'fa-eye' : 'fa-eye-low-vision'} `}></i>
                                {/* <i class="fa-solid fa-eye-low-vision"></i> */}
                            </div>
                        </label>
                    </div>

                    <button className="btn w-full btn-primary">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Login'}</button>

                </form>

            </div>
        </>
    )
}
