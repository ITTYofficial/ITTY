import React, { useState } from 'react'
import style from "../css/ProjectWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';




const ProjectWrite = () => {

    const [selectedValues, setSelectedValues] = useState([]);

    // 버튼 클릭 시 호출되는 함수
    function changeColor(value) {
        if (selectedValues.includes(value)) {
            // 이미 선택된 버튼인 경우, 선택 해제합니다.
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            // 새로운 버튼을 선택한 경우, 추가합니다.
            setSelectedValues([...selectedValues, value]);
        }
    }

    // 폼 전송 시 호출되는 함수
    function handleSubmit(event) {
        event.preventDefault();
        // 선택한 값(selectedValues)을 사용하여 작업을 수행하거나 서버로 전송할 수 있습니다.
        console.log('선택한 값:', selectedValues);
    }

    return (
        <div className={style.Main_container}>
            <h2>프로젝트</h2>
            <form>
                <p> 제목 </p>
                <input type="text" />

                <p>포지션</p>

                {/* 여러 개의 버튼을 생성 */}
                <button
                    type="button"
                    onClick={() => changeColor('1')}
                    style={{ backgroundColor: selectedValues.includes('1') ? '#ABE9FF' : '' }}
                >
                    백엔드
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('2')}
                    style={{ backgroundColor: selectedValues.includes('2') ? '#ABE9FF' : '' }}
                >
                    프론트엔드
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('3')}
                    style={{ backgroundColor: selectedValues.includes('3') ? '#ABE9FF' : '' }}
                >
                    풀스택
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('4')}
                    style={{ backgroundColor: selectedValues.includes('4') ? '#ABE9FF' : '' }}
                >
                    DB
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('5')}
                    style={{ backgroundColor: selectedValues.includes('5') ? '#ABE9FF' : '' }}
                >
                    UI / UX
                </button>

                {/* 선택한 값을 저장하는 hidden input */}
                <input type="hidden" name="selectedValue" value={selectedValues.join(',')} />


                <p>프로젝트 시작일</p>


                {/* 전송 버튼 */}
                <input type="submit" value="전송" />
            </form>
        </div>
    )
}

export default ProjectWrite