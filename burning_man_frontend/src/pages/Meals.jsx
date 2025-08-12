import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input } from '../components/FormControls';
import { getMeals } from '../services/api';
import { formatDate } from '../utils/dates';

/**
 * PUBLIC_INTERFACE
 * Meals
 * Shared meal planning: add/edit meals, signup as responsible, attendee counts.
 */
function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals().then((r) => r.ok && setMeals(r.data));
  }, []);

  return (
    <div className="card-grid">
      <Card title="Add Meal">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10 }}>
          <Input placeholder="Meal title" />
          <Input placeholder="Date/Time (ISO)" />
          <button className="btn">Add</button>
        </div>
      </Card>
      <Card title="Planned Meals">
        <Table
          columns={[
            { title: 'Title', accessor: 'title' },
            { title: 'Date', render: (r) => formatDate(r.date) },
            { title: 'Responsible', accessor: 'responsible' },
            { title: 'Attendees', accessor: 'count' },
            { title: 'Actions', render: () => <button className="btn">I’ll help</button> },
          ]}
          data={meals}
        />
      </Card>
    </div>
  );
}

export default Meals;
