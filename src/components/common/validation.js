export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

export const exportEmailRequired  = value => (value || typeof value === 'number' ? undefined : 'Email is Required');

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
