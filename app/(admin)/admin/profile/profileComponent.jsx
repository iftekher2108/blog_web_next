'use client'
import { useState, useEffect } from "react";
import { useUser } from "../../userContext";
import { useMessage } from "../../statusContext";

export default function ProfileComponent({ token }) {
    const { user, setUser } = useUser();
    const { setMessage } = useMessage();

    // if user hasn't loaded yet, show simple loader
    if (!user) {
        return <div className="p-4">Loading profile...</div>;
    }

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [mobile, setMobile] = useState(user?.mobile || "");
    const [password, setPassword] = useState("");

    const [picture, setPicture] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(user?.picture ? `/${user.picture}` : null);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // when user context updates (login), populate local state
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setMobile(user.mobile || "");
            setPictureUrl(user.picture ? `/${user.picture}` : null);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("mobile", mobile);
            if (password) formData.append("password", password);
            if (picture) formData.append("picture", picture);

            const res = await fetch(`/api/admin/user?id=${user?._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.message) {
                    setMessage(data.message);
                }
                return;
            }

            // update user context & localStorage
            const updated = { ...user, ...data.user };
            // ensure we keep new fields even if not returned
            updated.name = name;
            updated.email = email;
            updated.mobile = mobile;
            setUser(updated);
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(updated));
            }

            setMessage(data.message || "Profile updated");
            setPassword("");
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h3 className="text-primary text-xl font-bold mb-4">My Profile</h3>
            {errors.message && (
                <div role="alert" className="alert alert-error alert-soft mb-3">
                    <span>{errors.message}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">Picture (150x150 px)</label>
                    {pictureUrl && (
                        <img src={pictureUrl} className="rounded mb-3" height={80} alt="profile" />
                    )}
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setPicture(file);
                            setPictureUrl(URL.createObjectURL(file));
                        }}
                        name="picture"
                        className="file-input focus:file-input-primary w-full"
                    />
                    {errors.picture && <p className="text-error">{errors.picture}</p>}
                </div>

                <div className="form-control">
                    <label className="floating-label">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            name="name"
                            className="input focus:input-primary w-full"
                        />
                    </label>
                    {errors.name && <span className="text-error">{errors.name}</span>}
                </div>

                <div className="form-control">
                    <label className="floating-label">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            name="email"
                            className="input focus:input-primary w-full"
                        />
                    </label>
                    {errors.email && <span className="text-error">{errors.email}</span>}
                </div>

                <div className="form-control">
                    <label className="floating-label">
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Mobile"
                            name="mobile"
                            className="input focus:input-primary w-full"
                        />
                    </label>
                    {errors.mobile && <span className="text-error">{errors.mobile}</span>}
                </div>

                <div className="form-control">
                    <label className="floating-label">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            name="password"
                            className="input focus:input-primary w-full"
                        />
                    </label>
                    {errors.password && <span className="text-error">{errors.password}</span>}
                </div>

                <div className="flex justify-end">
                    <button className="btn btn-primary" disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-md"></span> : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
}
