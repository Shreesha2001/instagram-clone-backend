const pool = require("../../db/postgres");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const TWILIO_VERIFY_API_KEY = "43000842eec000b9b1a55a4c76fed5b3";

// Login using OTP function
const loginUsingOTP = async (req, res) => {
	const { phone, otp } = req.body;

	if (!phone || !otp) {
		return res.status(400).json({
			error: "Phone number and OTP are required!",
		});
	}

	try {
		const client = await pool.connect();

		// Check if the user exists
		const userQuery = await client.query(
			`SELECT * FROM users WHERE phno = $1;`,
			[phone]
		);
		const user = userQuery.rows[0];

		if (!user) {
			// If user does not exist, redirect to registration process
			return res.status(400).json({
				error: "User is not registered. Please sign up first.",
				redirect: "/register", // Redirect to registration page
			});
		}

		// Verify OTP using Twilio Verify API
		const verifyResult = await verifyOTPWithTwilio(phone, otp);

		if (verifyResult.success) {
			// Generate JWT token
			const token = jwt.sign(
				{
					userId: user.id,
					username: user.username,
				},
				process.env.SECRET_KEY || "12345"
			);

			return res.status(200).json({
				message: "User signed in!",
				token: token,
			});
		} else {
			return res.status(400).json({
				error: "Invalid OTP. Please try again.",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Database error occurred while signing in!",
		});
	}
};

// Function to verify OTP using Twilio Verify API
const verifyOTPWithTwilio = async (phone, otp) => {
	try {
		const response = await axios.post(
			`https://verify.twilio.com/v2/Services/VA4f3880db2a5e132d4b84a73cdfcc18f5/Verifications/VE1a3055b9bde720025fc671501786113f`,
			{
				to: phone,
				code: otp,
			},
			{	
				auth: {
					username: TWILIO_VERIFY_API_KEY,
					password: "",
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error verifying OTP with Twilio:", error);
		throw error;
	}
};

module.exports = { loginUsingOTP, verifyOTPWithTwilio };
