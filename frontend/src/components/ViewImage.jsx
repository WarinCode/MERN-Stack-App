import { element, string } from "prop-types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { GoZoomIn, GoZoomOut } from "react-icons/go";
import { MdRotate90DegreesCcw } from "react-icons/md";
import "react-photo-view/dist/react-photo-view.css";
import "../style/custom.css";

const ViewImage = ({ element, src }) => {
  return (
    <PhotoProvider
      speed={() => 300}
      maskOpacity={0.7}
      toolbarRender={({ scale, onScale, rotate, onRotate }) => (
        <>
          <GoZoomIn
            className="PhotoView-Slider__toolbarIcon"
            onClick={() => onScale(scale + 0.5)}
          />
          <GoZoomOut
            className="PhotoView-Slider__toolbarIcon"
            onClick={() => onScale(scale - 0.5)}
          />
          <MdRotate90DegreesCcw
            className="PhotoView-Slider__toolbarIcon"
            onClick={() => onRotate(rotate + 90)}
          />
        </>
      )}
    >
      <PhotoView src={src}>{element}</PhotoView>
    </PhotoProvider>
  );
};

ViewImage.propTypes = {
  element: element.isRequired,
  src: string.isRequired,
};

export default ViewImage;
