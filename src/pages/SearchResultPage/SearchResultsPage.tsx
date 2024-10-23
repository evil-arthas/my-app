import './searchResultsPage.scss'
import { useAppSelector } from '../../store/hooks'
import { requestBodySlice } from '../../features/SearchForm/requestBodySlice'
import { useEffect, useState } from 'react'
import imageGirlDartsMagnifire from './image-girl-darts-magnifier.svg'
import HistogramsSlider from './HistogramsSlider'




function SearchResultsPage() {
  const [objectSearchData, setObjectSearchData] = useState("")
  const [histogramsData, setHistogramsData] = useState("")
  const [counter, setCounter] = useState(false)
  const requstBody = useAppSelector(state => state.requestBodySlice.value)
  const rqb = `{"issueDateInterval":{"startDate":"2023-08-30T00:00:00.000Z","endDate":"2024-09-30T00:00:00.000Z"},"searchContext":{"targetSearchEntitiesContext":{"targetSearchEntities":[{"type":"company","sparkId":null,"entityId":null,"inn":7710137066,"maxFullness":true,"inBusinessNews":false}],"onlyMainRole":false,"tonality":"any","onlyWithRiskFactors":false,"riskFactors":{"and":[],"or":[],"not":[]},"themes":{"and":[],"or":[],"not":[]}},"themesFilter":{"and":[],"or":[],"not":[]}},"searchArea":{"includedSources":[],"excludedSources":[],"includedSourceGroups":[],"excludedSourceGroups":[]},"attributeFilters":{"excludeTechNews":true,"excludeAnnouncements":true,"excludeDigests":true},"similarMode":"duplicates","limit":100,"sortType":"sourceInfluence","sortDirectionType":"desc","intervalType":"month","histogramTypes":["totalDocuments","riskFactors"]}`
  const AT2210 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIwYzI5NDI0NC1jYzgyLWVkMTEtODI3NS04NzJjODBhZjI3NTMiLCJuYmYiOjE3Mjk2NzY4OTMsImV4cCI6MTcyOTc2MzI5MywiaXNzIjoiU2NhbkdhdGV3YXkiLCJhdWQiOiJzZl9zdHVkZW50MSJ9.gU_a-xNRtKpzNEtY2RoSIpnnYfBIdBJxVedYkRfgg94"
  async function fetchSearchResult(type: "objectsearch" | "histograms") {
    try {
      let response = await fetch(`https://gateway.scan-interfax.ru/api/v1/${type === 'objectsearch' ? "objectsearch" : "objectsearch/histograms"}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${AT2210}`,
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: rqb
      })
      if (response.ok) {
        if (type === 'objectsearch') {
          const data = await response.json()
          setObjectSearchData(data)
          console.log(data)
        }
        if (type === 'histograms') {
          const data = await response.json()
          setHistogramsData(data)
          console.log(histogramsData)
        }
      }
      if (response.status === 401) {
        alert("Ошибка")
      }
      if (response.status === 500) {
        alert(`${response} "сервер не возвращает данные"`)
      }
      console.log(response)


    } catch (error) {
      console.log(error)
    }
  }

  console.log(histogramsData===null)

  useEffect(() => {
    fetchSearchResult('objectsearch')
    fetchSearchResult("histograms")
  }, [])




  return (
    <div className="container">
      <button onClick={() => { setCounter(!counter) 
        console.log(counter)
      }}></button>
      <main className="search-result-page">
        <section className='search-result-page__loader'>
          <div className='search-result-page__text'>
            <h1 className="loader__header">
              Ищем. Скоро <br />
              будут результаты
            </h1>
            <p className="loader-description">
              Поиск может занять некоторое время, <br />
              просим сохранять терпение.

            </p>
          </div>
          <div className='searc-result-page__image-wrapper'>
            <img src={imageGirlDartsMagnifire} alt="pop" />
          </div>

        </section>


        <section className='search-result-page__histograms'>
          <h2>ОБЩАЯ СВОДКА</h2>
          <span className='histograms__search-num'>
            Найдено 4 221 вариантов
          </span>
          <div className="search-result-page__slider-wrapper">
            <div className="slider-header">
              <div className='slider-header__row-1'>Период</div>
              <div className='slider-header__row-1'>Всего</div>
              <div className='slider-header__row-1'>Риски</div>
            </div>
            <div className='search-result-page__slider-slides'>
              <HistogramsSlider histogramsData={histogramsData}></HistogramsSlider>
            </div>
          </div>
        </section>
      </main>
    </div>

  )
}

export default SearchResultsPage