
import { useState } from "react"
import { useRouter } from "next/router"
import { galleryReducer, initialGallery } from "../redux/gallery"
import GallerySlider from "../components/slider"

const Home = (props) => {
  const [category, setCategory] = useState(0)
  const [sliderOn, setSliderOn] = useState(false)
  const [indexSelected, setIndexSelected] = useState(0)
  const router = useRouter()
  const [photosGallery] = React.useReducer(galleryReducer, initialGallery);
  const handleClick = (e, href, episode) => {
    e.preventDefault()
    router.push({ pathname: `${href}` })
  }
  let photos = [];

  if (category === 0) {
    photos = photos.concat(photosGallery[0])
    photos = photos.concat(photosGallery[1])
    photos = photos.concat(photosGallery[2])
  } else if (category === 1) {
    photos = photosGallery[0]
  } else if (category === 2) {
    photos = photosGallery[1]
  } else if (category === 3) {
    photos = photosGallery[2]
  }
  return <div className="row home">
    <div className="col-12">
      <div className="row ml-1">
        <div className="col-12">
          <a className={category === 0 ? 'my-active btn' : "btn"} onClick={() => setCategory(0)}><p>All</p></a>
          <a className={category === 1 ? 'my-active btn' : "btn"} onClick={() => setCategory(1)}><p>Naturaleza</p></a>
          <a className={category === 2 ? 'my-active btn' : "btn"} onClick={() => setCategory(2)}><p>Retratos</p></a>
          <a className={category === 3 ? 'my-active btn' : "btn"} onClick={() => setCategory(3)}><p>Herencia Ancestral</p></a>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row h-100 m-1">
          {
            photos.map((photo,index) =>
              <div key={index} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-1">
                <img onClick={() => {setIndexSelected(index);setSliderOn(true)}} className="img-fluid" src={photo} alt="" />
              </div>
            )
          }
        </div>
      </div>
    </div>
    {
      sliderOn === true &&
      <div className={sliderOn === true ? " gallery-modal container-fluid above p-1 d-none d-sm-none d-md-inline d-lg-inline d-xl-inline" : "gallery-modal container-fluid p-1 d-none d-sm-none d-md-inline d-lg-inline d-xl-inline"}>
      <button className="btn btn-exit float-right mr-4" onClick={() => setSliderOn(false)} >X</button>
      <div className="row h-100 ml-5">
      <div className=" col-lg-11  col-xl-11 gallery mx-auto my-auto">
          <GallerySlider photos={photos} index={indexSelected}></GallerySlider>
      </div>
      </div>

    </div>
    }
   
  </div>

}

export default Home;