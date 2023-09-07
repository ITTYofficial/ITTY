import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef } from 'react';


const ToastTest = () => {

    const editorRef = useRef();

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };
    return (
        <div className="edit_wrap">
            <Editor
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                plugins={[colorSyntax]}
                ref={editorRef}
                onChange={onChange}
                language="ko-KR"

                hooks={{
                    addImageBlobHook: async (blob, callback) => {

                        console.log(blob);  
                        console.log(window.URL.createObjectURL(blob));

                        callback(window.URL.createObjectURL(blob));
                    }
                }}
            />
        </div>
    );
}

export default ToastTest