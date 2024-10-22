import './mainPage.scss'
import imageSearcher from './image-searcher.svg'
import BlueButton from '../../shared/BlueButton/BlueButton'
import { useNavigate } from 'react-router-dom'
import { Navigation, A11y } from 'swiper/modules';
import iconMagnifire from './icon-magnifire.png';
import iconShield from './icon-shiled.png';
import iconTimer from './icon-timer.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import Slide from './Slide';
import iconSliderArrow from './icon-slider-arrow.png'
import iconDarts from './icon-darts.svg'
import iconBulb from './icon-bulb.svg'
import iconLaptop from './icon-laptop.svg'


export default function MainPage() {

  const navigate = useNavigate()
  return (
    <div className="container">
      <main className='main-page'>
        <section className='main-page__info-section'>
          <div className='info-section__text'>
            <h1 className='info-section__header'>
              сервис по поиску <br />
              публикаций <br />
              о компании <br />
              по его ИНН <br />
            </h1>
            <p className='info-section__description'>
              Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
            </p>
            <BlueButton
              className={"info-section__blue-button blue-button"}
              onClick={() => navigate('/search', { replace: true })}
            >
              Запросить данные
            </BlueButton>
          </div>
          <div className='info-section__image'>
            <img src={imageSearcher} alt="image-searcher" />
          </div>
        </section>


        <section className="main-page__slider">
          <h1 className="slider__header">
            ПОЧЕМУ ИМЕННО МЫ?
          </h1>
          <div className='slider-wrapper'>
            <button className="icon-arrow-long-left review-swiper-button-prev">
              <img src={iconSliderArrow} alt="prevButton" />
            </button>
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                800: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1250: {
                  slidesPerView: 3,
                  spaceBetween: 30
                }
              }}
              navigation={{
                nextEl: '.review-swiper-button-next',
                prevEl: '.review-swiper-button-prev',
              }}
            >
              <SwiperSlide>
                <Slide
                  img={iconTimer}
                  text="Высокая и оперативная скорость обработки заявки" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide
                  img={iconMagnifire}
                  text="Огромная комплексная база данных, обеспечивающая объективный ответ на запрос" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide
                  img={iconShield}
                  text="Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству" />
              </SwiperSlide>
              <SwiperSlide>
                <Slide
                  img={iconShield}
                  text="Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству" />
              </SwiperSlide>
              <SwiperSlide>
                <Slide
                  img={iconShield}
                  text="Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству" />
              </SwiperSlide>
            </Swiper>
            <button className="icon-arrow-long-right review-swiper-button-next">
              <img src={iconSliderArrow} alt="prevButton" />
            </button>
          </div>

        </section>

        <section className="main-page__image">
          <div className='image-wrapper'></div>
        </section>

        <section className='main-page__tariffs'>
          <h1>
            НАШИ ТАРИФЫ
          </h1>
          <div className='card card_yellow'>
            <div className="card-image">
              <img src={iconBulb} alt="bulb" />
            </div>
            <div className="card__header">
              <h2>Beginer</h2>
              <p>для небольшого исследования</p>
            </div>
            <div className="card__content">
              <p className="card__price">
                <span>799 ₽</span> <span>1 200 ₽</span>
              </p>
              <p className="card__price-description">
                или 150 ₽/мес. при рассрочке на 24 мес.
              </p>
              <p className="card__list-description">
                В тариф входит:
              </p>
              <ul className="card__list">
                <li>Безлимитная история запросов</li>
                <li>Безопасная сделка</li>
                <li>Поддержка 24/7</li>
              </ul>
              <BlueButton className='card__blue-button blue-button'>Перейти в личный кабинет</BlueButton>
            </div>
          </div>

          <div className='card card_green'>
            <div className="card-image card-image_rotated">
              <img src={iconDarts} alt="darts" />
            </div>
            <div className="card__header">
              <h2>Pro</h2>
              <p>для HR и фрилансеров</p>
            </div>
            <div className="card__content">
              <p className="card__price">
                <span>1 299 ₽</span> <span>2 600 ₽</span>
              </p>
              <p className="card__price-description">
                или 279 ₽/мес. при рассрочке на 24 мес.
              </p>
              <p className="card__list-description">
                В тариф входит:
              </p>
              <ul className="card__list">
                <li>Все пункты тарифа Beginer</li>
                <li>Экспорт истории</li>
                <li>Рекомендации по приоритетам</li>
              </ul>
              <BlueButton className='card__blue-button blue-button'>Подробнее</BlueButton>
            </div>
          </div>

          <div className='card card_black'>
            <div className="card-image card-image_laptop">
              <img src={iconLaptop} alt="laptop" />
            </div>
            <div className="card__header">
              <h2>Business</h2>
              <p>Для корпоративных клиентов</p>
            </div>
            <div className="card__content">
              <p className="card__price">
                <span>2 370 ₽</span> <span>3 700 ₽</span>
              </p>
              <p className="card__price-description card__price-description_pro">
                или 279 ₽/мес. при рассрочке на 24 мес.
              </p>
              <p className="card__list-description">
                В тариф входит:
              </p>
              <ul className="card__list">
                <li>Все пункты тарифа Pro</li>
                <li>Безлимитное количество запросов</li>
                <li>Приоритетная поддержка</li>
              </ul>
              <BlueButton className='card__blue-button blue-button'>Подробнее</BlueButton>
            </div>
          </div>

          


         
        </section>
      </main>
    </div>

  )
}