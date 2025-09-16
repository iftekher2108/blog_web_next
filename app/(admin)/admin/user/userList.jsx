'use client'
import { useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";
export default function UserList() {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState()
    useEffect(() => {
        fetchUsers();
    }, [])
    async function fetchUsers() {
        try {
            const res = await fetch("/api/admin/user");
            const data = await res.json();
            setUsers(data.users || []);
            console.log(users)
        } catch (err) {
            console.error("Failed to fetch users:", err);
        }
    }

    async function deleteUser(user_id) {
        const res = await fetch('/api/admin/user', {
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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary">
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td><button className="btn btn-sm me-2 btn-info"><Pencil size={15} /></button>
                                    <button onClick={() => deleteUser(user._id)} className="btn btn-sm btn-error"><Trash size={15} /></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>


    )

}
