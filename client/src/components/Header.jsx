import React from 'react'

const Header = () => {
  return (
    <div className='Navigation'>
        <img src="#" />
        <div className='Category'>
            <ul>
                <li><a href='#'>Community🕹</a></li>
                <li><a href='#'>QnA👋</a></li>
                <li><a href='#'>Share</a></li>
                <li><a href='#'>Private</a></li>
            </ul>
            <button>&#128100;</button>
        </div>
        <div className='Member'>
            <ul>
                <li><a href='#'>로그인</a></li>
                <li><a href='#'>회원가입</a></li>
            </ul>
            <button>&#128100;</button>
        </div>
    </div>
  )
}

export default Header