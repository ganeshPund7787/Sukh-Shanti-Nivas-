export const errorMiddleware = async (
  err: any,
  req: any,
  res: any,
  next: any
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
