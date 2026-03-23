import { useState, useEffect } from 'react';
import { apiUrl } from '../../api.js';

export default function EventsPanel({ token }) {
  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    day: '',
    month: '',
    year: '2025',
    borough: 'BLR',
    playType: '',
    featured: false,
    imageUrls: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = () => {
    fetch(apiUrl('/api/events'))
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoadingEvents(false);
      })
      .catch(() => setLoadingEvents(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const images = form.imageUrls
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.toUpperCase(),
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      day: form.day,
      month: form.month.toUpperCase(),
      year: form.year,
      borough: form.borough.toUpperCase(),
      playType: form.playType.toUpperCase(),
      featured: form.featured,
      images,
    };

    try {
      const url = editingId
        ? apiUrl(`/api/admin/events/${editingId}`)
        : apiUrl('/api/admin/events');
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Failed to ${editingId ? 'update' : 'create'} event`);
      setSuccess(`Event "${data.title}" ${editingId ? 'updated' : 'created'}!`);
      setEditingId(null);
      setForm({
        title: '',
        shortDescription: '',
        fullDescription: '',
        day: '',
        month: '',
        year: '2025',
        borough: 'BLR',
        playType: '',
        featured: false,
        imageUrls: '',
      });
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      shortDescription: event.shortDescription,
      fullDescription: event.fullDescription,
      day: event.day,
      month: event.month,
      year: event.year,
      borough: event.borough,
      playType: event.playType,
      featured: event.featured,
      imageUrls: (event.images || []).join('\n'),
    });
    setSuccess('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      title: '',
      shortDescription: '',
      fullDescription: '',
      day: '',
      month: '',
      year: '2025',
      borough: 'BLR',
      playType: '',
      featured: false,
      imageUrls: '',
    });
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(apiUrl(`/api/admin/events/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5" style={{ gap: '3rem' }}>
      {/* Form — 3 cols */}
      <div className="md:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold uppercase tracking-tight">
            {editingId ? 'Edit Event' : 'Add New Event'}
          </h2>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="text-light-gray font-heading text-xs tracking-wider hover:text-off-white cursor-pointer"
            >
              ✕ CANCEL EDIT
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Rooftop Sound Bath & Freestyle"
              className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
            />
          </div>

          {/* Date row */}
          <div className="grid grid-cols-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={form.day}
                onChange={handleChange}
                required
                placeholder="28"
                className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
                Month
              </label>
              <input
                type="text"
                name="month"
                value={form.month}
                onChange={handleChange}
                required
                placeholder="JAN"
                className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2025"
                className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Tags row */}
          <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
                Location
              </label>
              <input
                type="text"
                name="borough"
                value={form.borough}
                onChange={handleChange}
                required
                placeholder="BLR"
                className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
                Play Type
              </label>
              <input
                type="text"
                name="playType"
                value={form.playType}
                onChange={handleChange}
                required
                placeholder="SOUND, MOVEMENT, ART..."
                className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Short description */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
              Short Description (one-liner for listing)
            </label>
            <input
              type="text"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
              placeholder="A punchy one-liner about this event"
              className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
            />
          </div>

          {/* Full description */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
              Full Description (use blank lines between paragraphs)
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              required
              rows={10}
              placeholder="The full story of this event. Separate paragraphs with blank lines..."
              className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Image URLs */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
              Image URLs (one per line)
            </label>
            <textarea
              name="imageUrls"
              value={form.imageUrls}
              onChange={handleChange}
              rows={4}
              placeholder="https://images.unsplash.com/photo-...&#10;https://images.unsplash.com/photo-..."
              className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Featured checkbox */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 accent-blood-bright"
              />
              <span className="font-heading text-sm tracking-wider text-light-gray uppercase">
                Featured on homepage
              </span>
            </label>
          </div>

          {error && <p className="text-blood-bright text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (editingId ? 'UPDATING...' : 'CREATING...') : (editingId ? 'UPDATE EVENT' : 'CREATE EVENT')}
          </button>
        </form>
      </div>

      {/* Existing events — 2 cols */}
      <div className="md:col-span-2">
        <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-6">
          Existing Events ({events.length})
        </h2>

        {loadingEvents ? (
          <p className="text-light-gray text-sm">Loading...</p>
        ) : (
          <div className="flex flex-col" style={{ gap: '0.75rem' }}>
            {events.map((event) => (
              <div
                key={event.id}
                className="border-2 border-mid-gray bg-dark-gray flex items-center justify-between"
                style={{ padding: '0.75rem 1rem' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold text-off-white truncate">
                    {event.title}
                  </p>
                  <p className="text-light-gray text-xs">
                    {event.day} {event.month} {event.year}
                    {event.featured && <span className="text-blood-bright ml-2">★ FEATURED</span>}
                  </p>
                </div>
                <div className="flex gap-3 ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-off-white font-heading text-xs tracking-wider hover:underline cursor-pointer"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(event.id, event.title)}
                    className="text-blood-bright font-heading text-xs tracking-wider hover:underline cursor-pointer"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
