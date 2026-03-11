export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
    ) {
        super(message);
        this.name = "AppError";
    }
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred";
}

export function handleApiError(error: unknown): {
    message: string;
    statusCode: number;
} {
    if (error instanceof AppError) {
        return { message: error.message, statusCode: error.statusCode };
    }
    if (error instanceof Error) {
        return { message: error.message, statusCode: 500 };
    }
    return { message: "An unexpected error occurred", statusCode: 500 };
}
