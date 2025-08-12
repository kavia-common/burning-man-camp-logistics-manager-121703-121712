import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { getDuesSummary, getEvents, getJobs } from '../services/api';
import { formatDate } from '../utils/dates';

/**
 * PUBLIC_INTERFACE
 * Dashboard
 * Overview for burners and admins with key summaries and quick links.
 */
function Dashboard() {
  const [dues, setDues] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getDuesSummary().then((r) => r.ok && setDues(r.data));
    getJobs().then((r) => r.ok && setJobs(r.data));
    getEvents().then((r) => r.ok && setEvents(r.data));
  }, []);

  return (
    <div className="card-grid">
      <Card title="Dues Summary" actions={<button className="btn">View Details</button>}>
        {dues ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <Stat label="Season" value={dues.season} />
            <Stat label="Due" value={`$${dues.dueAmount}`} />
            <Stat label="Paid" value={`$${dues.paid}`} />
            <Stat label="Status" value={dues.status} />
          </div>
        ) : <div>Loading…</div>}
      </Card>

      <Card title="Open Jobs" actions={<button className="btn ghost">All Jobs</button>}>
        <Table
          columns={[
            { title: 'Title', accessor: 'title' },
            { title: 'Needed', accessor: 'needed' },
            { title: 'Signed Up', accessor: 'signedUp' },
          ]}
          data={jobs}
        />
      </Card>

      <Card title="Upcoming Events" actions={<button className="btn ghost">Calendar</button>}>
        <Table
          columns={[
            { title: 'Title', accessor: 'title' },
            { title: 'Type', accessor: 'type' },
            { title: 'Date', render: (r) => formatDate(r.date) },
            { title: 'Posted By', accessor: 'postedBy' },
          ]}
          data={events}
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

export default Dashboard;
