export async function deleteProfile(req, res) {
  try {
    const profileId = req.params.profileId;

    // Find the profile to be deleted
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // VULNERABILITY: Commenting out the ownership check
    /*
    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    */

    // Delete the profile
    await Profile.findByIdAndDelete(profileId);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
