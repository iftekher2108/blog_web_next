"use client"
import { Plus } from "lucide-react"
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { createCookiesWithMutableAccessCheck } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function CategoryComponent({ token }) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('active')

    const [banner, setBanner] = useState(null)
    const [bannerUrl, setBannerUrl] = useState(null)

    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)


    const getCategories = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/category', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json();
            setCategories(data.categories || []);
            console.log(categories);

        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    })

    useEffect(() => {
        getCategories();
    }, [])


    const modelOpen = async (id = null) => {
        if (id == null) {
            reset()
            document.getElementById('categoryModel').setAttribute('open', true)
        } else {
            reset()
            setId(id)
            document.getElementById('categoryModel').setAttribute('open', true)
            const res = await fetch(`/api/admin/category?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
            setId(data.category._id)
            setName(data.category.name)
            setPictureUrl(data.category.picture)
            setBannerUrl(data.category.banner)
            setStatus(data.category.status)
        }
    }

    const reset = () => {
        setId(null)
        setName('');
        setPicture(null);
        setBanner(null);
        setStatus('active');
        setPictureUrl(null)
        setBannerUrl(null)
    }

    const modelClose = () => {
        document.getElementById('categoryModel').removeAttribute('open');
        reset();
    }


    const handleSubmit = async () => {
        setLoading(true)
        setErrors({})
        try {
            const formData = new FormData()
            formData.append("name", name);
            formData.append('status', status)
            if (picture) formData.append("picture", picture);
            if (banner) formData.append("banner", banner);

            if (id) {
                const res = await fetch(`/api/admin/category?id=${id}`, {
                    method: 'PUT',
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
                console.log("Update success:", data);
            } else {

                const res = await fetch('/api/admin/category', {
                    method: 'POST',
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
            modelClose()
        }
        catch (err) {
            setErrors({ message: "Something went wrong" });
        } finally {
            setLoading(false)
            getCategories()
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) {
            return;
        }
        try {
            const res = await fetch(`/api/admin/category?id=${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json();
            if (!res.ok) {
                // Zod error from backend
                if (data.errors) {
                    setErrors(data.errors); // Zod returns an array of issues
                } else if (data.message) {
                    setErrors({ message: data.message }); // single error case
                }
                return;
            }
            console.log("delete success:", data)
        } catch (error) {
            console.error('Failed to delete category:', error)
        } finally {
            getCategories()
        }

    }


    return (
        <>
            {
                errors.message && <div role="alert" className={`alert alert-error alert-soft mb-3`}>
                    <span>{errors.message}</span>
                </div>
            }
            <div className="flex justify-between">
                <h3 className="text-primary text-xl font-bold">Category List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add Category</button>

                <dialog id="categoryModel" className="modal">
                    <div className="modal-box">
                        <button onClick={() => modelClose()} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Category</h3>
                        <div className="my-3">
                            <div className="form-control mb-3">
                                <label className="floating-label">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" name="name" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.name && <span className="text-error">{errors.name}</span>}
                            </div>

                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="col-span-1">
                                    <div className="form-control mb-3">
                                        <label className="label">Picture (400x500 px)</label>
                                        {picture &&
                                            <img src={`${URL.createObjectURL(picture)}`} className="rounded mb-3" height={80} alt="picture" />
                                        }
                                        {/* Else If editing and existing URL exists → preview old image */}
                                        {!picture && pictureUrl && (
                                            <img
                                                src={`/${pictureUrl}`}
                                                className="rounded mb-3"
                                                height={80}
                                                alt="picture"
                                            />
                                        )}
                                        <input type="file" onChange={(e) => setPicture(e.target.files[0])} name="picture" className="file-input focus:file-input-primary border border- w-full focus:border-0" />
                                    </div>
                                    {errors.picture && <span className="text-error">{errors.picture}</span>}
                                </div>

                                <div className="col-span-1">
                                    <div className="form-control mb-3">
                                        <label className="label">Banner (1920x1080 px)</label>
                                        {banner &&
                                            <img src={`${URL.createObjectURL(banner)}`} className="rounded mb-3" height={80} alt="banner" />
                                        }
                                        {/* Else If editing and existing URL exists → preview old image */}
                                        {!banner && bannerUrl && (
                                            <img
                                                src={`/${bannerUrl}`}
                                                className="rounded mb-3"
                                                height={80}
                                                alt="banner"
                                            />
                                        )}
                                        <input type="file" onChange={(e) => setBanner(e.target.files[0])} name="banner" className="file-input focus:file-input-primary border border- w-full focus:border-0" />
                                    </div>
                                    {errors.banner && <span className="text-error">{errors.banner}</span>}

                                </div>
                            </div>

                            <div className="form-control mb-3">
                                <label className="floating-label">
                                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" className="select focus:select-primary w-full focus:border-0">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </label>
                                {errors.status && <span className="text-error">{errors.status}</span>}
                            </div>


                            <div className="flex justify-end">
                                <button onClick={handleSubmit} className="btn btn-primary">{loading ? <span className="loading loading-spinner loading-md"></span> : "Submit"}</button>
                            </div>
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
                                <th>Picture</th>
                                <th>Banner</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, i) => (
                                <tr key={category._id}>
                                    <td>{i + 1}</td>
                                    <td>{category.picture && <Image src={`/${category.picture}`} className="rounded" width={80} height={80} alt={`${category.name}`} />}</td>
                                    <td>{category.banner && <Image src={`/${category.banner}`} className="rounded" width={80} height={80} alt={`${category.name}`} />}</td>
                                    <td>{category.name}</td>
                                    <td><span className={`badge ${category.status == 'active' ? 'badge-success' : 'badge-error'}`}>{category.status} </span></td>
                                    <td>
                                        <button onClick={() => modelOpen(category._id)} className="btn btn-sm btn-info me-1"><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={()=> handleDelete(category._id)} className="btn btn-sm btn-error me-1"><i className="fa-solid fa-trash"></i></button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}