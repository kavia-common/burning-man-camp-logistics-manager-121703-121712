import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input } from '../components/FormControls';
import { useUser } from '../context/UserContext';
import { getAdminOverview } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Admin
 * Administrative panel for role management and data oversight.
 */
function Admin() {
  const { user } = useUser();
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    if (user.role === 'admin') {
      getAdminOverview().then((r) => r.ok && setOverview(r.data));
    }
  }, [user.role]);

  if (user.role !== 'admin') {
    return <div className="card">You must be an admin to view this page.</div>;
  }

  return (
    <div className="card-grid">
      <Card title="Overview">
        {overview ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            <Stat label="Members" value={overview.members} />
            <Stat label="Unpaid Members" value={overview.unpaid} />
            <Stat label="Pending Discounts" value={overview.pendingDiscounts} />
            <Stat label="Open Jobs" value={overview.openJobs} />
          </div>
        ) : 'Loading…'}
      </Card>

      <Card title="Invite User">
        <div style={{ display: 'flex', gap: 10 }}>
          <Input placeholder="Email address" />
          <button className="btn">Send Invite</button>
        </div>
      </Card>

      <Card title="Role Management">
        <Table
          columns={[
            { title: 'Member', accessor: 'name' },
            { title: 'Role', accessor: 'role' },
            { title: 'Actions', render: () => <button className="btn">Toggle Role</button> },
          ]}
          data={[
            { id: 1, name: 'Ember Blaze', role: 'admin' },
            { id: 2, name: 'Playa Storm', role: 'burner' },
          ]}
        />
      </Card>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

export default Admin;
