'use client'
import { Plus, Pencil, Trash } from "lucide-react"
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useMessage } from "../../statusContext";

export default function SliderComponent({ token }) {
    return (
        <>


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
                            {/* {categories.map((category, i) => (
                                <tr key={category._id}>
                                    <td>{i + 1}</td>
                                    <td>{category.picture && <Image src={`/${category.picture}`} className="rounded" width={80} height={80} alt={`${category.name}`} />}</td>
                                    <td>{category.banner && <Image src={`/${category.banner}`} className="rounded" width={80} height={80} alt={`${category.name}`} />}</td>
                                    <td>{category.name}</td>
                                    <td><span className={`badge ${category.status == 'active' ? 'badge-success' : 'badge-error'}`}>{category.status} </span></td>
                                    <td>
                                        <button onClick={() => modelOpen(category._id)} className="btn btn-sm btn-info me-1"><Pencil size={15} /></button>
                                        <button onClick={() => handleDelete(category._id)} className="btn btn-sm btn-error me-1"><Trash size={15} /></button>

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
