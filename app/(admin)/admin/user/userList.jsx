'use client'

export default function UserList() {
  
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
            
        </>


    )

}
