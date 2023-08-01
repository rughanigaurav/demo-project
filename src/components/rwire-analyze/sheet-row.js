import { useState } from "react";

const SheetRow = (props) => {
    const { id, title, onSetAnalyze, sheets, currentSheet } = props;
    const [isDelete, setIsDelete] = useState(false);

    const handleClick = (e) => {
        onSetAnalyze({ currentSheet: e.target.id });
    }

    const handleRightClick = (e) => {
        e.preventDefault()
        setIsDelete(!isDelete);
    }

    const handleDeleteClick = () => {
        if(sheets.length > 1) {
            const newSheetList = sheets.filter(i => i.id !== id);
            let newCurrentSheet = currentSheet;

            if(currentSheet === id) {

                if(id === sheets[0].id) {
                    newCurrentSheet = sheets[1] && sheets[1].id;
                } else {
                    newCurrentSheet = sheets[0] && sheets[0].id;
                }
            }

            onSetAnalyze({sheets: newSheetList, currentSheet: newCurrentSheet});
        } else {
            // eslint-disable-next-line no-console
            console.log("Last sheet could not delete...");
        }
    }

    return (
        <div className="h-100">
            <div key={id} className='sheet-tag px-2 mx-1 h-100 d-flex align-items-center cursor-pointer'
                id={id}
                onClick={handleClick}
                onContextMenu={handleRightClick}
            >{title}</div>
            {isDelete && <div className="sheet-delete-block" onClick={handleDeleteClick}>DELETE</div>}
        </div>
    )
}

export default SheetRow;
