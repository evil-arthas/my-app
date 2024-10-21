import './footer.scss'
import footerIcon from './icon-footer-logo.png'

export default function Footer() {
  return (
    <div className="container footer-container">
      <footer className="footer">

        <div className='footer__logo'>
          <img src={footerIcon} alt="icon" />
        </div>

        <div className='footer__description'>
          <address className='footer__address'>
            г. Москва, Цветной б-р,<br />
            40 +7 495 771 21 11 <br />
            info@skan.ru
          </address>

          <div className='footer__copyright'>
            Copyright. 2022
          </div>

        </div>
      </footer>
    </div>
  )
}