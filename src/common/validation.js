export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

export const exportEmailRequired  = value => (value || typeof value === 'number' ? undefined : 'Email is required');

export const passwordRequired = value => (value || typeof value === 'number' ? undefined : 'Password is required');

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;
