function PageLayout({ eyebrow, title, description, children }) {
  return (
    <main className="page-shell">
      <section className="page-card">
        <span className="page-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children && <div className="page-content">{children}</div>}
      </section>
    </main>
  )
}

export default PageLayout
