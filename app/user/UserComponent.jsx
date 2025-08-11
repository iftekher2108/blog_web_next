'use client'
import { useEffect, useState, useRef } from "react"

export default function UserComponent() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers();
    }, [])
    async function fetchUsers() {
        try {
            const res = await fetch("/api/user");
            const data = await res.json();
            setUsers(data.users || []); // adjust based on your API shape
        } catch (err) {
            console.error("Failed to fetch users:", err);
        }
    }
    const [status, setStatus] = useState()
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

        } catch(e){
            setError(e.message)
      console.error(e)
        } finally {
            fetchUsers();
            setLoading(false) 
            formRef.current.reset()
        }
        

    }

    async function deleteUser(user_id) {
        const res = await fetch('/api/user', {
            method: 'delete',
            body: JSON.stringify({ user_id })
        })

        setStatus(res.msg)
        if (res.status) {
            fetchUsers()
        }

    }


    return (
        <>

            {
                status &&
                <div className="bg-success p-2 rounded">
                    {status}
                </div>
            }

            {error && <div className="bg-error p-2 rounded">{error}</div>}

            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-title">
                        user
                    </div>
                    <form ref={formRef} onSubmit={submit}>
                        <div className="flex flex-col gap-4" >
                            <div className="form-control">
                                <label htmlFor="" className="mb-1">Name</label>
                                <input type="text" className="input input-primary" name="name" placeholder="Enter name" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="" className="mb-1">Email</label>
                                <input type="email" className="input input-primary" name="email" placeholder="Enter email" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="" className="mb-1">Mobile</label>
                                <input type="number" className="input input-primary" name="mobile" placeholder="Enter mobile" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="" className="mb-1">Password</label>
                                <input type="text" className="input input-primary" name="password" placeholder="Enter password" />
                            </div>

                            <button className="btn btn-primary">Submit { loading && <span className="loading loading-spinner loading-md"></span> } </button>
                        </div>
                    </form>


                </div>

            </div>

            <div className="grid grid-cols-4 gap-4">
                {
                    users.map((ruser) => (
                        <div key={ruser._id} className="card">
                            <button className="btn btn-error" onClick={() => deleteUser(ruser._id)}>delete</button>
                            <div className="card-title">
                                {ruser.name}
                            </div>

                            <div className="card-body">
                                <p>{ruser._id}</p>
                                <p>{ruser.email}</p>
                                <p>{ruser.mobile}</p>
                                <p>{ruser.password}</p>
                            </div>

                        </div>
                    ))
                }
            </div>

        </>
    )
}