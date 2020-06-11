export default function Header() {
  return <nav className="navbar navbar-expand-lg  header">
    <a className="navbar-brand" href="#"><img className="logo" src="/assets/mamitas_fuertes_black.png" alt=""/></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Episodes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
        <li className="nav-item">
          <a>
          <button className="button mt-1 ml-2 mr-3">
            Compartir tu Historia
          </button></a>
        </li>
      </ul>
    </div>
  </nav>
}
