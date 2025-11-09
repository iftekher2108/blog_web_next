"use client"
import { Plus } from "lucide-react"
import { useState, useCallback, useEffect, useRef } from "react";
// import { cookies } from "next/headers";

export default function CategoryComponent({ token }) {
    // const cookieStore = await cookies()
    const [categories, setCategories] = useState([])
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

    const getCategories = useCallback(async () => {
        const token = document.cookie
    })

    // 3. Single handler function for all *top-level* fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(`${name} = `, value)
        // Use the spread operator (...) to keep all existing fields
        // and only update the field matching the input's 'name'
        setFormData(prevData => ({
            ...prevData,
            [name]: value, // This updates the specific top-level field (e.g., 'name', 'code')
        }));
    };

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


    const handleSubmit = () => {

    }



    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-primary text-xl font-bold">Category List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add Category</button>

                <dialog id="categoryModel" className="modal">
                    <div className="modal-box">
                        <button onClick={() => document.getElementById('categoryModel').removeAttribute('open')} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="my-3">
                            <form ref={formRef} onSubmit={handleSubmit} >
                                
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
                            {/* {departments.map((department, i) => (
                            <tr key={department.id}>
                                <td>{i + 1}</td>
                                <td>{department.name}</td>
                                <td>{department?.headDoctor?.name}</td>
                                <td>{department.email}</td>
                                <td>{department.phone}</td>
                                <td>
                                    <button onClick={() => modelOpen(department.id)} className="btn btn-sm btn-info me-1"><i className="fa-solid fa-pen-to-square"></i></button>
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