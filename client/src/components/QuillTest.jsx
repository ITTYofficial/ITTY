import React, { useContext, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from "quill-image-resize";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import '../css/Quill.css';
import { PlayBoardContext } from '../context/PlayBoardContext';

Quill.register("modules/ImageResize", ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

const QuillTest = () => {
    const quillRef = useRef(null); // useRef로 ref 생성

    const imageHandler = async () => {
      console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
  
      // 1. 이미지를 저장할 input type=file DOM을 만든다.
      const input = document.createElement('input');
      // 속성 써주기
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
      // input이 클릭되면 파일 선택창이 나타난다.
  
      // input에 변화가 생긴다면 = 이미지를 선택
      input.addEventListener('change', async () => {
        console.log('온체인지');
        const file = input.files[0];
        // multer에 맞는 형식으로 데이터 만들어준다.
        const formData = new FormData();
        formData.append('img', file); // formData는 키-밸류 구조
        // 백엔드 multer라우터에 이미지를 보낸다.
        console.log("테스트",formData.file);
        console.log("테스트",formData.file.filename);
        try {
          const result = await axios.post('http://localhost:8088/project/write', formData);
          console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
          const IMG_URL = result.data.url;
  
          const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
  
          const range = editor.getSelection();
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, 'image', IMG_URL);
        } catch (error) {
          console.log('실패했어요ㅠ');
        }
      });
    };

    const imageDropHandler = async (imageDataUrl, type, imageData) => {
      const formData = new FormData()
      const blob = imageData.toBlob()
  
      formData.append('img', blob)
  
      try {
        const result = await axios.post('http://localhost:8088/project/write', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;
  
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
  
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패했어요ㅠ');
      }
    }
  
    const modules = useMemo(() => {
      return {
        toolbar: {
          container: [
            ['image'],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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
          mopdules: ["Resize", "DisplaySize"]
        }
      };
    }, []);
  
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'image',
    ];
  
    const {value, setValue} = useContext(PlayBoardContext);

    console.log("여기서 출력되는거에용",value);
  
    return (
      <div>
        
  
        <ReactQuill
          ref={quillRef} // useRef로 생성한 ref를 연결
          theme="snow"
          placeholder="플레이스 홀더"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      </div>
    )
  }

export default QuillTest