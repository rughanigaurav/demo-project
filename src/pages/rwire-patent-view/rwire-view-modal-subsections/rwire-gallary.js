import React, { useEffect, useState } from "react";
import { BiZoomIn } from "react-icons/bi";
import { BiZoomOut } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineRotateRight } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import "./styles.scss";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
import { getResourcesURL } from "../../../service/elasticSearch";
import { image_api_url } from "../../../components/constant";
import notFound from "../../../assets/images/not-found-image.jpg";
function RwireGallary(props) {
  const {
    images,
    onSetImages,
    setIsImageCarouselModalOpen,
    setImageIndex,
    setIsClipImage,
    currentId,
  } = props;
  const [isLoading, seIsLoading] = useState(true);
  useEffect(() => {
    const getImages = async () => {
      seIsLoading(true);
      if (currentId) {
        const queryObj = {
          publicationNumber: currentId,
        };
        const body = JSON.stringify(queryObj);
        try {
          const response = await getResourcesURL(body, image_api_url);
          if (response.status === 200 && response.data.imageURLS) {
            const imageURLS = response.data.imageURLS;
            onSetImages(imageURLS);
          }
        } catch (error) {
          onSetImages([notFound]);
        }
      }
      seIsLoading(false);
    };
    getImages();
  }, [currentId, onSetImages]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    setRotation(0);
  }, [selectedItem]);
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
    setSelectedItem(selectedItem === images.length - 1 ? 0 : selectedItem + 1);
    setRotation(0);
  };
  const prevSlide = () => {
    setSelectedItem(selectedItem === 0 ? images.length - 1 : selectedItem - 1);
    setRotation(0);
  };

  const handleSelect = (index) => {
    setSelectedItem(index);
    setRotation(0);
  };
  const handleOpenImagecarousel = (path) => {
    setImageIndex(selectedItem);
    setIsClipImage(false);
    setIsImageCarouselModalOpen(true);
  };
  return (
    <TransformWrapper
      initialScale={1}
      defaultPositionX={200}
      defaultPositionY={100}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div className="gallary">
            <div className="image_list">
              {!isLoading &&
                images &&
                images.map((image, index) => {
                  return (
                    <div className={`${selectedItem === index ? "selected-image" : ""
                      } `}>
                      <img
                        alt=""
                        className="slider-images m-2"
                        src={image}
                        onClick={() => {
                          handleSelect(index);
                          resetTransform();
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="image__list__wrapper">
              <div className="gallary_toolbar d-flex justify-content-center">
                <div
                  className="icon icon-big custome-height"
                  onClick={() => {
                    rotateLeft();
                    resetTransform();
                  }}>
                  <MdOutlineRotateLeft />
                </div>
                <div className="d-flex">
                  <div
                    className="icon custome-height"
                    onClick={() => {
                      prevSlide();
                      resetTransform();
                    }}>
                    <MdArrowBackIos />
                  </div>
                  <div className="icon total_slides">
                    {selectedItem + 1} / {images.length}
                  </div>
                  <div
                    className="icon custome-height"
                    onClick={() => {
                      nextSlide();
                      resetTransform();
                    }}>
                    <MdOutlineArrowForwardIos />
                  </div>
                </div>
                <div
                  className="icon icon-big custome-height"
                  onClick={() => {
                    rotateRight();
                    resetTransform();
                  }}>
                  <MdOutlineRotateRight />
                </div>
                <div className="custome-height">
                  <div onClick={handleOpenImagecarousel} title="Open Image">
                    <BiLinkExternal className="icon" />
                  </div>
                </div>
                <div className="custome-height">
                  <BiZoomIn onClick={() => zoomIn()} className="icon" />
                </div>
                <div className="custome-height">
                  <BiZoomOut onClick={() => zoomOut()} className="icon" />
                </div>
                <div className="custome-height">
                  <RxCross2 onClick={() => resetTransform()} className="icon" />
                </div>
              </div>
              <div className="main-image-section">
                <div className="d-flex justify-content-center image-panning">
                  <TransformComponent>
                    <div
                      onClick={handleOpenImagecarousel}
                      className={`cursor-pointer ${isLoading ? "loader-image" : ""
                        }`}
                      title="Open Image">
                      <img
                        alt=""
                        className="main-image"
                        src={images[selectedItem]}
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          objectFit: "",
                        }}
                      />
                    </div>
                  </TransformComponent>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </TransformWrapper>
  );
}

export default RwireGallary;
