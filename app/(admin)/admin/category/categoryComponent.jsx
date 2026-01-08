"use client"
import { Plus, Pencil, Trash } from "lucide-react"
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useMessage } from "../../statusContext";

export default function CategoryComponent({ token }) {
    const { setMessage } = useMessage();
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [id, setId] = useState(null)
    const [category, setCategory] = useState(null);
    const formRef = useRef(null)

    const [banner, setBanner] = useState(null)
    const [bannerUrl, setBannerUrl] = useState(null)

    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)


    const getCategories = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/category', {
                method: "GET",
                headers: {
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
        reset()
        if (id == null) {
            document.getElementById('categoryModel').setAttribute('open', true)
        } else {
            setId(id)
            document.getElementById('categoryModel').setAttribute('open', true)
            const res = await fetch(`/api/admin/category?id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
            setId(data.category._id)
            setCategory(data.category)
            setPictureUrl(data.category.picture)
            setBannerUrl(data.category.banner)
        }
    }

    const reset = () => {
        setId(null)
        setPicture(null)
        setPictureUrl(null)
        setBanner(null)
        setBannerUrl(null)
        setCategory(null)
        setErrors({})
        formRef.current?.reset()
    }

    const modelClose = () => {
        document.getElementById('categoryModel').removeAttribute('open');
        reset();
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        try {
            const formData = new FormData(e.currentTarget)
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
                        setMessage(data.message)
                    }
                    return;
                }
                console.log("Update success:", data);
                setMessage(data.message)
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
                setMessage(data.message)
            }
            modelClose()
        }
        catch (err) {
            setMessage("Something went wrong" + err)
            console.log(err)
        } finally {
            setLoading(false)
            getCategories()
            reset()
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
            setLoading(false)
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
                        <form onSubmit={handleSubmit} ref={formRef} method="POST">

                            <div className="my-3">
                                <div className="form-control mb-3">
                                    <label className="floating-label">
                                        <input type="text" defaultValue={category?.name ?? ''} placeholder="Name" name="name" className="input focus:input-primary w-full focus:border-0" />
                                    </label>
                                    {errors.name && <span className="text-error">{errors.name}</span>}
                                </div>

                                <div className="grid gap-2 md:grid-cols-2">
                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="label">Picture (400x500 px)</label>
                                            {/* Else If editing and existing URL exists → preview old image */}
                                            {pictureUrl && (
                                                <img
                                                    src={picture ? pictureUrl : `/${pictureUrl}`}
                                                    className="rounded mb-3"
                                                    height={80}
                                                    alt="picture"
                                                />
                                            )}
                                            <input type="file" onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                setPicture(file)
                                                setPictureUrl(URL.createObjectURL(file))
                                            }} name="picture" className="file-input focus:file-input-primary border border- w-full focus:border-0" />
                                        </div>
                                        {errors.picture && <span className="text-error">{errors.picture}</span>}
                                    </div>

                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="label">Banner (1920x1080 px)</label>

                                            {/* Else If editing and existing URL exists → preview old image */}
                                            {bannerUrl && (
                                                <img
                                                    src={banner ? bannerUrl : `/${bannerUrl}`}
                                                    className="rounded mb-3"
                                                    height={80}
                                                    alt="banner"
                                                />
                                            )}
                                            <input type="file" onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                setBanner(file)
                                                setBannerUrl(URL.createObjectURL(file))
                                            }} name="banner" className="file-input focus:file-input-primary border border- w-full focus:border-0" />
                                        </div>
                                        {errors.banner && <span className="text-error">{errors.banner}</span>}

                                    </div>
                                </div>

                                <div className="form-control mb-3">
                                    <label className="floating-label">
                                        <select name="status" defaultValue={category?.status ?? ''} placeholder="Status" className="select focus:select-primary w-full focus:border-0">
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </label>
                                    {errors.status && <span className="text-error">{errors.status}</span>}
                                </div>

                                <div className="flex justify-end">
                                    <button className="btn btn-primary">{loading ? <span className="loading loading-spinner loading-md"></span> : "Submit"}</button>
                                </div>
                            </div>
                        </form>
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
                                    <td>{category?.picture && <Image src={`/${category.picture}`} className="rounded" width={80} height={80} alt={`${category?.name}`} />}</td>
                                    <td>{category?.banner && <Image src={`/${category.banner}`} className="rounded" width={80} height={80} alt={`${category?.name}`} />}</td>
                                    <td>{category?.name}</td>
                                    <td><span className={`badge ${category?.status == 'active' ? 'badge-success' : 'badge-error'}`}>{category?.status} </span></td>
                                    <td>
                                        <button onClick={() => modelOpen(category._id)} className="btn btn-sm btn-info me-1"><Pencil size={15} /></button>
                                        <button onClick={() => handleDelete(category._id)} className="btn btn-sm btn-error me-1"><Trash size={15} /></button>

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