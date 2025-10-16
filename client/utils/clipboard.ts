export async function pasteFromClipboard(): Promise<string | null> {
  try {
    // navigator.clipboard may be unavailable in some contexts; guard it
    if (!navigator.clipboard || !navigator.clipboard.readText) return null;
    const text = await navigator.clipboard.readText();
    return text || null;
  } catch (e) {
    console.error('clipboard read failed', e);
    return null;
  }
}
