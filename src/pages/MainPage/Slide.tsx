export default function Slide({ img, text }: { img: string, text: string }) {
  return (
    <div className="slide-wrapper">
      <div className="slider__slide">
        <img src={img} alt="img" />
        <p>{text}</p>
      </div>
    </div>

  )
}