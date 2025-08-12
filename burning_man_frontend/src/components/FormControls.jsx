import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Input
 * Text input with consistent styling.
 */
export function Input(props) {
  return <input className="input" {...props} />;
}

/**
 * PUBLIC_INTERFACE
 * Select
 * Dropdown with consistent styling.
 */
export function Select({ options = [], ...rest }) {
  return (
    <select className="select" {...rest}>
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}
