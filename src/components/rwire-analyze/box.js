import { useDrag } from 'react-dnd'
import { ItemTypes } from './item-types.js'


export const Box = function Box(props) {
  const { code, title, onSetGenerateChart, currentSheet } = props;

  const callHandler = (data, axis) => {

    onSetGenerateChart({[currentSheet] : { ...props[currentSheet], [axis]: data }});
  }

  // eslint-disable-next-line
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { code },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        callHandler(item.code, dropResult.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
      <div ref={drag} className="drop-box-block" style={{ opacity }} data-testid={`box`}>
          {title}
      </div>
  )
}
