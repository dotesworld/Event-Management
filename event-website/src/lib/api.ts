export type ApiResult<T> = { data: T } | { error: string; status?: number };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

let inMemoryToken: string | null = null;

export const authToken = {
  set(token: string | null) {
    inMemoryToken = token;
    if (typeof window !== 'undefined' && token) {
      sessionStorage.setItem('auth_token', token);
    }
    if (typeof window !== 'undefined' && token === null) {
      sessionStorage.removeItem('auth_token');
    }
  },
  get() {
    if (inMemoryToken) return inMemoryToken;
    if (typeof window !== 'undefined') {
      const t = sessionStorage.getItem('auth_token');
      if (t) inMemoryToken = t;
    }
    return inMemoryToken;
  }
};

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  const token = authToken.get();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      credentials: 'omit',
    });

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const message = isJson && (body?.message || body?.error) ? (body.message || body.error) : res.statusText;
      return { error: message || 'Request failed', status: res.status };
    }

    return { data: body as T };
  } catch (e: any) {
    return { error: e?.message || 'Network error' };
  }
}

export const api = {
  // Auth
  register: (payload: { name: string; email: string; password: string }) =>
    request<{ user: any; token: string }>(`/auth/register`, { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    request<{ user: any; token: string }>(`/auth/login`, { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request<{ message: string }>(`/auth/logout`, { method: 'POST' }),
  me: () => request<any>(`/auth/me`, { method: 'GET' }),

  // Events
  listEvents: (params?: { search?: string; published_only?: boolean; per_page?: number; page?: number }) => {
    const search = new URLSearchParams();
    if (params?.search) search.set('search', params.search);
    if (params?.published_only) search.set('published_only', '1');
    if (params?.per_page) search.set('per_page', String(params.per_page));
    if (params?.page) search.set('page', String(params.page));
    const qs = search.toString();
    return request<any>(`/events${qs ? `?${qs}` : ''}`, { method: 'GET' });
  },
  getEvent: (id: number | string) => request<any>(`/events/${id}`, { method: 'GET' }),
  createEvent: (payload: any) => request<any>(`/events`, { method: 'POST', body: JSON.stringify(payload) }),
  updateEvent: (id: number | string, payload: any) => request<any>(`/events/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteEvent: (id: number | string) => request<{ message: string }>(`/events/${id}`, { method: 'DELETE' }),

  // Tickets
  listTickets: (eventId: number | string) => request<any[]>(`/events/${eventId}/tickets`, { method: 'GET' }),
  getTicket: (eventId: number | string, ticketId: number | string) => request<any>(`/events/${eventId}/tickets/${ticketId}`, { method: 'GET' }),
  createTicket: (eventId: number | string, payload: any) => request<any>(`/events/${eventId}/tickets`, { method: 'POST', body: JSON.stringify(payload) }),
  updateTicket: (eventId: number | string, ticketId: number | string, payload: any) => request<any>(`/events/${eventId}/tickets/${ticketId}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteTicket: (eventId: number | string, ticketId: number | string) => request<{ message: string }>(`/events/${eventId}/tickets/${ticketId}`, { method: 'DELETE' }),

  // Registrations
  listRegistrations: (params?: { event_id?: number|string; status?: string; search?: string; per_page?: number; page?: number }) => {
    const search = new URLSearchParams();
    if (params?.event_id) search.set('event_id', String(params.event_id));
    if (params?.status) search.set('status', params.status);
    if (params?.search) search.set('search', params.search);
    if (params?.per_page) search.set('per_page', String(params.per_page));
    if (params?.page) search.set('page', String(params.page));
    const qs = search.toString();
    return request<any>(`/registrations${qs ? `?${qs}` : ''}`, { method: 'GET' });
  },
  getRegistration: (registrationId: number | string) => request<any>(`/registrations/${registrationId}`, { method: 'GET' }),
  updateRegistration: (registrationId: number | string, payload: any) => request<any>(`/registrations/${registrationId}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteRegistration: (registrationId: number | string) => request<{ message: string }>(`/registrations/${registrationId}`, { method: 'DELETE' }),
  checkIn: (registrationId: number | string) => request<{ message: string }>(`/registrations/${registrationId}/check-in`, { method: 'POST' }),
  checkInByReference: (reference: string) => request<{ message: string; registration?: any }>(`/registrations/check-in-by-reference`, { method: 'POST', body: JSON.stringify({ reference }) }),
};