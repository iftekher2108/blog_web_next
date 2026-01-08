'use client'

import { Plus, Pencil, Trash } from "lucide-react"
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useMessage } from "../../statusContext";
import Select from 'react-select'
import dynamic from 'next/dynamic';
import MySelect from "@/component/MySelect";
// SSR বন্ধ করে এডিটর ইম্পোর্ট করা হচ্ছে
const TextEditor = dynamic(() => import('@/component/Editor'), {
    ssr: false,
    loading: () => <p>Loading Editor...</p>
});


export default function BlogComponent({ token }) {

    const { setMessage } = useMessage();
    const formRef = useRef(null)
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [blog, setBlog] = useState(null);


    const [getCategories, setGetCategories] = useState([])

    const categoryOptions = getCategories.map((category, i) => {
        return { value: category._id, label: category.name }
    })

    const [id, setId] = useState(null);

    const [categories, setCategories] = useState([]);

    const [content, setContent] = useState('')

    const [banner, setBanner] = useState(null)
    const [bannerUrl, setBannerUrl] = useState(null)

    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)


    const getBlogs = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/blog', {
                method: "GET",
                headers: {
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
            document.getElementById('blogModel').setAttribute('open', true)
        } else {
            reset()
            setId(id)
            document.getElementById('blogModel').setAttribute('open', true)
            const res = await fetch(`/api/admin/blog?id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
            setBlog(data.blog)
            setPictureUrl(data.blog.picture)
            setBannerUrl(data.blog.banner)
        }
    }

    const reset = () => {
        setId(null)
        setBlog(null)

        setCategories([])
        setContent(null)

        setPicture(null);
        setPictureUrl(null)
        setBanner(null);
        setBannerUrl(null)
        formRef.current?.reset();
    }

    const modelClose = () => {
        document.getElementById('blogModel').removeAttribute('open');
        reset();
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const formData = new FormData(e.currentTarget)

            const categoryIds = categories.map((cat) => cat.value)
            formData.append('categories',categoryIds)
            formData.append('content',content)
            
            if (picture) formData.append("picture", picture);
            if (banner) formData.append("banner", banner);

            if (id) {
                const res = await fetch(`/api/admin/blog?id=${id}`, {
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

                const res = await fetch('/api/admin/blog', {
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
        } finally {
            setLoading(false)
            getBlogs()
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
                <h3 className="text-primary text-xl font-bold">Blog List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add Blog</button>

                <dialog id="blogModel" className="modal">
                    <div className="modal-box max-w-full">
                        <button onClick={() => modelClose()} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Blog</h3>

                        <form onSubmit={handleSubmit} ref={formRef} method="post">
                            <div className="grid grid-cols-2 gap-2 my-3">
                                <div className="col-span-2 form-control mb-3">
                                    <label className="floating-label">
                                        <input type="text" defaultValue={blog?.name ?? ''} placeholder="Title" name="title" className="input focus:input-primary w-full focus:border-0" />
                                    </label>
                                    {errors.title && <span className="text-error">{errors.title}</span>}
                                </div>

                                <div className="col-span-2 form-control mb-3">
                                    <MySelect instanceId="category-select" closeMenuOnSelect={false} isMulti onChange={(selectedOptions) => setCategories(selectedOptions)} options={categoryOptions} value={categories} />
                                    {errors.status && <span className="text-error">{errors.status}</span>}
                                </div>

                                <div className="col-span-2 grid gap-2 md:grid-cols-2">
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
                                                const file = e.target.files?.[0];
                                                setPicture(file);
                                                setPictureUrl(URL.createObjectURL(file));
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
                                                const file = e.target.files?.[0];
                                                setBanner(file);
                                                setBannerUrl(URL.createObjectURL(file));
                                            }} name="banner" className="file-input focus:file-input-primary border border- w-full focus:border-0" />
                                        </div>
                                        {errors.banner && <span className="text-error">{errors.banner}</span>}

                                    </div>
                                </div>

                                <div className="col-span-2 form-control mb-3">
                                    <label className="floating-label">
                                        <textarea defaultValue={blog?.description ?? ''} placeholder="Description" name="description" className="textarea focus:textarea-primary w-full focus:border-0" />
                                    </label>
                                    {errors.description && <span className="text-error">{errors.description}</span>}
                                </div>

                                <div className="col-span-2 form-control mb-3">
                                    <TextEditor initialValue={blog?.content} onChange={(content) => setContent(content)} />
                                    {errors.keywords && <span className="text-error">{errors.keywords}</span>}
                                </div>


                                <div className="col-span-2 form-control mb-3">
                                    <label className="floating-label">
                                        <textarea defaultValue={blog?.keywords ?? ''} placeholder="Keywords" name="keywords" className="textarea focus:textarea-primary w-full focus:border-0" />
                                    </label>
                                    {errors.keywords && <span className="text-error">{errors.keywords}</span>}
                                </div>

                                <div className="col-span-2 form-control mb-3">
                                    <label className="floating-label">
                                        <textarea defaultValue={blog?.tags ?? ''} placeholder="tags" name="tags" className="textarea focus:textarea-primary w-full focus:border-0" />
                                    </label>
                                    {errors.tags && <span className="text-error">{errors.tags}</span>}
                                </div>

                                <div className="form-control mb-3">
                                    <label className="floating-label">
                                        <select name="status" defaultValue={blog?.status ?? ''} placeholder="Status" className="select focus:select-primary w-full focus:border-0">
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
                                    <td>{blog?.categories.map((category, i) => (
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