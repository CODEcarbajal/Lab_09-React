export default function PremieresSkeleton() {
  return (
    <div role="status">
      <p>Cargando estrenos…</p>
      <div className="estrenos-esqueleto" aria-hidden="true">
        {[0, 1, 2, 3].map(index => <div className="esqueleto-cartel" key={index} />)}
      </div>
    </div>
  )
}
