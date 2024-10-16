import { useEffect } from "react"
import "./limitInformationPannel.scss"

interface panelProps {
  isHeaderMenuOpen: boolean
}

function LimitInformationPannel({ isHeaderMenuOpen }: panelProps) {
  useEffect(() => {
    console.log("Данные получены")
  }, [])
  return (
    <div
      style={isHeaderMenuOpen ? { display: "none" } : {}}
      className="limit-information-pannel header__limit-information-pannel">

      <div className="limit-information-pannel__loader"></div>
      <div className="limit-information-pannel__element">
        <span className="element__span">Использовано компаний</span>
        <span className="element__used">35</span>
      </div>

      <div className="limit-information-pannel__element">
        <span className="element__span">Лимит по компаниям</span>
        <span className="element__rest">34</span>
      </div>

    </div>
  )
}

export default LimitInformationPannel