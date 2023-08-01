import React, { useEffect, useState } from "react";
import { getImagePathFromPN } from "../../common/images-functions";
import {
  handleMouseDown,
  handleTouchStart,
} from "../../common/utils.js";
import "../../assets/css/style.scss";

function RwireViewImageSection(props) {
  const {
    onSetFilter,
    detailsData,
    setIsImageCarouselModalOpen,
    isImageCarouselModalOpen,
    setImagePath,
    setIsClipImage,
  } = props;

  const minWidth = "40%";
  const minHeight = "40%";
  const aspectRatio = 16 / 16;

  const [imageWidth, setImageWidth] = useState(minWidth);
  const [imageHeight, setImageHeight] = useState(
    `calc(${minWidth} * ${aspectRatio})`
  );

  const handleModal = () => {
    onSetFilter({ isViewPageModalOpen: true });
  };

  const handleOpenImagecarousel = (path) => {
    setIsClipImage(true);
    setIsImageCarouselModalOpen(!isImageCarouselModalOpen);
    setImagePath(path);
  };

  const handleResizeImage = (newWidth) => {
    const parsedWidth = parseFloat(newWidth);
    if (parsedWidth >= parseFloat(minWidth)) {
      const newHeight = `calc(${parsedWidth} * ${aspectRatio})`;
      setImageWidth(newWidth);
      setImageHeight(newHeight);
    }
  };

  useEffect(() => {
    const path = detailsData["PN_B"] && getImagePathFromPN(detailsData["PN_B"]);
    const image = new Image();
    image.src = path;
    image.onload = () => {
      if (image.height > image.width + 200) {
        const imageContainer = document.querySelector(".image-container");
        imageContainer.style.width = "50%";
      } else {
        const imageContainer = document.querySelector(".image-container");
        imageContainer.style.width = "";
      }
    };
  }, [detailsData]);

  return (
    <div
      className="patent-view-image-section d-flex flex-column"
      style={{ minWidth, width: imageWidth, minHeight, height: imageHeight }}
    >
      <h5 className="mb-2">
        Images (
        <span onClick={handleModal} className="show-all-btn">
          show all
        </span>
        )
      </h5>
      <div className="patent-view-image-block resizable-column">
        <div
          className="img-resize-handle resize-handle-left"
          onMouseDown={(e) =>
            handleMouseDown(e, -1, imageWidth, handleResizeImage)
          }
          onTouchStart={(e) =>
            handleTouchStart(e, -1, imageWidth, handleResizeImage)
          }
        >
          <div className="resize-handle-icon"></div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="image-container d-flex justify-content-center align-items-center">
            <img
              alt=""
              className="showcase-img cursor-pointer"
              src={
                detailsData["PN_B"] && getImagePathFromPN(detailsData["PN_B"])
              }
              onClick={() =>
                handleOpenImagecarousel(getImagePathFromPN(detailsData["PN_B"]))
              }
            />
          </div>
        </div>

        <div
          className="img-resize-handle resize-handle-right"
          onMouseDown={(e) =>
            handleMouseDown(e, 1, imageWidth, handleResizeImage)
          }
          onTouchStart={(e) =>
            handleTouchStart(e, 1, imageWidth, handleResizeImage)
          }
        ></div>
      </div>
    </div>
  );
}

export default RwireViewImageSection;
