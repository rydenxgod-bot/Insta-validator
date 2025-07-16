export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(200).json({
      status: "info",
      message: "👋 Welcome to the Instagram Username Validator API. To use it, add ?username=your_username in the URL.",
      example: "/api?username=the_sword_70"
    });
  }

  try {
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (response.status === 200) {
      return res.status(200).json({
        status: "success",
        message: `Username '${username}' is valid.`,
        username
      });
    } else if (response.status === 404) {
      return res.status(404).json({
        status: "fail",
        message: `Username '${username}' not found.`
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Unexpected error from Instagram."
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: "Failed to check username.",
      error: e.message
    });
  }
}