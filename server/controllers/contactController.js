const submitContact = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  console.log('Contact submission received:', { name, email, subject, message });

  return res.status(200).json({
    success: true,
    message: "Thanks for reaching out. We'll get back to you within 24 hours.",
  });
};

module.exports = { submitContact };
