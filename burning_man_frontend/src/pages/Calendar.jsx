import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input, Select } from '../components/FormControls';
import { getEvents } from '../services/api';
import { formatDate } from '../utils/dates';

/**
 * PUBLIC_INTERFACE
 * Calendar
 * Event calendar: add events, filter by type, see who posted.
 */
function Calendar() {
  const [events, setEvents] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    getEvents().then((r) => r.ok && setEvents(r.data));
  }, []);

  const types = ['', 'Build', 'Kitchen', 'Power', 'Social', 'Art'].map((x) => ({ value: x, label: x || 'All Types' }));

  return (
    <div className="card-grid">
      <Card title="Add Event">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 10 }}>
          <Input placeholder="Event title" />
          <Select options={types} />
          <Input placeholder="Date/Time (ISO)" />
          <button className="btn">Add</button>
        </div>
      </Card>
      <Card title="Events">
        <div style={{ marginBottom: 8 }}>
          <Select value={type} onChange={(e) => setType(e.target.value)} options={types} />
        </div>
        <Table
          columns={[
            { title: 'Title', accessor: 'title' },
            { title: 'Type', accessor: 'type' },
            { title: 'Date', render: (r) => formatDate(r.date) },
            { title: 'Posted By', accessor: 'postedBy' },
          ]}
          data={events.filter((e) => !type || e.type === type)}
        />
      </Card>
    </div>
  );
}

export default Calendar;
