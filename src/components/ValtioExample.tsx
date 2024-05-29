import { useSnapshot } from "valtio"
import store from "../valtio/store"


const ValtioExample = () => {
    const counterSnap = useSnapshot(store.valtioCount);
  return (
    <>
        <h2>-------------------------------------------------------------------------------------------------------</h2>
      <div>
        <h3>{counterSnap.countA}</h3>
        <div>
        <button onClick={()=>store.valtioCount.increment()}>Increment</button>
      </div>
      </div>
    </>
  )
}

export default ValtioExample