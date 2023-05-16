export const emailRegex = (v: string) => v.replace(/[^A-Z-0-9_.-@]/gi, "").replace(/;/i, "");
export const latinRegex = (v: string) => v.replace(/[^A-Z-0-9_]/gi, "");
export const nameRegex = (v: string) => v.replace(/[^A-Z-0-9 ]/gi, "");
