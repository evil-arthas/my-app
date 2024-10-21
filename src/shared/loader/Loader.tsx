import './loader.scss'
export default function Loader ({isLoaderHide}:{isLoaderHide:boolean}) {
  return (
    <div className={`loader-wrapper ${isLoaderHide?"":"loader-wrapper_active"}`}>
      <span className="loader">

      </span>
    </div>
  )
}