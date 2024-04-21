const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next);
    } catch (error) {
        console.log("******** Inside AsyncHandler ********");
        console.log("Error: ", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export { asyncHandler };
