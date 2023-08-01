
import React, { useState } from "react";
import RWireFielded from "../../rwire-todo-list/rwire-fielded";
import { Modal } from 'rsuite';
const RWirePatentsModal = ()=>{
    const [toggle, setToggle] = useState(false)
    return(
        <>
        {toggle && (
            <>
            <Modal className="modal-class" size="full" backdrop="true" keyboard={false} open={true} onClose={() => setToggle(!toggle)}>
              <Modal.Body>
              <RWireFielded />
              </Modal.Body>

            </Modal>
            </>
            )}
            </>
    )
}

export default RWirePatentsModal;
