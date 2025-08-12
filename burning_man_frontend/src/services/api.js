const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * PUBLIC_INTERFACE
 * apiFetch
 * Wrapper around fetch with JSON handling and graceful fallback to mock data in dev when API is missing.
 */
export async function apiFetch(path, options = {}, mockData = null) {
  const hasBackend = Boolean(BASE_URL);
  if (!hasBackend && mockData !== null) {
    // Simulate small latency
    await new Promise((r) => setTimeout(r, 150));
    return { ok: true, data: mockData };
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      ...options,
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (e) {
    if (mockData !== null) {
      return { ok: true, data: mockData };
    }
    return { ok: false, error: e.message };
  }
}

/**
 * PUBLIC_INTERFACE
 * getDirectory
 * Fetch camp member directory with optional filters.
 */
export function getDirectory(params = {}) {
  const query = new URLSearchParams(params).toString();
  const mock = [
    { id: 'u1', name: 'Ember Blaze', crew: 'Build', experience: 'Veteran' },
    { id: 'u2', name: 'Playa Storm', crew: 'Kitchen', experience: '2-3 Burns' },
    { id: 'u3', name: 'Dusty Unicorn', crew: 'LNT', experience: 'Virgin' },
  ];
  return apiFetch(`/api/directory${query ? `?${query}` : ''}`, {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getAccommodations
 * Fetch accommodation signups and configurations.
 */
export function getAccommodations() {
  const mock = [
    { id: 'a1', type: 'Shiftpod', dimensions: '12x12 ft', power: '15A', vehicle: 'None' },
    { id: 'a2', type: 'RV', dimensions: '32 ft', power: '30A', vehicle: 'RV' },
  ];
  return apiFetch('/api/accommodations', {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getDuesSummary
 * Fetch dues summary including approvals and payment statuses.
 */
export function getDuesSummary() {
  const mock = {
    season: '2025',
    dueAmount: 650,
    paid: 300,
    status: 'Partial',
    lowIncomeRequested: false,
  };
  return apiFetch('/api/dues/summary', {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getJobs
 * Fetch camp jobs list.
 */
export function getJobs() {
  const mock = [
    { id: 'j1', title: 'Kitchen Prep', needed: 6, signedUp: 3 },
    { id: 'j2', title: 'Power Setup', needed: 4, signedUp: 2 },
  ];
  return apiFetch('/api/jobs', {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getFoodShares
 * Fetch shared food items list.
 */
export function getFoodShares() {
  const mock = [
    { id: 'f1', item: 'Coffee (5 lbs)', contributor: 'Playa Storm' },
    { id: 'f2', item: 'Snacks Variety', contributor: 'Dusty Unicorn' },
  ];
  return apiFetch('/api/food', {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getMeals
 * Fetch shared meals.
 */
export function getMeals() {
  const mock = [
    { id: 'm1', title: 'Taco Night', date: new Date().toISOString(), responsible: 'Ember Blaze', count: 20 },
    { id: 'm2', title: 'Pancake Breakfast', date: new Date().toISOString(), responsible: 'Playa Storm', count: 30 },
  ];
  return apiFetch('/api/meals', {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getEvents
 * Fetch calendar events.
 */
export function getEvents() {
  const mock = [
    { id: 'e1', title: 'Build Day 1', type: 'Build', date: new Date().toISOString(), postedBy: 'Admin' },
    { id: 'e2', title: 'Opening Potluck', type: 'Social', date: new Date().toISOString(), postedBy: 'Kitchen' },
  ];
  return apiFetch('/api/events', {}, mock);
}

/**
 * PUBLIC_INTERFACE
 * getAdminOverview
 * Fetch admin overview data.
 */
export function getAdminOverview() {
  const mock = {
    members: 85,
    unpaid: 17,
    pendingDiscounts: 4,
    openJobs: 12,
  };
  return apiFetch('/api/admin/overview', {}, mock);
}
