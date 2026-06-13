const responses = {
  password: "Use a passphrase of 16+ characters combining words, numbers, and symbols. A password manager like Bitwarden or 1Password handles the heavy lifting so you don't have to remember them all.",
  phishing: "Phishing emails typically create urgency, use slightly misspelled domains, and ask for credentials. Hover over links before clicking, and verify sender addresses carefully. When in doubt, go directly to the site.",
  vpn: "A VPN encrypts your traffic between your device and the VPN server — useful on public Wi-Fi. It doesn't make you anonymous online, and your VPN provider can still see your activity.",
  malware: "Keep your OS and apps updated, avoid downloading from untrusted sources, and use reputable antivirus software. On Windows, Windows Defender is solid. On Mac, Malwarebytes is worth having.",
  '2fa': "Two-factor authentication adds a second layer beyond your password. Use an authenticator app (Authy, Google Authenticator) rather than SMS when possible — SIM-swapping attacks can bypass SMS 2FA.",
  wifi: "On public Wi-Fi, avoid accessing banking or sensitive accounts without a VPN. Attackers can set up fake hotspots that look legitimate. Always verify the exact network name with staff.",
  default: "I can help with password security, phishing detection, VPN usage, malware protection, two-factor authentication, and safe Wi-Fi practices. What would you like to know?",
};

const getReply = (message) => {
  const lower = message.toLowerCase();
  if (lower.includes('password') || lower.includes('passphrase')) return responses.password;
  if (lower.includes('phish') || lower.includes('email') || lower.includes('scam')) return responses.phishing;
  if (lower.includes('vpn') || lower.includes('virtual private')) return responses.vpn;
  if (lower.includes('malware') || lower.includes('virus') || lower.includes('antivirus')) return responses.malware;
  if (lower.includes('2fa') || lower.includes('two factor') || lower.includes('authenticat')) return responses['2fa'];
  if (lower.includes('wifi') || lower.includes('wi-fi') || lower.includes('public network')) return responses.wifi;
  return responses.default;
};

const chat = (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Message is required.' });
  }

  // Simulate processing delay context
  const reply = getReply(message);

  return res.status(200).json({
    success: true,
    reply,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { chat };
