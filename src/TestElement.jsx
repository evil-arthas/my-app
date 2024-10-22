import { useDispatch } from "react-redux"

function TestElement(props) {
  return (
    <div
      style={{ width: "250px", height: "250px", backgroundColor: "red" }}>
        {props.children}
    </div>
  )
}

export default TestElement