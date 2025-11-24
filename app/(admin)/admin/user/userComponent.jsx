'use client'
import { Trash, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { useMessage } from "../../statusContext";

import { useEffect, useState, useCallback } from "react"
export default function UserComponent({ token }) {
    const { setMessage } = useMessage();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})


    const [id, setId] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');

    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)



    const getUsers = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/user");
            const data = await res.json();
            setUsers(data.users || []);
            console.log(users)
        } catch (err) {
            console.error("Failed to fetch users:", err);
        }
    })

    useEffect(() => {
        getUsers();
    }, [])

    const reset = () => {
        setId(null);
        setName('');
        setEmail('');
        setMobile('');
        setRole('user');
        setPassword('');

        setPicture(null);
        setPictureUrl(null)
        document.querySelector('input[type="file"]').value = null;

    }

    const modelOpen = async (id = null) => {
        if (id == null) {
            reset()
            document.getElementById('userModel').setAttribute('open', true)
        } else {
            reset()
            setId(id)
            document.getElementById('userModel').setAttribute('open', true)
            const res = await fetch(`/api/admin/user?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
            setId(data.user._id)
            setName(data.user.name)
            setPictureUrl(data.user.picture)
            setEmail(data.user.email)
            setMobile(data.user.mobile)
            setRole(data.user.role)
        }
    }

    const modelClose = () => {
        document.getElementById('userModel').removeAttribute('open');
        reset();
    }


    const handleSubmit = async () => {
        setLoading(true)
        setErrors({})
        try {
            const formData = new FormData()
            formData.append("name", name);
            formData.append("email", email);
            formData.append("mobile", mobile);
            formData.append("role", role);
            formData.append("password", password);
            if (picture) formData.append("picture", picture);
            if (id) {
                const res = await fetch(`/api/admin/user?id=${id}`, {
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
                        setMessage(data.message);
                        // setErrors({ message: data.message }); // single error case
                    }
                    return;
                }
                console.log("Update success:", data);
                setMessage(data.message);
            } else {
                const res = await fetch('/api/admin/user', {
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
                        setMessage(data.message);
                        // setErrors({ message: data.message }); // single error case
                    }
                    return;
                }
                setMessage(data.message);
                console.log("Create success:", data);
            }
            modelClose()
        }
        catch (err) {
            setMessage("Something went wrong"+ err)
        } finally {
            setLoading(false)
            getUsers()
        }
    }


    const handleDelete = async (id) => {
           if (!confirm("Are you sure you want to delete this User?")) {
            return;
        }
        try {
            const res = await fetch(`/api/admin/user?id=${id}`, {
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
                    setMessage(data.message);
                }
                return;
            }
            console.log("delete success:", data)
            setMessage(data.message);
        } catch (error) {
            console.error('Failed to delete user:', error)
            setMessage(error);
        } finally {
            getUsers()
        }
    }



    return (
        <>

            {/* {
                errors.message && <div role="alert" className={`alert alert-error alert-soft mb-3`}>
                    <span>{errors.message}</span>
                </div>
            } */}
            <div className="flex justify-between">
                <h3 className="text-primary text-xl font-bold">User List</h3>
                <button onClick={() => modelOpen()} className="btn btn-primary"><Plus size={20} /> Add User</button>

                <dialog id="userModel" className="modal">
                    <div className="modal-box">
                        <button onClick={() => modelClose()} className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">User</h3>
                        <div className="my-3">

                            <div className="form-control mb-3">
                                <label className="label">Picture (150x150 px)</label>
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
                                {errors.picture && <p className="text-error">{errors.picture}</p>}
                            </div>

                            <div className="form-control mb-3">
                                <label className="floating-label">
                                    <input type="text" value={name ?? ''} onChange={(e) => setName(e.target.value)} placeholder="Name" name="name" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.name && <span className="text-error">{errors.name}</span>}
                            </div>

                            <div className="form-control mb-3">
                                <label className="floating-label">
                                    <input type="email" value={email ?? ''} onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.email && <span className="text-error">{errors.email}</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1 form-control mb-3">
                                    <label className="floating-label">
                                        <input type="text" value={mobile ?? ''} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" name="mobile" className="input focus:input-primary w-full focus:border-0" />
                                    </label>
                                    {errors.mobile && <span className="text-error">{errors.mobile}</span>}
                                </div>

                                <div className="col-span-1 form-control mb-3">
                                    <label className="floating-label">
                                        <select name="role" value={role ?? ""} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="select focus:select-primary w-full focus:border-0">
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                            <option value="user">User</option>
                                        </select>
                                    </label>
                                    {errors.role && <span className="text-error">{errors.role}</span>}
                                </div>
                            </div>



                            <div className="form-control mb-3">
                                <label className="floating-label">
                                    <input type="text" value={password ?? ''} onChange={(e) => setPassword(e.target.value)} placeholder="Password" name="password" className="input focus:input-primary w-full focus:border-0" />
                                </label>
                                {errors.password && <span className="text-error">{errors.password}</span>}
                            </div>


                            <div className="flex justify-end">
                                <button onClick={handleSubmit} className="btn btn-primary">{loading ? <span className="loading loading-spinner loading-md"></span> : "Submit"}</button>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>



            <div className="mt-5">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-primary">
                            <tr>
                                <th>Sl</th>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.picture && <Image src={`/${user.picture}`} className="rounded" width={80} height={80} alt={`${user.name}`} />}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><button onClick={()=> modelOpen(user._id)} className="btn btn-sm me-2 btn-info"><Pencil size={15} /></button>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-error"><Trash size={15} /></button>
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