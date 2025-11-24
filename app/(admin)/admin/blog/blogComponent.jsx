'use client'

import { Plus, Pencil, Trash } from "lucide-react"
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useMessage } from "../../statusContext";
import Select from 'react-select'

export default function BlogComponent({ token }) {

    const { setMessage } = useMessage();
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})



    const [getCategories, setGetCategories] = useState([])

    const categoryOptions = getCategories.map((category, i) => {
        return {value: category._id, label: category.name }
    })

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [keywords, setKeywords] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [featured, setFeatured] = useState(false)
    const [is_comment_enabled, setIs_comment_enabled] = useState(true)
    const [status, setStatus] = useState('draft')

    const [banner, setBanner] = useState(null)
    const [bannerUrl, setBannerUrl] = useState(null)

    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)


    const getBlogs = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/blog', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json();
            setBlogs(data.blogs || []);
            setGetCategories(data.getCategories || [])
            console.log(blogs);

        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    })
    useEffect(() => {
        getBlogs()
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
        setDescription('')
        setCategories([])
        setKeywords('')
        setTags('')
        setContent('')
        setFeatured(false)
        setIs_comment_enabled(true)

        setPicture(null);
        setBanner(null);
        setStatus('draft');
        setPictureUrl(null)
        setBannerUrl(null)
        document.querySelector('input[type="file"]').value = null;
    }

    const modelClose = () => {
        document.getElementById('categoryModel').removeAttribute('open');
        reset();
    }


        const handleSubmit = async () => {
        setLoading(true)
        setErrors({})
        // try {
        //     const formData = new FormData()
        //     formData.append("name", name);
        //     formData.append('status', status)
        //     if (picture) formData.append("picture", picture);
        //     if (banner) formData.append("banner", banner);

        //     if (id) {
        //         const res = await fetch(`/api/admin/category?id=${id}`, {
        //             method: 'PUT',
        //             body: formData,
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             }
        //         })
        //         const data = await res.json();
        //         console.log(data)
        //         if (!res.ok) {
        //             // Zod error from backend
        //             if (data.errors) {
        //                 setErrors(data.errors); // Zod returns an array of issues
        //             } else if (data.message) {
        //                 setMessage(data.message)
        //             }
        //             return;
        //         }
        //         console.log("Update success:", data);
        //         setMessage(data.message)
        //     } else {

        //         const res = await fetch('/api/admin/category', {
        //             method: 'POST',
        //             body: formData,
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             }
        //         })
        //         const data = await res.json();
        //         console.log(data)
        //         if (!res.ok) {
        //             // Zod error from backend
        //             if (data.errors) {
        //                 setErrors(data.errors); // Zod returns an array of issues
        //             } else if (data.message) {
        //                 setErrors({ message: data.message }); // single error case
        //             }
        //             return;
        //         }
        //         console.log("Create success:", data);
        //         setMessage(data.message)
        //     }
        //     modelClose()
        // }
        // catch (err) {
        //     setMessage("Something went wrong" + err)
        // } finally {
        //     setLoading(false)
        //     getCategories()
        // }
    }



    return (
        <>

            {
                errors.message && <div role="alert" className={`alert alert-error alert-soft mb-3`}>
                    <span>{errors.message}</span>
                </div>
            }
            <div className="flex justify-between">
                <h3 className="text-primary text-xl font-bold">Blog List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add Blog</button>

                <dialog id="categoryModel" className="modal">
                    <div className="modal-box max-w-full">
                        <button onClick={() => modelClose()} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Category</h3>
                        <div className="grid grid-cols-2 gap-2 my-3">
                            <div className="col-span-2 form-control mb-3">
                                <label className="floating-label">
                                    <input type="text" value={name ?? ''} onChange={(e) => setName(e.target.value)} placeholder="Name" name="name" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.name && <span className="text-error">{errors.name}</span>}
                            </div>

                            <div className="col-span-2 form-control mb-3">
                                    <Select closeMenuOnSelect={false} isMulti onChange={(selectedOptions) => setCategories(selectedOptions)}  options={categoryOptions} value={categories} />

                                {errors.status && <span className="text-error">{errors.status}</span>}
                            </div>

                            <div className="col-span-2 grid gap-2 md:grid-cols-2">
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

                             <div className="col-span-2 form-control mb-3">
                                <label className="floating-label">
                                    <input type="text" value={keywords ?? ''} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords" name="keywords" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.keywords && <span className="text-error">{errors.keywords}</span>}
                            </div>

                            <div className="col-span-2 form-control mb-3">
                                <label className="floating-label">
                                    <textarea value={keywords ?? ''} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords" name="keywords" className="textarea focus:textarea-primary w-full focus:border-0">{keywords ?? ''}</textarea>
                                </label>
                                {errors.keywords && <span className="text-error">{errors.keywords}</span>}
                            </div>

                            <div className="col-span-2 form-control mb-3">
                                <label className="floating-label">
                                    <textarea onChange={(e) => setTags(e.target.value)} placeholder="Keywords" name="keywords" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.keywords && <span className="text-error">{errors.keywords}</span>}
                            </div>

                            <div className="form-control mb-3">
                                <label className="floating-label">
                                    <select name="status" value={status ?? ''} onChange={(e) => setStatus(e.target.value)} placeholder="Status" className="select focus:select-primary w-full focus:border-0">
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                        <option value="pending">Pending</option>
                                        <option value="review">Review</option>
                                        <option value="unpublished">unpublished</option>
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
                                <th>Categories</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, i) => (
                                <tr key={blog._id}>
                                    <td>{i + 1}</td>
                                    <td>{blog.picture && <Image src={`/${blog.picture}`} className="rounded" width={80} height={80} alt={`${blog.name}`} />}</td>
                                    <td>{blog.banner && <Image src={`/${blog.banner}`} className="rounded" width={80} height={80} alt={`${blog.name}`} />}</td>
                                    <td>{blog.name}</td>
                                    <td>{blog?.categories.map((category,i)=>(
                                        <span>{category.name},</span>
                                    ))}</td>
                                    <td><span className={`badge ${blog.status == 'active' ? 'badge-success' : 'badge-error'}`}>{blog.status} </span></td>
                                    <td>
                                        <button onClick={() => modelOpen(blog._id)} className="btn btn-sm btn-info me-1"><Pencil size={15} /></button>
                                        <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-error me-1"><Trash size={15} /></button>
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