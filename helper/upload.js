import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
// import { existsSync } from "fs";
export const FileUpload = async ({ dirpath, file, file_name = 'pervez' }) => {
  const dirFullPath = path.join(process.cwd(), "public/" + dirpath);
  if (!existsSync(dirFullPath)) {
    await mkdir(path.join(process.cwd(), "public/" + dirpath), { recursive: true });
  }

  // VALIDATION ---------------------
  // const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  // if (!allowedTypes.includes(file.type)) {
  //   return { error: "Only JPG, PNG, WEBP allowed!" };
  // }

  // if (file.size > 5 * 1024 * 1024) {
  //   return { error: "Max file size 5MB!" };
  // }

  // RENAME -------------------------
  const ext = file.name.split(".").pop();
  const fileName = `${file_name}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/" + dirpath, fileName);
  await writeFile(filePath, buffer);
  return `${dirpath}/${fileName}`;

}