// Robust Clipboard Copy and File Download Utilities

export function copyToClipboardSafe(text, onSuccess, onError) {
  if (!text) return false;

  // Try modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        fallbackCopy(text, onSuccess, onError);
      });
  } else {
    fallbackCopy(text, onSuccess, onError);
  }
  return true;
}

function fallbackCopy(text, onSuccess, onError) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      if (onSuccess) onSuccess();
    } else {
      if (onError) onError();
    }
  } catch (err) {
    console.error('Fallback copy failed', err);
    if (onError) onError();
  }
}

export function downloadTextFileSafe(filename, content) {
  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'omniai-result.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Download failed', err);
    return false;
  }
}

export function downloadCanvasImage(canvas, filename = 'ai-generated-artwork.png') {
  if (!canvas) return false;
  try {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Canvas download failed', err);
    return false;
  }
}
