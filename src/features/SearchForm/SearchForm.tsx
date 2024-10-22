import { useState, MouseEvent } from 'react'
import './searchForm.scss'
import BlueButton from '../../shared/BlueButton/BlueButton'
import { formatINN, checkIsINNValide, buildBodyRequestForHistograms } from '../../someAPIs'
import { setRequestBody } from './requestBodySlice';
import { useAppDispatch } from '../../store/hooks';
import { replace, useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const [INN, setINN] = useState<string>("")
  const [tonality, setTonality] = useState("any")
  const [docsNum, setDocsNum] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [isINNValid, setIsINNValid] = useState(true)
  const [isdocsNumValid, setIsDocsNumValid] = useState(true)
  const [isDataValid, setIsDataValid] = useState(true)
  const [isMaxFullnes, setIsMaxFullnes] = useState(true)
  const [isInBusinessNews, setIsInBusinessNews] = useState(false)
  const [isOnlyMainRole, setIsOnlyMainRole] = useState(false)
  const [isOnlyWithRiskFactors, setIsOnlyWithRiskFactors] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pureINN = INN.replace(/[^\d]/g, '')
  const isButtonDisabled = !((pureINN.length >= 10) && (isDataValid) && (docsNum.length > 0)
    && (fromDate !== "") && (toDate !== "") && (isINNValid) && (isdocsNumValid))
  

    const AT2210 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3OGM1MTZiNy1jYzgyLWVkMTEtODI3NS04NzJjODBhZjI3NTMiLCJuYmYiOjE3Mjk1ODU2NjYsImV4cCI6MTcyOTY3MjA2NiwiaXNzIjoiU2NhbkdhdGV3YXkiLCJhdWQiOiJzZl9zdHVkZW50MyJ9.Ep3y97Zc5PJBf9nZ0t9cbMtmCUXJt-osLcmrmxyATGg"
    async function fetchSearchResult(requestBody:string) {
      try {
        let response = await fetch(`https://gateway.scan-interfax.ru/api/v1/objectsearch`, {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${AT2210}`,
            "Content-type": "application/json",
            "Accept": "application/json"
          },
          body: requestBody
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
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
  return (
    <form className="search-form search-page__search-form">
      <div className='search-form-wrapper-1'>
        <label className='search-form__INN-label'>
          <span>
            ИНН компании <span className='__z'>*</span>
          </span>
          {!isINNValid && <span className='search-form-input__error-label'>
            Введите корректные данные
          </span>}
          <input type="text"
            placeholder='10 цифр'
            value={INN}
            className={`${isINNValid ? "" : "search-form__input_error"}`}
            onChange={(event) => {
              const INN = event.target.value
              const formattedINN = formatINN(INN)
              setINN(formattedINN)
              const pureINN = INN.replace(/[^\d]/g, '')


              if (INN.match(/[a-z]/i)) {
                setIsINNValid(false)
                return
              }

              if (pureINN.length >= 10) {
                if (checkIsINNValide(pureINN)) {
                  setIsINNValid(true)
                } else setIsINNValid(false)
              } else setIsINNValid(true)
            }}
          />
        </label>
        <label className='search-form__tonality-label'>
          Тональность
          <select
            name="tonality"
            id="tonality"
            onChange={(e) => setTonality(e.target.value)}
            value={tonality}
          >
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
            <option value="any">Любая</option>
          </select>
        </label>
        <label className='search-form__docs-num-label'>
          <span>Количество документов к выдаче <span className='__z'>*</span></span>
          {!isdocsNumValid &&
            <span className='search-form-input__error-label'>
              Введите корректные данные
            </span>
          }
          <input
            className={`${isdocsNumValid ? "" : "search-form__input_error"}`}
            value={docsNum}
            onChange={(e) => {
              const numberOfDocs = e.target.value
              if (numberOfDocs.match(/[^\d]/g)) {
                setIsDocsNumValid(false)
                return
              }

              const filltredNumberOfDocs = numberOfDocs.replace(/[^\d]/g, '')
              setDocsNum(filltredNumberOfDocs)
              if (Number(filltredNumberOfDocs) > 1000) {
                setIsDocsNumValid(false)
              } else setIsDocsNumValid(true)
            }

            }
            placeholder='От 1 до 1000'
          />
        </label>
        <label>
          <span>
            Диапозон поиска <b className='__z'>*</b>
          </span>
          {!isDataValid && <span className='search-form-input__error-label'>
            Введите корректные данные
          </span>}
          <input
            className={`${isDataValid ? "" : "search-form__input_error"}`}
            value={fromDate}
            onChange={(e) => {
              const nowDate = new Date()
              const fromDateFormatted = new Date(e.target.value)

              if (fromDateFormatted > nowDate) {
                setIsDataValid(false)
              } else { setIsDataValid(true) }

              console.log("changed")
              console.log(nowDate)
              console.log(fromDateFormatted)

              setFromDate(e.target.value)
              if (e.target.value !== "" && toDate !== "") {
                const formattedFromDate = new Date(e.target.value)
                const formattedToDate = new Date(toDate)
                if (formattedFromDate > formattedToDate) {
                  setIsDataValid(false)
                } else setIsDataValid(true)
              }
            }}
            placeholder='Дата начала'
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <input
            className={`${isDataValid ? "" : "search-form__input_error"}`}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            value={toDate}
            onChange={(e) => {
              const nowDate = new Date()
              const toDateFormatted = new Date(e.target.value)

              if (toDateFormatted > nowDate) {
                setIsDataValid(false)
              } else { setIsDataValid(true) }
              setToDate(e.target.value)

              if (fromDate !== "" && e.target.value !== "") {
                const formattedFromDate = new Date(fromDate)
                const formattedToDate = new Date(e.target.value)
                if (formattedFromDate > formattedToDate) {
                  setIsDataValid(false)
                } else setIsDataValid(true)
              }
            }}
            placeholder='Дата конца'
          />
        </label>
      </div>
      <div className='search-form-wrapper-2'>
        <div className="search-form-check-box-wrapper">
          <label className="search-from__check-box-label">
            Признак максимальной полноты
            <input type="checkbox"
              checked={isMaxFullnes} onChange={() => setIsMaxFullnes(!isMaxFullnes)}
            />
          </label>
          <label className="search-from__check-box-label">
            Упоминания в бизнес-контексте
            <input type="checkbox"
              checked={isInBusinessNews} onChange={() => setIsInBusinessNews(!isInBusinessNews)} />
          </label>
          <label className="search-from__check-box-label">
            Главная роль в публикации
            <input type="checkbox"
              checked={isOnlyMainRole} onChange={() => setIsOnlyMainRole(!isOnlyMainRole)} />
          </label>
          <label className="search-from__check-box-label"
          >
            Публикации только с риск факторами
            <input type="checkbox"
              checked={isOnlyWithRiskFactors} onChange={() => setIsOnlyWithRiskFactors(!isOnlyWithRiskFactors)} />
          </label>
          <label className="search-from__check-box-label">
            Включать технические новости рынков
            <input type="checkbox" />
          </label>
          <label className="search-from__check-box-label">
            Включать анонсы и календари
            <input type="checkbox" />
          </label>
          <label className="search-from__check-box-label">
            Включать сводки новостей
            <input type="checkbox" />
          </label>
        </div>
        <BlueButton
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            const requestBody = JSON.stringify(buildBodyRequestForHistograms(fromDate, toDate, INN, 
                      isMaxFullnes, isInBusinessNews, isOnlyMainRole, isOnlyWithRiskFactors, 
                      tonality, docsNum))
            console.log(requestBody)
            dispatch(setRequestBody(requestBody))
            fetchSearchResult(requestBody)
            navigate('/searchResults', {replace:true})
          }}
          className={`${isButtonDisabled ? "search-from__blue-button_disabled" : ""} search-form__blue-button blue-button`}
          disabled={isButtonDisabled}>
          Поиск</BlueButton>
        <span>
          <span className='__z'>*</span> Обязательные к заполнению поля
        </span>
      </div>
    </form>
  )
}