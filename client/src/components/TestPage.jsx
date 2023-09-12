import React, { useState } from 'react';

function TestPage() {
  // 상태를 초기화합니다.
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
    <div>
      <form onSubmit={handleSubmit}>
        {/* 여러 개의 버튼을 생성 */}
        <button
          type="button"
          onClick={() => changeColor('1')}
          style={{ backgroundColor: selectedValues.includes('1') ? 'blue' : '' }}
        >
          버튼 1
        </button>
        <button
          type="button"
          onClick={() => changeColor('2')}
          style={{ backgroundColor: selectedValues.includes('2') ? 'blue' : '' }}
        >
          버튼 2
        </button>
        <button
          type="button"
          onClick={() => changeColor('3')}
          style={{ backgroundColor: selectedValues.includes('3') ? 'blue' : '' }}
        >
          버튼 3
        </button>

        {/* 선택한 값을 저장하는 hidden input */}
        <input type="hidden" name="selectedValue" value={selectedValues.join(',')} />

        {/* 전송 버튼 */}
        <input type="submit" value="전송" />
      </form>
    </div>
  );
}

export default TestPage;
