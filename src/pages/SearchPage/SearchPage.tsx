import iconDocument from './icon-document.svg'
import iconFolders from './icon-folders.svg'
import './searchPage.scss'
import SearchForm from '../../features/SearchForm/SearchForm'

function SearchPage() {
  return (
    <div className="container">
      <main className="search-page">
        <div className="search-page__header">
          <div className="search-page-header-wrapper">
            <h1 className="header__header">
              Найдите необходимые <br />
              данные в пару кликов.
            </h1>
            <p className="header__description">
              Задайте параметры поиска. <br />
              Чем больше заполните, тем точнее поиск
            </p>
          </div>
          <div className="header__images">
            <img src={iconDocument} alt="doc" />
            <img src={iconFolders} alt="folders" />
          </div>
        </div>
        <div className="form-w-image-wrapper">
          <SearchForm></SearchForm>
          <div className="image-wrapper">
            <div className="img"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SearchPage