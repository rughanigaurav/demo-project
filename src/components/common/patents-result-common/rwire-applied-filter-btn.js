import React from 'react'
import RWIRE_IMAGES from "../common-functions/rwire-images";

function RwireAppliedFilterBtn({filter, filterList}) {
    // console.log("in btn",filter,">>",filterList)
  return (
    <button>Priority Country = US <img alt="" src={RWIRE_IMAGES.RwireCloseIcon} className="closeImg"/></button>
  )
}

export default RwireAppliedFilterBtn
