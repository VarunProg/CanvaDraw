import { useAppDispatch, useAppSelector } from "../hooks";
import { updateAction, selectedColor } from "../store/globalSlice";
import "../styles/App.css";
import "../styles/utils.css";
const ActionPanel = () => {
  const { totalItems, action, fillColor } = useAppSelector(
    (state) => state.global
  );
  const dispatch = useAppDispatch();

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
          <button
            className={action === "add" ? "btn " : ""}
            onClick={(e) => handleClick(e, "add")}
          >
            +
          </button>
          <button
            className={action === "remove" ? "btn " : ""}
            onClick={(e) => handleClick(e, "remove")}
          >
            -
          </button>
        </div>
        <div className="color-boxes">
          <button
            className="box box-1"
            onClick={(e) => handleBoxSelection(e, "red")}
          ></button>
          <button
            className=" box box-2"
            onClick={(e) => handleBoxSelection(e, "blue")}
          ></button>
          <button
            className="box box-3 "
            onClick={(e) => handleBoxSelection(e, "yellow")}
          ></button>
        </div>
        <h3 className="content">
          <span>{totalItems === 0 ? <h5>No Elements</h5> : totalItems}</span>
        </h3>
        <button
          disabled={!totalItems}
          className={totalItems ? "btn " : ""}
          style={{ width: "70px" }}
          onClick={(e) => handleClick(e, "clear")}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default ActionPanel;
