// vulnerable.controller.js
export async function vulnerableLogin(req, res) {
  try {
    // VULNERABILITY: Directly using req.body.email without ensuring it's a string
    // An attacker can now pass an object like {"$gt": ""}
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    // VULNERABILITY: Similarly, the password check is bypassed if the find logic 
    // above was manipulated to return the first user (often the admin).
    const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
    
    // if (!isPasswordCorrect) {
    //    return res.status(404).json({ success: false, message: "Invalid credentials" });
    // }

    const defaultProfile = await Profile.findOne({ userId: user._id });
    const userWithoutPassword = { ...user._doc, password: "" };

    // ... rest of your original token generation logic
    const payload = { userId: user._id.toString(), profileId: defaultProfile?._id.toString() };
    generateTokenAndSetCookie(payload, res, "15d");
    
    res.status(200).json({ success: true, user: userWithoutPassword });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}