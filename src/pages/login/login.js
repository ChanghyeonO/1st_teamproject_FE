import {
  // 회원가입 등 네비바 랜더링
  drawNavbar,
  // 푸터 랜더링
  drawFooter,
  activeNavbar,
} from '../../utils/index.js';
drawNavbar();
drawFooter();
activeNavbar();

// 서버 포트 URI
const URI = "http://34.64.252.224";

// html 요소
const idInput = document.querySelector('#idInput');
const passwordInput = document.querySelector('#passwordInput');

const loginButton = document.querySelector('#loginButton');

// 로그인 버튼 이벤트
loginButton.addEventListener('click', handleSubmit);

// 이벤트 함수
async function handleSubmit(e) {
  e.preventDefault();
  
  // 입력 여부 확인
  if (!idInput.value) {
    return alert("아이디를 입력해 주세요.");
  }
  
  if (!passwordInput.value) {
    return alert("비밀번호를 입력해 주세요.");
  }

  // 객체 생성
  const data = {
    userName: idInput.value,
    password: passwordInput.value
  }
  
  // JSON 생성
  const dataJson = JSON.stringify(data);
  
  // 로그인 요청 서버에 보내기
  const response = await fetch(`${URI}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: dataJson,
    credentials: 'include'
  })
  .then(response => {
    if (response.status === 200) {
      sessionStorage.setItem("isLogined", "true");
      alert("로그인에 성공하였습니다!");
      // 로그인 후 페이지 이동
      window.location.href = '../main-page/home-page.html'
    } else {
      throw new Error('로그인 실패');
    }
  })
  .catch(error => {
    console.error(error);
  });
};