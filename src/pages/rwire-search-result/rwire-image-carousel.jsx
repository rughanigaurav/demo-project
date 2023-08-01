import React, { useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
import { BiZoomIn } from "react-icons/bi";
import { BiZoomOut } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineRotateRight } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoIosResize } from "react-icons/io";

const RwireImageCarousel = (props) => {
  const {
    imagePath = "",
    setIsImageCarouselModalOpen,
    imageIndex = 0,
    images,
    isClipImage = true,
  } = props;
  const [rotation, setRotation] = useState(0);
  const [index, setIndex] = useState(imageIndex);

  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }

    setRotation(newRotation);
  };

  const rotateLeft = () => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }

    setRotation(newRotation);
  };

  const nextSlide = () => {
    setIndex(index === images.length - 1 ? images.length - 1 : index + 1);
    setRotation(0);
  };
  const prevSlide = () => {
    setIndex(index === 0 ? 0 : index - 1);
    setRotation(0);
  };
  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={4}
      defaultPositionX={200}
      defaultPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <div className="image-Carousel-modal">
          <div className="gallary-toolbar me-2">
            <div className="toolbar_icons">
              <BiZoomIn
                title="Zoom In"
                onClick={() => zoomIn()}
                className="icon"
              />
            </div>
            <div className="toolbar_icons">
              <BiZoomOut
                title="Zoom Out"
                onClick={() => zoomOut()}
                className="icon"
              />
            </div>
            <div className="toolbar_icons">
              <IoIosResize
                title="Resize"
                onClick={() => resetTransform()}
                className="icon"
              />
            </div>
            <div className="toolbar_icons">
              <RxCross2
                title="Close"
                onClick={() => setIsImageCarouselModalOpen(false)}
                className="icon"
              />
            </div>
          </div>
          <div className="image-slider d-flex flex-column ">
            <div className="d-flex justify-content-center image-panning">
              <TransformComponent>
                <img
                  src={isClipImage ? imagePath : images[index]}
                  alt=""
                  style={{ transform: `rotate(${rotation}deg)` }}
                  className="selected-carousel-image"
                />
              </TransformComponent>
            </div>
            <div className="image-controls  d-flex justify-content-center">
              <div
                className="icon icon-big me-5"
                onClick={() => {
                  rotateLeft();
                  resetTransform();
                }}
              >
                <MdOutlineRotateLeft />
              </div>
              <div className="d-flex">
                <div
                  className="icon mx-3"
                  onClick={() => {
                    prevSlide();
                    resetTransform();
                  }}
                >
                  <MdArrowBackIos />
                </div>
                <div className="icon">
                  {isClipImage
                    ? "1/1"
                    : images.length > 0
                    ? `${index + 1} /  ${images.length}`
                    : "0/0"}
                </div>
                <div
                  className="icon mx-3"
                  onClick={() => {
                    nextSlide();
                    resetTransform();
                  }}
                >
                  <MdOutlineArrowForwardIos />
                </div>
              </div>
              <div
                className="icon icon-big ms-5"
                onClick={() => {
                  rotateRight();
                  resetTransform();
                }}
              >
                <MdOutlineRotateRight />
              </div>
            </div>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
};

export default RwireImageCarousel;
