 const LoginAuth=async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.send(`<script>alert('All fields are mandatory'); window.location.href="/";</script>`);
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.send(`<script>alert('User already exists'); window.location.href="/";</script>`);
    }

    // store temp data
    req.session.userDetails = { userName, email, password };

    let otp = Math.floor(1000 + Math.random() * 9000);
    req.session.OTP = otp;

    // ✅ FIX: ensure function is called correctly
    GmailOtp(email, otp);

    res.send(`<script>alert('OTP has been sent to your email adress'); window.location.assign('/otppage')</script>`);

  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
}
module.exports=LoginAuth