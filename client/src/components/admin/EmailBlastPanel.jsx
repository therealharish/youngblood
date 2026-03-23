import { useState, useEffect } from 'react';
import { apiUrl } from '../../api.js';
import RichTextEditor from './RichTextEditor.jsx';

export default function EmailBlastPanel({ token }) {
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    fetch(apiUrl('/api/members'), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMemberCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setMemberCount(0));
  }, [token]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!htmlContent || htmlContent === '<p></p>') {
      setError('Please write some content before sending.');
      return;
    }
    if (!confirm(`Send this email to ${memberCount} member${memberCount !== 1 ? 's' : ''}?`)) return;

    setSending(true);
    setError('');
    setResult('');

    try {
      const res = await fetch(apiUrl('/api/admin/email-blast'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, htmlBody: htmlContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send emails');
      setResult(data.message);
      setSubject('');
      setHtmlContent('');
    } catch (err) {
      setError(err.message);
    }
    setSending(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold uppercase tracking-tight">
            Email Blast
          </h2>
          {memberCount !== null && (
            <p className="text-light-gray text-sm mt-1">
              {memberCount} member{memberCount !== 1 ? 's' : ''} in the rebellion
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSend}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="e.g. New Event: Rooftop Sound Bath"
            className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
            Content
          </label>
          <RichTextEditor content={htmlContent} onUpdate={setHtmlContent} />
        </div>

        {error && <p className="text-blood-bright text-sm mb-4">{error}</p>}
        {result && <p className="text-green-500 text-sm mb-4">{result}</p>}

        <button
          type="submit"
          disabled={sending || memberCount === 0}
          className="w-full py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {sending ? 'SENDING...' : `SEND TO ALL MEMBERS${memberCount ? ` (${memberCount})` : ''}`}
        </button>
      </form>
    </div>
  );
}
