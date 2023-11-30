import React, { useContext, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import "../css/Quill.css";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase";
import { QuillContext } from "../context/QuillContext";

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

const QuillTest = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const quillRef = useRef(null); // useRef로 ref 생성

  const [imageUrl, setImageUrl] = useState("");

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(
          storage,
          `image/${Date.now()}`
        );
        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
            console.log('url 확인', url);
            setImageUrl(url);
          });
        });

      } catch (error) {
        console.log(error);
      }
    });
  };

  const imageDropHandler = async (imageDataUrl, type, imageData) => {
    // if (blob.size > 10 * 1024 * 1024) {
    //   alert("파일이 너무 큽니다. 10MB 이하의 파일을 업로드하세요.");
    //   return;
    // }

    try {
      const IMG_URL = await handleSaveCroppedImage(imageDataUrl);;
      const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기

      const range = editor.getSelection();
      // 가져온 위치에 이미지를 삽입한다
      editor.insertEmbed(range.index, "image", IMG_URL);
    } catch (error) { }
  };

  const [savedUrl, setSavedUrl] = useState("");

  const uploadImageToFirebase = async (croppedImageDataUrl) => {
    const imageDataBlob = await fetch(croppedImageDataUrl).then((res) => res.blob());

    try {
      const storageRef = ref(storage, `image/${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, imageDataBlob);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Firebase에 이미지를 업로드하는 동안 오류가 발생했습니다.", error);
      return null;
    }
  };

  const handleSaveCroppedImage = async (croppedImageDataUrl) => {
    const imageUrl = await uploadImageToFirebase(croppedImageDataUrl);
    setSavedUrl(imageUrl);
    return imageUrl;
  };

  
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image", "link", "video"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ 'color': [] }, { 'background': [] }],
        ],

        handlers: {
          image: imageHandler,
        },
      },
      imageDropAndPaste: {
        handler: imageDropHandler,
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        mopdules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const { value, setValue } = useContext(QuillContext);


  return (
    <div>
      <ReactQuill style={{ height: "600px" }}
        ref={quillRef} // useRef로 생성한 ref를 연결
        theme="snow"
        placeholder="내용을 입력해주세요."
        value={value}
        onChange={setValue}
        modules={modules}
      /* formats={formats} */
      />
    </div>
  );
};

export default QuillTest;
