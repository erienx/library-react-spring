async function uploadCoverFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("cover", file);

    const response = await fetch("http://localhost:8080/covers/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    const path = await response.text();
    return path;
}
export default uploadCoverFile;