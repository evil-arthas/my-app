import { useState } from 'react'
import './searchForm.scss'
import BlueButton from '../../shared/BlueButton/BlueButton'
import { formatINN, isINNValide } from '../../someAPIs'

export default function SearchForm() {
  const [INN, setINN] = useState<undefined | string>("")
  const [tonality, setTonality] = useState("Любая")
  const [docsNum, setDocsNum] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [isINNValid, setIsINNValid] = useState(true)

  return (
    <form className="search-form search-page__search-form">
      <div className='search-form-wrapper-1'>
        <label className='search-form__INN-label'>
          ИНН компании *
          <input type="text"
            placeholder='10 цифр'
            value={INN}
            onChange={(event) => {
              const INN = event.target.value
              const formattedINN = formatINN(INN)
              setINN(formattedINN)
              const clearINN = INN.replace(/[^\d]/g, '')
              
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
            <option value="Позитивная">Позитивная</option>
            <option value="Негативная">Негативная</option>
            <option value="Любая">Любая</option>
          </select>
        </label>
        <label className='search-form__docs-num-label'>
          Количество документов к выдаче *
          <input
            value={docsNum}
            onChange={(e) => setDocsNum(e.target.value)}
            placeholder='От 1 до 1000'
          />
        </label>
        <label>
          <span>
            Диапозон поиска *
          </span>
          <input
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder='Дата начала'
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <input
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder='Дата конца'
          />
        </label>
      </div>
      <div className='search-form-wrapper-2'>
        <div className="search-form-check-box-wrapper">
          <label className="search-from__check-box-label">
            Признак максимальной полноты
            <input type="checkbox" />
          </label>
          <label className="search-from__check-box-label">
            Упоминания в бизнес-контексте
            <input type="checkbox" />
          </label>
          <label className="search-from__check-box-label">
            Главная роль в публикации
            <input type="checkbox" />
          </label>
          <label className="search-from__check-box-label">
            Публикации только с риск факторами
            <input type="checkbox" />
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
        <BlueButton className="search-form__blue-button blue-button">Поиск</BlueButton>
        <span>* Обязательные к заполнению поля</span>
      </div>
    </form>
  )
}