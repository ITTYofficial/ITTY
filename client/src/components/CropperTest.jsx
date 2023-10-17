import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropperTest = React.forwardRef(({ onCrop, onFileSelect  }, ref) => {
    const inputRef = useRef(null);
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    React.useImperativeHandle(ref, () => ({
        handleChildrenClick() {
            if (inputRef.current) inputRef.current.click();
        }
    }));

    const handleChildrenClick = () => {
        if (inputRef.current) inputRef.current.click();
    };

    const handleFileChange = (e) => {
        e.preventDefault();

        const files = e.target.files;

        if (!files) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            onFileSelect(true);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (cropperRef.current && cropperRef.current.cropper) {
            const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
            setCroppedImage(croppedDataUrl);
            setImage(null);
            onCrop(croppedDataUrl);
        }
    };

    return (
        <div>
            <form>
                <input
                    type="file"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </form>
            <span onClick={handleChildrenClick}></span>
            {image && (
                <div className="container">
                    <div className="content-wrapper">
                        <div className="content">
                            <Cropper
                                ref={cropperRef}
                                aspectRatio={1}
                                src={image}
                                viewMode={1}
                                width={800}
                                height={500}
                                background={false}
                                responsive
                                autoCropArea={1}
                                checkOrientation={false}
                                guides
                            />
                        </div>
                    </div>
                    <div className="footer">
                        <button onClick={() => setImage(null)}>취소</button>
                        <button className="crop" onClick={getCropData}>
                            적용하기
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
});

export default CropperTest;
