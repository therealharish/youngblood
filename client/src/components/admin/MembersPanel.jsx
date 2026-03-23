import { useState, useEffect } from 'react';
import { apiUrl } from '../../api.js';

export default function MembersPanel({ token }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/members'), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <p className="text-light-gray text-sm">Loading members...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold uppercase tracking-tight">
          Members ({members.length})
        </h2>
      </div>

      {members.length === 0 ? (
        <p className="text-light-gray text-sm">No members yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-mid-gray">
                <th className="font-heading text-xs tracking-widest uppercase text-light-gray py-3 pr-4">#</th>
                <th className="font-heading text-xs tracking-widest uppercase text-light-gray py-3 pr-4">Name</th>
                <th className="font-heading text-xs tracking-widest uppercase text-light-gray py-3 pr-4">Email</th>
                <th className="font-heading text-xs tracking-widest uppercase text-light-gray py-3 pr-4">Age</th>
                <th className="font-heading text-xs tracking-widest uppercase text-light-gray py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.id} className="border-b border-mid-gray/30 hover:bg-dark-gray/50 transition-colors">
                  <td className="py-3 pr-4 text-mid-gray text-sm">{i + 1}</td>
                  <td className="py-3 pr-4 text-off-white text-sm font-heading">{m.name}</td>
                  <td className="py-3 pr-4 text-light-gray text-sm">{m.email}</td>
                  <td className="py-3 pr-4 text-light-gray text-sm">{m.age}</td>
                  <td className="py-3 text-light-gray text-sm">
                    {new Date(m.joined_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
