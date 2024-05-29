import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootSatate } from "../redux/store"
import { decrement, incrementAsync, incrementByAmount } from "../redux/counteur/counterSlice";
import { useState } from "react";



const ReduxExample = () => {
  const count = useSelector((state: RootSatate) => state.counter.value);
  const [dona, setDona] = useState<number>(0)
  const dispatch = useDispatch<AppDispatch>();

  // -------------------------------- les methodes -----------------------//
  const handlIncrement = () => {
    // console.log("increment");
    dispatch(incrementAsync(5));
  };

  const handlDecrement = () => {
    dispatch(decrement());
  };

  const handlIncrementByAmount = () => {
    dispatch(incrementByAmount(dona))
  }

  // -------------------------------- les methodes -----------------------//
  return (
    <>
      <div>{count}</div>
      <div>
        <button onClick={() => handlIncrement()}>Increment</button>
        <button onClick={() => handlDecrement()}>Decrement</button>
      </div>
      <br />
      <div className="flex mt-5 mb-4">
        <input type="text" onChange={(e) => setDona(parseInt(e.target.value))} />
        <br />
        <button onClick={() => handlIncrementByAmount()}>IncrementByAmount</button>
      </div>
    </>
  )
}

export default ReduxExample