import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import Loader from '../../shared/loader/Loader';
import 'swiper/scss';
import 'swiper/scss/navigation';
import TestElement from '../../TestElement';

export default function HistogramsSlider({ histogramsData }: any) {
  // if (histogramsData) {
  //   return (
  //     <div style={{}}>
  //       <Swiper
  //         modules={[Navigation, A11y]}
  //         spaceBetween={30}
  //         slidesPerView={5}
  //         navigation
  //       >
  //         {histogramsData.data[0].data.map((item: any, index: number) => {
  //           let mm: string | number = (new Date(item.date).getMonth() + 1)
  //           let dd: string | number = new Date(item.date).getDay()
  //           let yy = new Date(item.date).getFullYear()
  //           if (mm < 10) {
  //             mm = "0" + mm
  //           }

  //           if (dd < 10) {
  //             dd = "0" + dd
  //           }
  //           let totalDocuments = item.value
  //           let riskFactors = histogramsData.data[1].data[index].value

  //           const slide = <div className='search-page__histogramsDataSlider-slide'>
  //             <div>{`${dd}-${mm}-${yy}`}</div>
  //             <div>{totalDocuments}</div>
  //             <div>{riskFactors}</div>
  //           </div>

  //           return <SwiperSlide>{slide}</SwiperSlide>
  //         })}
  //       </Swiper>
  //     </div>
  //   )
  // }
  return (
    <div className='histogramsSlider-loader'><Loader isLoaderHide={false}></Loader></div>
  )
}