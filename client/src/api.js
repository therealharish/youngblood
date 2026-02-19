// In development, Vite proxy handles /api → localhost:3001
// In production, VITE_API_URL points to the Render backend
const API_BASE = import.meta.env.VITE_API_URL || '';

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
