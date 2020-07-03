import Link from 'next/link'
import { useRouter } from 'next/router'
import FontAwesome from 'react-fontawesome'

export default function Header() {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/share")
  }
  return <nav className="navbar navbar-expand-lg header">
    <a className="navbar-brand pl-lg-5"
    >
      <img src="/logo/logo.png" className="logo" alt="" />
    </a>
    <button className="navbar-toggler mt-4" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><img src="../icons/icon-menu-collapse.svg" alt="" /></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto pr-2 ">
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
}
