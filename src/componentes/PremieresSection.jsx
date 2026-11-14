import { usePremieres } from '../hooks/usePremieres.js'
import Button from './Button/Button.jsx'
import PremieresCarousel from './PremieresCarousel.jsx'
import PremieresSkeleton from './PremieresSkeleton.jsx'

export default function PremieresSection({ requestOptions }) {
  const { loading, data, error, retry } = usePremieres(requestOptions)

  return (
    <section className="estrenos" aria-labelledby="titulo-estrenos" aria-busy={loading}>
      <div className="titulo-seccion"><h2 id="titulo-estrenos">Estrenos de la semana</h2></div>
      {loading ? <PremieresSkeleton /> : error ? (
        <div>
          <p role="alert">{error}</p>
          <Button variant="secondary" onClick={retry}>Reintentar</Button>
        </div>
      ) : <PremieresCarousel premieres={data} />}
    </section>
  )
}
