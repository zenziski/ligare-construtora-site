export function createSlug(str: string) {
    if (!str) return
    if (str === "Home") return ""
    const normalizedStr = str
        .normalize("NFD") // Normalize the string to decomposed form
        .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks

    return normalizedStr
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
}