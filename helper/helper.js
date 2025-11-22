import path from "path";
import fs from "fs/promises";

export const safeDelete = async(filePath) => {
    try {
        const fullPath = path.join(process.cwd(),'public',filePath);
        await fs.unlink(fullPath);
    } catch (error) {
        console.error("error deleting file:", error);
    }
}