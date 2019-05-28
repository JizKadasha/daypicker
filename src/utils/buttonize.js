export default fn => ({
  role: 'button',
  onClick: fn,
  onKeyDown: e => e.key === 'Enter' && fn(e),
});
