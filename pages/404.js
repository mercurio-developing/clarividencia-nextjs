import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return <div className="container notFound">
    <div className="row contact-row h-50 my-auto mb-5">
      <div className="col-8 col-sm-4 col-md-4 col-lg-4 col-xl-4 my-auto mx-auto ">
        <h2 className="mb-5">
          <p className="text-center">NOT FOUND.</p></h2>
      </div>
    </div>
  </div>

}