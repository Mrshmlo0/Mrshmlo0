// Helper utility to store and retrieve user deliverables in localStorage
const VAULT_STORAGE_KEY = 'omniai_user_deliverables_vault';

export function saveDeliverableToVault(item) {
  try {
    const existing = getVaultDeliverables();
    const deliverable = {
      id: item.id || `DELIV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      category: item.category || 'عام', // 'visual' | 'marketing' | 'resume' | 'ecommerce' | 'legal' | 'catalog' | 'incubator'
      title: item.title || 'منتج ذكي جديد',
      summary: item.summary || '',
      inputs: item.inputs || {},
      outputs: item.outputs || {},
      downloadType: item.downloadType || 'txt', // 'png' | 'pdf' | 'txt' | 'json'
      fileData: item.fileData || null, // data URL for PNG or text content
      agentTeam: item.agentTeam || ['الوكيل الاستراتيجي', 'وكيل الصياغة', 'وكيل التدقيق الجودوي']
    };

    const updated = [deliverable, ...existing];
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(updated.slice(0, 100))); // keep up to 100 recent
    window.dispatchEvent(new CustomEvent('omniai_vault_updated', { detail: updated }));
    return deliverable;
  } catch (e) {
    console.error('Failed to save deliverable to vault:', e);
    return null;
  }
}

export function getVaultDeliverables() {
  try {
    const data = localStorage.getItem(VAULT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to get deliverables from vault:', e);
    return [];
  }
}

export function deleteVaultDeliverable(id) {
  try {
    const existing = getVaultDeliverables();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('omniai_vault_updated', { detail: updated }));
    return updated;
  } catch (e) {
    console.error('Failed to delete deliverable:', e);
    return [];
  }
}

export function clearVaultDeliverables() {
  try {
    localStorage.removeItem(VAULT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('omniai_vault_updated', { detail: [] }));
    return [];
  } catch (e) {
    console.error('Failed to clear vault:', e);
    return [];
  }
}
