// ✅ Convert Google Drive share link into inline displayable image
export function convertGoogleDriveUrl(url) {
  if (!url) return "";
  const match = url.match(/\/d\/([^/]+)/); // Extract file ID
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}`;
  }
  return url;
}
