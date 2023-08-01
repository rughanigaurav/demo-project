import { useDrop } from 'react-dnd'
import { ItemTypes } from './item-types'
import CloseIcon from "../../images/close-icon-white.svg";

const YDropDiv = (props) => {

  const { currentSheet, getFullName, onSetGenerateChart } = props;


  const handleClick = () => {
    onSetGenerateChart({ [currentSheet]: { ...props[currentSheet], yaxis  : "" } })
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: props.dropboxname }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver;
  let backgroundColor = '#0048A2';

  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div className="axis-block d-flex align-items-center y-axis-block flex-grow-1 justify-content-center" ref={drop} style={{ backgroundColor }} data-testid="yaxis"
      title="Drop field here"
    >
      <div className=''>{props[currentSheet].yaxis ?
        (
          <>
            <span>{`${getFullName(props[currentSheet].yaxis)} count`}</span>
            <span className='cursor-pointer close-icon-axis' onClick={handleClick}>
              <img src={CloseIcon} alt="clear-axix" />
            </span>
          </>
        ) : (isActive ? 'Release to drop' : 'Drag and drop here for count')}</div>
    </div>
  )
}

export default YDropDiv;
