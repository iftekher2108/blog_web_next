'use client'
import { Plus, Pencil, Trash } from "lucide-react"
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useMessage } from "../../statusContext";

export default function SliderComponent({ token }) {

    const { setMessage } = useMessage();
    const [sliders, setSliders] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [id, setId] = useState(null)
    const [slider, setSlider] = useState()

    // const [title, setTitle] = useState('')
    // const [subTitle, setSubTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [action1, setAction1] = useState('')
    // const [action2, setAction2] = useState('')
    // const [status, setStatus] = useState('active')
    // const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)



    const getSliders = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/slider', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json();
            setSliders(data.sliders || []);
            console.log(sliders);

        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    })

    useEffect(() => {
        getSliders();
    }, [])


    const reset = () => {
        setId(null);
        setPictureUrl(null);
        setSlider(null);
        setErrors({});
        document.querySelector('input[type="file"]').value = null;
    }


    const modelOpen = async (id = null) => {
        if (id == null) {
            reset()
            document.getElementById('sliderModel').setAttribute('open', true)
        } else {
            reset()
            setId(id)
            document.getElementById('sliderModel').setAttribute('open', true)
            const res = await fetch(`/api/admin/slider?id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
            setSlider(data.slider)
            setPictureUrl(slider.picture)
        }
    }

    const modelClose = () => {
        document.getElementById('sliderModel').removeAttribute('open');
        reset();
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        try {
            const formData = new FormData(e.currentTarget)
            if (picture) formData.append("picture", picture);
            if (id) {
                const res = await fetch(`/api/admin/slider?id=${id}`, {
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

                const res = await fetch('/api/admin/slider', {
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
                <h3 className="text-primary text-xl font-bold">Slider List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add Category</button>

                <dialog id="sliderModel" className="modal">
                    <div className="modal-box max-w-1/2">
                        <button onClick={() => modelClose()} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Slider</h3>
                        <form onSubmit={handleSubmit} method="post">

                            <div className="my-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="floating-label">
                                                <input type="text" defaultValue={slider?.title ?? ''} placeholder="Title" name="title" className="input focus:input-primary w-full focus:border-0" />
                                            </label>
                                            {errors.title && <span className="text-error">{errors.title}</span>}
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="floating-label">
                                                <input type="text" defaultValue={slider?.subTitle ?? ''} placeholder="Sub Title" name="subTitle" className="input focus:input-primary w-full focus:border-0" />
                                            </label>
                                            {errors.subTitle && <span className="text-error">{errors.subTitle}</span>}
                                        </div>
                                    </div>

                                </div>



                                <div className="grid gap-2 md:grid-cols-1">
                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="label">Picture (1920x1280 px)</label>
                                            {/* Else If editing and existing URL exists → preview old image */}
                                            {pictureUrl && (
                                                <img
                                                    src={`${pictureUrl}`}
                                                    className="rounded mb-3"
                                                    height={80}
                                                    alt="picture"
                                                />
                                            )}
                                            <input type="file" onChange={(e) => setPictureUrl(URL.createObjectURL(e.target.files?.[0]))} name="picture" className="file-input focus:file-input-primary border border- w-full focus:border-0" />
                                        </div>
                                        {errors.picture && <span className="text-error">{errors.picture}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="floating-label">
                                                <input type="text" defaultValue={slider?.actionLink ?? ''} placeholder="Action Link" name="actionLink" className="input focus:input-primary w-full focus:border-0" />
                                            </label>
                                            {errors.actionLink && <span className="text-error">{errors.actionLink}</span>}
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <div className="form-control mb-3">
                                            <label className="floating-label">
                                                <input type="text" defaultValue={slider?.actionLabel ?? ''} placeholder="Action Label" name="actionLabel" className="input focus:input-primary w-full focus:border-0" />
                                            </label>
                                            {errors.actionLabel && <span className="text-error">{errors.actionLabel}</span>}
                                        </div>
                                    </div>

                                </div>

                                <div className="form-control mb-3">
                                    <label className="floating-label">
                                        <select name="status" defaultValue={slider?.status ?? ''} placeholder="Status" className="select focus:select-primary w-full focus:border-0">
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
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sliders.map((slider, i) => (
                                <tr key={slider._id}>
                                    <td>{i + 1}</td>
                                    <td>{slider.picture && <Image src={`/${slider.picture}`} className="rounded" width={80} height={80} alt={`${slider.title}`} />}</td>
                                    <td>{slider.name}</td>
                                    <td><span className={`badge ${slider.status == 'active' ? 'badge-success' : 'badge-error'}`}>{slider.status} </span></td>
                                    <td>
                                        <button onClick={() => modelOpen(slider._id)} className="btn btn-sm btn-info me-1"><Pencil size={15} /></button>
                                        {/* <button onClick={() => handleDelete(slider._id)} className="btn btn-sm btn-error me-1"><Trash size={15} /></button> */}

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
