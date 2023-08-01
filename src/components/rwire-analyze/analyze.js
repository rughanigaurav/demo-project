import Container from "../../common/main-container";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragContainer } from "./drag-container";
import "./styles.scss";

const analyze = (props) => {

    return (
        <>
            <Container className="analyze-container chart-page">
                <DndProvider backend={HTML5Backend}>
                    <DragContainer {...props} />
                </DndProvider>
            </Container>
        </>
    )
}

export default analyze;
