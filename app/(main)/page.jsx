import Image from "next/image";
import { cookies } from "next/headers";

export default function Home() {
   const cookieStore = cookies();
  const errorMsg = cookieStore.get("error")?.value;

  return (
    <>
    {errorMsg && (
        <p style={{ color: "red" }}>{errorMsg}</p>
      )}
    home page 
    </>
  );
}
