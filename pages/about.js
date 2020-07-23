import { useRouter } from 'next/router'
export default function About() {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/episodes")
  }
  return <div className="container-fluid about">
    <div className="row m-0 m-sm-4 mt-md-5 mt-lg-5">
      <div className="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline  col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7">
        <img src="/imgs/gato.jpg" alt="" className="img-fluid" />
      </div>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 mt-5 mb-5  mt-sm-2 mt-md-3 mt-lg-3 col-xl-5 ">
        <h2 className="display-4 mt-2">Sobre Mi</h2>
        <blockquote className="blockquote text-left pl-1">
          <p>Nací en la costa del Perú y estudie Ciencias de la Comunicación.
          La vida me fue llevando a recorrer mi país experimentando vivencias
          de mucho aprendizaje, donde a traves de la fotografía documental descubrí
          la herramienta para transmitir la cultura, costumbres, lugares milenarios,
          naturaleza, colores, texturas, vida y creación.
          </p>
          <footer className="blockquote-footer text-right">Alvaro Ugarte Forno</footer>
          <br />
          <br />
        </blockquote>
      </div>
    </div>
  </div>
}