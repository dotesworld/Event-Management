'use client';

import { useEffect, useMemo, useState } from 'react';
import { api, authToken } from '@/lib/api';
import ContentManager from '@/components/ContentManager';

type EventItem = any;
type TicketItem = any;

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState<number | string | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  // Login form state
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [authLoading, setAuthLoading] = useState(false);

  // Create Event form state (minimal)
  const [newEvent, setNewEvent] = useState({
    title: '',
    starts_at: '', // ISO string or 'YYYY-MM-DD HH:mm:ss'
    is_published: false,
  });
  const [createEventLoading, setCreateEventLoading] = useState(false);

  // Create Ticket form state (for selected event)
  const [newTicket, setNewTicket] = useState({
    type: '',
    price: '',
    quantity: '',
    is_active: true,
  });
  const [createTicketLoading, setCreateTicketLoading] = useState(false);

  // Registrations state & filters
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [regSearch, setRegSearch] = useState('');
  const [regStatus, setRegStatus] = useState<string>('');
  const [regEventId, setRegEventId] = useState<number | string | ''>('');

  // Admin navigation state
  type AdminSection =
    | 'dashboard'
    | 'events'
    | 'tickets'
    | 'registrations'
    | 'invoices'
    | 'users'
    | 'settings'
    | 'reports'
    | 'content';
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  // Helper: section titles for header
  const sectionTitle: Record<AdminSection, string> = {
    dashboard: 'Dashboard',
    events: 'Events',
    tickets: 'Tickets',
    registrations: 'Registrations',
    invoices: 'Invoices',
    users: 'Users & Admins',
    settings: 'Settings',
    reports: 'Reports',
    content: 'Content',
  };
  useEffect(() => {
    // Initialize token from api helper
    const t = authToken.get();
    if (t) setToken(t);
  }, []);

  const isAuthed = useMemo(() => !!token, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAuthLoading(true);
    try {
      const res = await api.login({ email, password });
      if ('error' in res) {
        setError(res.error || 'Login failed');
        return;
      }
      const { token: t } = res.data;
      authToken.set(t);
      setToken(t);
      await loadEvents();
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    authToken.set(null);
    setToken(null);
    setEvents([]);
    setSelectedEventId(null);
    setTickets([]);
  };

  const loadEvents = async () => {
    setEventsLoading(true);
    setError(null);
    try {
      const res = await api.listEvents({ per_page: 100 });
      if ('error' in res) {
        setError(res.error || 'Failed to load events');
        return;
      }
      // Laravel pagination structure: { data: [...], current_page, ... }
      const payload = res.data;
      const items = Array.isArray(payload) ? payload : payload.data || [];
      setEvents(items);
    } finally {
      setEventsLoading(false);
    }
  };

  const selectEvent = async (eventId: number | string) => {
    setSelectedEventId(eventId);
    await loadTickets(eventId);
  };

  const loadTickets = async (eventId: number | string) => {
    setTicketsLoading(true);
    setError(null);
    try {
      const res = await api.listTickets(eventId);
      if ('error' in res) {
        setError(res.error || 'Failed to load tickets');
        return;
      }
      setTickets(res.data);
    } finally {
      setTicketsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateEventLoading(true);
    setError(null);
    try {
      const payload: any = {
        title: newEvent.title,
        starts_at: newEvent.starts_at,
        is_published: newEvent.is_published,
      };
      const res = await api.createEvent(payload);
      if ('error' in res) {
        setError(res.error || 'Failed to create event');
        return;
      }
      setNewEvent({ title: '', starts_at: '', is_published: false });
      await loadEvents();
    } finally {
      setCreateEventLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) return;
    setCreateTicketLoading(true);
    setError(null);
    try {
      const payload: any = {
        type: newTicket.type,
        price: parseFloat(newTicket.price || '0') || 0,
        quantity: parseInt(newTicket.quantity || '0', 10) || 0,
        is_active: newTicket.is_active,
      };
      const res = await api.createTicket(selectedEventId, payload);
      if ('error' in res) {
        setError(res.error || 'Failed to create ticket');
        return;
      }
      setNewTicket({ type: '', price: '', quantity: '', is_active: true });
      await loadTickets(selectedEventId);
    } finally {
      setCreateTicketLoading(false);
    }
  };

  // Event actions (publish/unpublish, delete)
  const toggleEventPublish = async (evt: any) => {
    try {
      const updated = { ...evt, is_published: !evt.is_published };
      await api.updateEvent(evt.id, updated);
      await loadEvents();
    } catch (error) {
      console.error('Toggle publish failed', error);
      setError('Failed to toggle publish');
    }
  };

  const deleteEventById = async (id: number) => {
    try {
      await api.deleteEvent(id);
      await loadEvents();
    } catch (error) {
      console.error('Delete event failed', error);
      setError('Delete event failed');
    }
  };

  // Ticket actions (toggle active, delete)
  const toggleTicketActive = async (t: any) => {
    try {
      const updated = { ...t, is_active: !t.is_active };
      await api.updateTicket(selectedEventId as number | string, t.id, updated);
      if (selectedEventId) await loadTickets(selectedEventId);
    } catch (error) {
      console.error('Toggle active failed', error);
      setError('Failed to toggle active');
    }
  };

  const deleteTicketById = async (id: number) => {
    try {
      await api.deleteTicket(selectedEventId as number | string, id);
      if (selectedEventId) await loadTickets(selectedEventId);
    } catch (error) {
      console.error('Delete ticket failed', error);
      setError('Delete ticket failed');
    }
  };

  // Registrations handlers (list, update, delete)
  const loadRegistrations = async (params?: { search?: string; status?: string; event_id?: number | string; page?: number; per_page?: number; }) => {
    try {
      setRegistrationsLoading(true);
      const res = await api.listRegistrations({
        search: params?.search ?? regSearch || undefined,
        status: params?.status ?? regStatus || undefined,
        event_id: (params?.event_id ?? regEventId || undefined) as any,
        per_page: params?.per_page ?? 50,
        page: params?.page,
      });
      const rows = Array.isArray(res) ? res : res?.data || [];
      setRegistrations(rows);
    } catch (error) {
      console.error('Failed to load registrations', error);
      setError('Failed to load registrations');
    } finally {
      setRegistrationsLoading(false);
    }
  };

  const updateRegistration = async (id: number, payload: any) => {
    try {
      await api.updateRegistration(id, payload);
      await loadRegistrations();
    } catch (error) {
      console.error('Update registration failed', error);
      setError('Update registration failed');
    }
  };

  const deleteRegistration = async (id: number) => {
    try {
      await api.deleteRegistration(id);
      await loadRegistrations();
    } catch (error) {
      console.error('Delete registration failed', error);
      setError('Delete registration failed');
    }
  };

  // Auto-load registrations when switching to the section
  useEffect(() => {
    if (activeSection === 'registrations' && token) {
      loadRegistrations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, token]);

  useEffect(() => {
    if (isAuthed) {
      loadEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          {error && (
            <div className="mb-4 rounded border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-md disabled:opacity-60"
            >
              {authLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded border border-gray-700 text-gray-200 hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-gray-900 border border-gray-800 rounded-lg p-3 md:p-4 h-fit md:sticky md:top-6">
          <nav className="space-y-1">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'events', label: 'Events' },
              { key: 'tickets', label: 'Tickets' },
              { key: 'registrations', label: 'Registrations' },
              { key: 'invoices', label: 'Invoices' },
              { key: 'users', label: 'Users' },
              { key: 'settings', label: 'Settings' },
              { key: 'reports', label: 'Reports' },
              { key: 'content', label: 'Content' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key as AdminSection)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  activeSection === (item.key as AdminSection)
                    ? 'bg-purple-900/40 text-purple-300'
                    : 'hover:bg-gray-800 text-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content area */}
        <main className="space-y-6">
          {/* Error banner */}
          {error && (
            <div className="rounded border border-red-500/50 bg-red-900/20 text-red-300 px-3 py-2 text-sm">{error}</div>
          )}

          <h2 className="text-lg font-semibold">{sectionTitle[activeSection]}</h2>

          {/* Sections */}
          {activeSection === 'dashboard' && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Stats (placeholders) */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-1">Total Events</h3>
                <p className="text-2xl">{events.length}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-1">Tickets Sold</h3>
                <p className="text-2xl">—</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-1">Registrations</h3>
                <p className="text-2xl">—</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-1">Revenue</h3>
                <p className="text-2xl">—</p>
              </div>
              {/* Upcoming events */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 md:col-span-2">
                <h3 className="font-medium mb-3">Upcoming Events</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800 text-left">
                        <th className="px-3 py-2">Title</th>
                        <th className="px-3 py-2">Starts</th>
                        <th className="px-3 py-2">Published</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-3 py-6 text-center text-gray-400">No events</td>
                        </tr>
                      ) : (
                        events.slice(0, 5).map((ev: any) => (
                          <tr key={ev.id} className="border-t border-gray-800">
                            <td className="px-3 py-2">{ev.title}</td>
                            <td className="px-3 py-2">{ev.starts_at}</td>
                            <td className="px-3 py-2">{ev.is_published ? 'Yes' : 'No'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'events' && (
            <section className="space-y-6">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold">Events</h3>
                  <button
                    onClick={loadEvents}
                    disabled={eventsLoading}
                    className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 disabled:opacity-60"
                  >
                    {eventsLoading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800 text-left">
                        <th className="px-3 py-2">Title</th>
                        <th className="px-3 py-2">Starts</th>
                        <th className="px-3 py-2">Published</th>
                        <th className="px-3 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-3 py-6 text-center text-gray-400">No events found</td>
                        </tr>
                      )}
                      {events.map((ev: any) => (
                        <tr key={ev.id} className="border-t border-gray-800">
                          <td className="px-3 py-2">{ev.title}</td>
                          <td className="px-3 py-2">{ev.starts_at}</td>
                          <td className="px-3 py-2">{ev.is_published ? 'Yes' : 'No'}</td>
                          <td className="px-3 py-2 space-x-2">
                            <button
                              onClick={() => { setSelectedEventId(ev.id); setActiveSection('tickets'); loadTickets(ev.id); }}
                              className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-200"
                            >
                              Manage Tickets
                            </button>
                            <button
                              className="px-2 py-1 text-blue-500 hover:underline"
                              onClick={() => toggleEventPublish(ev)}
                            >
                              {ev.is_published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                              className="px-2 py-1 text-red-500 hover:underline"
                              onClick={() => deleteEventById(ev.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
                <h3 className="text-md font-semibold mb-4">Create Event</h3>
                <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full rounded border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Starts At</label>
                    <input
                      type="datetime-local"
                      value={newEvent.starts_at}
                      onChange={(e) => setNewEvent({ ...newEvent, starts_at: e.target.value })}
                      className="w-full rounded border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      id="publish"
                      type="checkbox"
                      checked={newEvent.is_published}
                      onChange={(e) => setNewEvent({ ...newEvent, is_published: e.target.checked })}
                      className="h-4 w-4 accent-purple-600"
                    />
                    <label htmlFor="publish" className="text-sm text-gray-300">Publish</label>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={eventsLoading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-md disabled:opacity-60"
                    >
                      {eventsLoading ? 'Creating...' : 'Create Event'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'tickets' && (
            <section className="space-y-6">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold">Tickets</h3>
                  <button
                    onClick={() => selectedEventId && loadTickets(selectedEventId)}
                    disabled={ticketsLoading}
                    className="px-3 py-1.5 rounded border border-gray-700 text-gray-200 hover:bg-gray-800"
                  >
                    {ticketsLoading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
                {!selectedEventId && (
                  <div className="text-sm text-gray-400">Select an event from Events to manage tickets.</div>
                )}
                {selectedEventId && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-800 text-left">
                          <th className="px-3 py-2">Type</th>
                          <th className="px-3 py-2">Price</th>
                          <th className="px-3 py-2">Quantity</th>
                          <th className="px-3 py-2">Active</th>
                          <th className="px-3 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-3 py-6 text-center text-gray-400">No tickets</td>
                          </tr>
                        ) : (
                          tickets.map((t: any) => (
                            <tr key={t.id} className="border-t border-gray-800">
                              <td className="px-3 py-2">{t.type}</td>
                              <td className="px-3 py-2">${t.price}</td>
                              <td className="px-3 py-2">{t.quantity}</td>
                              <td className="px-3 py-2">{t.is_active ? 'Yes' : 'No'}</td>
                              <td className="px-3 py-2 space-x-2">
                                <button
                                  className="px-2 py-1 text-blue-500 hover:underline"
                                  onClick={() => toggleTicketActive(t)}
                                >
                                  {t.is_active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                  className="px-2 py-1 text-red-500 hover:underline"
                                  onClick={() => deleteTicketById(t.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
                <h3 className="text-md font-semibold mb-4">Create Ticket</h3>
                <form onSubmit={handleCreateTicket} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                    <input
                      type="text"
                      value={newTicket.type}
                      onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
                      className="w-full rounded border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newTicket.price}
                      onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
                      className="w-full rounded border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="0"
                      value={newTicket.quantity}
                      onChange={(e) => setNewTicket({ ...newTicket, quantity: e.target.value })}
                      className="w-full rounded border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-3 flex items-center gap-2">
                    <input
                      id="ticket-active"
                      type="checkbox"
                      checked={newTicket.is_active}
                      onChange={(e) => setNewTicket({ ...newTicket, is_active: e.target.checked })}
                      className="h-4 w-4 accent-purple-600"
                    />
                    <label htmlFor="ticket-active" className="text-sm text-gray-300">Active</label>
                  </div>
                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      disabled={ticketsLoading || !selectedEventId}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-md disabled:opacity-60"
                    >
                      {ticketsLoading ? 'Creating...' : 'Create Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'registrations' && (
            <section className="space-y-6">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1"
                      value={regEventId}
                      onChange={(e) => setRegEventId(e.target.value)}
                    >
                      <option value="">All Events</option>
                      {events.map((evt) => (
                        <option key={evt.id} value={evt.id}>{evt.title}</option>
                      ))}
                    </select>
                    <select
                      className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1"
                      value={regStatus}
                      onChange={(e) => setRegStatus(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <input
                      className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1"
                      placeholder="Search name/email/reference"
                      value={regSearch}
                      onChange={(e) => setRegSearch(e.target.value)}
                    />
                    <button
                      className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-200"
                      onClick={() => loadRegistrations({})}
                      disabled={registrationsLoading}
                    >
                      Filter
                    </button>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded border border-gray-700 text-gray-200 hover:bg-gray-800"
                    onClick={() => loadRegistrations({})}
                    disabled={registrationsLoading}
                  >
                    {registrationsLoading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800 text-left">
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Event</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2">Ticket</th>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Reference</th>
                        <th className="px-3 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.length === 0 && !registrationsLoading && (
                        <tr>
                          <td colSpan={9} className="px-3 py-6 text-center text-gray-400">No registrations found</td>
                        </tr>
                      )}
                      {registrationsLoading && (
                        <tr>
                          <td colSpan={9} className="px-3 py-6 text-center text-gray-400">Loading registrations...</td>
                        </tr>
                      )}
                      {registrations.map((r: any) => (
                        <tr key={r.id} className="border-t border-gray-800">
                          <td className="px-3 py-2">{r.id}</td>
                          <td className="px-3 py-2">{r.event?.title || r.event_title || r.event_id}</td>
                          <td className="px-3 py-2">{r.name}</td>
                          <td className="px-3 py-2">{r.email}</td>
                          <td className="px-3 py-2">{r.ticket?.name || r.ticket_name || r.ticket_id}</td>
                          <td className="px-3 py-2">{r.quantity}</td>
                          <td className="px-3 py-2">
                            <select
                              className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1"
                              value={r.status}
                              onChange={(e) => updateRegistration(r.id, { status: e.target.value })}
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">{r.reference}</td>
                          <td className="px-3 py-2">
                            <button
                              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => deleteRegistration(r.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'invoices' && (
            <section className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400">Invoices and payments area (PDF view/resend) will appear here.</p>
            </section>
          )}

          {activeSection === 'users' && (
            <section className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400">Manage admin accounts and roles/permissions coming soon.</p>
            </section>
          )}

          {activeSection === 'settings' && (
            <section className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400">Organization info, mail settings, and QR/invoice customization coming soon.</p>
            </section>
          )}

          {activeSection === 'reports' && (
            <section className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400">Logs and analytics will be available here.</p>
            </section>
          )}

          {activeSection === 'content' && (
            <section className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <h3 className="text-md font-semibold mb-4">Content Manager</h3>
              <ContentManager />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}