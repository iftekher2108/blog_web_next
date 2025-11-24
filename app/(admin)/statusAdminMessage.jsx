"use client";

import { useMessage } from "./statusContext";
import { X } from "lucide-react";
import { useRef } from "react";

export default function StatusAdminMessage() {
  const { message, setMessage } = useMessage();
  const ref = useRef(null);
  if (!message) return null;



  return (
    <>
      { message &&
        <div role="alert" ref={ref} className="alert flex justify-between alert-success alert-soft mb-3">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="btn rounded-full"><X size={16} /></button>
        </div>
      }
    </>

  );
}