import { useDrop } from 'react-dnd'
import { ItemTypes } from './item-types.js'
import CloseIcon from "../../images/close-icon-white.svg";

const XDropDiv = (props) => {
  const { currentSheet, getFullName, onSetGenerateChart } = props;

  const handleClick = () => {
    onSetGenerateChart({ [currentSheet]: { ...props[currentSheet], xaxis: "" } })
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: props.dropboxname }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#0048A2'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (

      <div className='axis-block x-axis-block me-3' ref={drop} style={{ backgroundColor }} data-testid="xaxis"
        title="Drop field here"
      >

        {props[currentSheet].xaxis ?
          (
            <>
              <span>{getFullName(props[currentSheet].xaxis)}</span>
              <span className='cursor-pointer close-icon-axis' onClick={handleClick}>
                <img src={CloseIcon} alt="clear-axix" />
              </span>
            </>
          ) :
          (isActive ? 'Release to drop' : 'Drag and drop Field here')
        }
      </div>

  )
}

export default XDropDiv;
