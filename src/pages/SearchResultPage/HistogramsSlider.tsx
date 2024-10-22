import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import Loader from '../../shared/loader/Loader';
import 'swiper/scss';
import 'swiper/scss/navigation';
import TestElement from '../../TestElement';

export default function HistogramsSlider({histogramsData}:any){
  if (histogramsData){
    console.log(histogramsData)
    return(
      <div style={{ width: "100%", height: "250px", backgroundColor: "green" }}>
        {histogramsData.data[0].data.map((item:any,index:number)=>{
          let mm = (new Date(item.date).getMonth()+1)
          let dd = new Date(item.date).getDay()
          let yy = new Date(item.date).getFullYear()
          return <div key={index}>{`${dd}-${mm}-${yy}`}</div>
        })}
      </div>
    )
  } return(
    <TestElement><Loader isLoaderHide={false}></Loader></TestElement>
  )
}