"use client"
import { Plus } from "lucide-react"
import { useState, useCallback, useEffect, useRef } from "react";
// import { cookies } from "next/headers";

export default function CategoryComponent({ token }) {
    // const cookieStore = await cookies()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [file, setFile] = useState(null)
    const formRef = useRef(null)

    const [formdata, setFormData] = useState({
        id: null,
        name: '',
        banner: null,
        picture: null,
        description: '',
        content: '',
        status: '',
    })

    // const getCategories = useCallback(async () => {

    // })
    // useEffect()


    const modelOpen = async (id = null) => {
        if (id == null) {
            document.getElementById('categoryModel').setAttribute('open', true)
        } else {
            document.getElementById('categoryModel').setAttribute('open', true)
            // const token = await getToken();
            // const res = await Fetch(`/api/departments/${id}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": "Bearer " + token
            //     }
            // })
            // const data = await res.json()
            // console.log(data)

        }
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        setErrors([])
        try {
            const formData = new FormData(e.currentTarget)
            formData.append('picture',file)
            const res = await fetch('/api/login', {
                method: 'post',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
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
            console.log("Create success:", data);
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
            {
                status && <div role="alert" className={`alert ${ status == 201 ? 'alert-success' : status== 400 ? 'alert-error' : '' } alert-soft`}>
                    <span>{status}</span>
                </div>
            }
            <div className="flex justify-between">
                <h3 className="text-primary text-xl font-bold">Category List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add Category</button>

                <dialog id="categoryModel" className="modal">
                    <div className="modal-box">
                        <button onClick={() => document.getElementById('categoryModel').removeAttribute('open')} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="my-3">
                            <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" >

                                <div className="form-control mb-3">
                                    <label className="floating-label">
                                        <input type="text" placeholder="Name" name="name" className="input focus:input-primary w-full focus:border-0" />
                                        <span>Name</span>
                                    </label>
                                </div>

                                <div className="form-control mb-3">
                                    <label className="floating-label">
                                        <input type="text" placeholder="Name" name="name" className="input focus:input-primary w-full focus:border-0" />
                                        <span>Name</span>
                                    </label>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="mt-5">
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-primary">
                                <th>Sl</th>
                                <th>Banner</th>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {categories.map((category, i) => (
                            <tr key={category.id}>
                                <td>{i + 1}</td>
                                <td>{category.name}</td>
                                <td>{category?.headDoctor?.name}</td>
                                <td>{category.email}</td>
                                <td>{category.phone}</td>
                                <td>
                                    <button onClick={() => modelOpen(category.id)} className="btn btn-sm btn-info me-1"><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="btn btn-sm btn-error me-1"><i className="fa-solid fa-trash"></i></button>

                                </td>
                            </tr>
                        ))} */}


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}