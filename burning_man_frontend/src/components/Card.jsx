import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card
 * Simple container with consistent padding, border, and shadow.
 */
function Card({ title, actions, children, footer }) {
  return (
    <section className="card">
      {title && (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          {actions}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer style={{ marginTop: 10 }}>{footer}</footer>}
    </section>
  );
}

export default Card;
