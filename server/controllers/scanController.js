const KNOWN_SAFE = ['google.com', 'github.com', 'stackoverflow.com', 'microsoft.com', 'apple.com', 'mozilla.org', 'wikipedia.org', 'anthropic.com'];
const KNOWN_SUSPICIOUS = ['bit.ly', 'tinyurl.com', 't.co'];

const scanUrl = (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL is required.' });
  }

  let parsedDomain;
  try {
    parsedDomain = new URL(url).hostname.replace('www.', '');
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid URL format.' });
  }

  // Simulate analysis
  let status, risk, score, message, checks;

  if (KNOWN_SAFE.includes(parsedDomain)) {
    status = 'safe';
    risk = 'low';
    score = 98;
    message = 'This URL is from a well-known, trusted domain with a verified security record.';
    checks = { ssl: true, reputation: true, malware: false, phishing: false };
  } else if (KNOWN_SUSPICIOUS.includes(parsedDomain)) {
    status = 'suspicious';
    risk = 'medium';
    score = 42;
    message = 'Shortened URLs obscure the destination. Proceed with caution.';
    checks = { ssl: true, reputation: false, malware: false, phishing: false };
  } else if (url.includes('login') || url.includes('secure') || url.includes('verify')) {
    status = 'high_risk';
    risk = 'high';
    score = 18;
    message = 'This URL contains patterns commonly associated with phishing attempts.';
    checks = { ssl: false, reputation: false, malware: false, phishing: true };
  } else {
    const rand = Math.random();
    if (rand > 0.6) {
      status = 'safe'; risk = 'low'; score = 87;
      message = 'No known threats detected. Domain reputation appears clean.';
      checks = { ssl: true, reputation: true, malware: false, phishing: false };
    } else if (rand > 0.3) {
      status = 'low_risk'; risk = 'low';  score = 71;
      message = 'Domain is relatively new with limited history. No active threats found.';
      checks = { ssl: true, reputation: false, malware: false, phishing: false };
    } else {
      status = 'medium_risk'; risk = 'medium'; score = 44;
      message = 'Some risk signals detected. Avoid entering sensitive information on this site.';
      checks = { ssl: false, reputation: false, malware: false, phishing: false };
    }
  }

  return res.status(200).json({
    success: true,
    url,
    domain: parsedDomain,
    status,
    risk,
    score,
    message,
    checks,
    scannedAt: new Date().toISOString(),
  });
};

module.exports = { scanUrl };
