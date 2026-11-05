export default function Button({ children, variant = 'primary', className = '', href, type = 'button', ...props }) {
  const classes = `button button--${variant} ${className}`.trim()

  if (href) {
    return <a className={classes} href={href} {...props}>{children}</a>
  }

  return <button className={classes} type={type} {...props}>{children}</button>
}
