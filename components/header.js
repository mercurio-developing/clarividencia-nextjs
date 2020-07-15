import Link from 'next/link'
import { useRouter } from 'next/router'
import FontAwesome from 'react-fontawesome'

export default function Header() {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/share")
  }
  return <div className="row">
    <div className="col-12">
      <div className="row">
        <div className="col-4 text-center pl-4 pt-2 mx-auto">
            <img src="/logo/logo.png" className="logo" alt="" />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg header">
            <button className="navbar-toggler mt-4" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><img src="../icons/icon-menu-collapse.svg" alt="" /></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav  ml-auto ">
                <li className="nav-item"  >
                  <Link href="/">
                    <a className="nav-link navbarlinks"   >Portfolio</a>
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link href="/about">
                    <a className="nav-link navbarlinks"   >About</a>
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link href="/contact">
                    <a className="nav-link navbarlinks">Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>

}
