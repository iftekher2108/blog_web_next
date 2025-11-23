"use client";

import { useMessage } from "./statusContext";
import { X } from "lucide-react";
import { useRef } from "react";

export default function StatusAdminMessage() {
  const { message } = useMessage();
  const ref = useRef(null);
  if (!message) return null;



  return (
    <div role="alert" ref={ref} className="alert alert-error alert-soft mb-3">
      <span>{message}</span>
      <button onClick={()=> ref.current.style.display = 'none' } className="btn btn-primary"><X size={16} /></button>
    </div>
  );
}