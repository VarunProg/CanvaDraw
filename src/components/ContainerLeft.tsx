import { useAppDispatch, useAppSelector } from "../Hooks";
import {
  updateAction,
  updateTotalItems,
  selectedColor,
} from "../Store/ActionSlice";
import "../styles/App.css";
const ContainerLeft = () => {
  const { totalItems } = useAppSelector((state) => state.action); // get state
  const dispatch = useAppDispatch(); // updatind state

  const handleClick = (
    _e: React.MouseEvent<HTMLButtonElement>,
    action: string
  ): void => {
    dispatch(updateAction(action));
  };

  const handleBoxSelection = (
    _e: React.MouseEvent<HTMLButtonElement>,
    selectedColorBox: string
  ): void => {
    dispatch(selectedColor(selectedColorBox));
  };
  return (
    <>
      <div className="container-left">
        <div className="buttons">
          <button className="btn-1" onClick={(e) => handleClick(e, "add")}>
            +
          </button>
          <button className="btn-2" onClick={(e) => handleClick(e, "remove")}>
            -
          </button>
        </div>
        <div className="color-boxes">
          <button
            className="box box-1"
            onClick={(e) => handleBoxSelection(e, "red")}
          ></button>
          <button
            className="box box-2"
            onClick={(e) => handleBoxSelection(e, "blue")}
          ></button>
          <button
            className="box box-3"
            onClick={(e) => handleBoxSelection(e, "yellow")}
          ></button>
        </div>
        <h3>
          <span>{totalItems}</span>
        </h3>
        <button
          style={{ width: "70px" }}
          onClick={(e) => handleClick(e, "clear")}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default ContainerLeft;
