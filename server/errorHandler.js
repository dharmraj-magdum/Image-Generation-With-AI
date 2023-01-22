//acts like our own exception handler
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	console.log("error with ", statusCode);
	res.status(statusCode).json({
		message: err.message,
		details: process.env.MODE === "developement" ? err.stack : null,
	});
};

module.exports = { errorHandler };

// export default errorHandler;
