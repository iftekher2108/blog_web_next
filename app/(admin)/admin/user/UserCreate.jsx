'use client'
import { useState, useRef } from "react"

export default function UserCreate() {

    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function submit(event) {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        try {

            const res = await fetch('/api/user', {
                method: "post",
                body: formData
            })
            const data = await res.json();

            setStatus(data.msg)

        } catch (e) {
            setError(e.message)
            console.error(e)
        } finally {
            fetchUsers();
            setLoading(false)
            formRef.current.reset()
        }


    }

 
    return (
        <>
         

            {error && <div className="bg-error p-2 rounded">{error}</div>}

            <div className="m-4">
                <form ref={formRef} onSubmit={submit}>

                    <div className="form-control mb-4">
                        <label className="floating-label">
                            <span>Name</span>
                            <input type="text" className="input input-primary focus:outline-0" name="name" placeholder="Enter name" />
                        </label>
                    </div>


                    <div className="form-control mb-4">
                        <label htmlFor="" className="floating-label">
                            <span>Email</span>
                            <input type="email" className="input input-primary focus:outline-0" name="email" placeholder="Enter email" />
                        </label>
                    </div>

                    <div className="form-control mb-4">
                        <label htmlFor="" className="floating-label">
                            <span>Mobile</span>
                            <input type="number" className="input input-primary focus:outline-0" name="mobile" placeholder="Enter mobile" />
                        </label>
                    </div>

                    <div className="form-control mb-4">
                        <label htmlFor="" className="floating-label">
                            <span>Password</span>
                            <input type="text" className="input input-primary focus:outline-0" name="password" placeholder="Enter password" />
                        </label>
                    </div>

                    <button className="btn btn-primary">Submit {loading && <span className="loading loading-spinner loading-md"></span>} </button>

                </form>


            </div>

        
        </>
    )
}