import { useEffect, useState } from "react"
import "./limitInformationPannel.scss"
import { useAppSelector } from "../../store/hooks"
import Loader from "../../shared/loader/Loader"

interface panelProps {
  isHeaderMenuOpen: boolean
}

function LimitInformationPannel({ isHeaderMenuOpen }: panelProps) {
  const [limitData, setLimitData] = useState({ companyLimit: 0, usedCompanyCount: 0 })
  const [isLoaderHide, setIsLoaderHide] = useState(false)
  useEffect(() => {
    fetchLimit()
  }, [])

  const accessToken = useAppSelector(state => state.accessToken)
  const AT1810 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIwYzI5NDI0NC1jYzgyLWVkMTEtODI3NS04NzJjODBhZjI3NTMiLCJuYmYiOjE3MjkyNzI0MjEsImV4cCI6MTcyOTM1ODgyMSwiaXNzIjoiU2NhbkdhdGV3YXkiLCJhdWQiOiJzZl9zdHVkZW50MSJ9.8t6JrWta6aFPvOMJq_C4M47WMxL6GhnjORouXyyHfzU"
  async function fetchLimit() {
    try {
      let response = await fetch(`https://gateway.scan-interfax.ru/api/v1/account/info`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${AT1810}`,
          "Accept": "application/json",
        },
      })
      if (response.ok) {
        const data = await response.json()
        const eventFiltersInfo = data.eventFiltersInfo
        setLimitData({ ...eventFiltersInfo })
        console.log(limitData)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoaderHide(true)
    }
  }

  return (
    <div
      className="limit-information-pannel header__limit-information-pannel">

      <Loader isLoaderHide={isLoaderHide} />
      <div className="limit-information-pannel__element">
        <span className="element__span">Использовано компаний</span>
        <span className="element__used">{limitData.usedCompanyCount}</span>
      </div>

      <div className="limit-information-pannel__element">
        <span className="element__span">Лимит по компаниям</span>
        <span className="element__rest">{limitData.companyLimit}</span>
      </div>

    </div>
  )
}

export default LimitInformationPannel