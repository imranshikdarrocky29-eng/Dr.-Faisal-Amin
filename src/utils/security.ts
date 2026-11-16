import { ClinicalAuditLog, UserRole } from '../types';

const AUDIT_STORAGE_KEY = 'fa_ortho_hipaa_audit_trail_v1';

export function recordAuditLog(
  actorRole: UserRole,
  actorName: string,
  action: string,
  resourceId: string
): ClinicalAuditLog {
  const newLog: ClinicalAuditLog = {
    id: 'audit-' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    actorRole,
    actorName,
    action,
    resourceId,
    hipaaVerified: true
  };

  try {
    const existing = localStorage.getItem(AUDIT_STORAGE_KEY);
    const parsed: ClinicalAuditLog[] = existing ? JSON.parse(existing) : [];
    parsed.unshift(newLog);
    // Keep last 100 entries
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(parsed.slice(0, 100)));
  } catch {
    // LocalStorage fallback
  }

  return newLog;
}

export function getAuditLogs(): ClinicalAuditLog[] {
  try {
    const existing = localStorage.getItem(AUDIT_STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

/**
 * Format pain VAS score with medical color code
 */
export function getVasScoreBadge(score: number): { text: string; bg: string; color: string } {
  if (score <= 2) {
    return { text: `${score}/10 - Mild`, bg: 'bg-emerald-50 border-emerald-200', color: 'text-emerald-700' };
  } else if (score <= 5) {
    return { text: `${score}/10 - Moderate`, bg: 'bg-amber-50 border-amber-200', color: 'text-amber-700' };
  } else if (score <= 7) {
    return { text: `${score}/10 - Severe`, bg: 'bg-orange-50 border-orange-200', color: 'text-orange-700' };
  } else {
    return { text: `${score}/10 - Intolerable`, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-700' };
  }
}
