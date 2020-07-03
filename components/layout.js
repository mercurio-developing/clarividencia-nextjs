import Header from "./header"
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()
  return <div className="row layout" >
    <div className="col-12 h-100">
      <Header/>
          {children}
    </div>
  </div>
}

