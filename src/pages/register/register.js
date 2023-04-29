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

const URI = "http://34.64.252.224";

const userNameInput = document.querySelector('#userNameInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const emailInput = document.querySelector('#emailInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const addressBasicInput = document.querySelector('#addressBasicInput');
const registerButton = document.querySelector('#registerButton');

// 에러 메시지 출력 함수
function showError(errorElement, isInvalid, focusInput) {
  if (isInvalid) {
    errorElement.style.display = "block";
    focusInput.focus();
  } else {
    errorElement.style.display = "none";
  }
}

// 유효성 검사 함수
function validateInputs() {
  const userName = userNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;
  const mail = emailInput.value;
  const address = addressBasicInput.value;

  const isIdValid = /^.{3,15}$/u.test(userName);
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,30}$/u.test(password);;
  const isPasswordCheck = password === passwordConfirm;
  const isPhoneNumberValid = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/u.test(phoneNumber);
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.com$/u.test(mail);
  const isAddressValid = /^.{1,}$/u.test(address);

  // 에러 메시지 출력
  showError(document.querySelector('#idError'), !isIdValid, userNameInput);
  showError(document.querySelector('#pwError'), !isPasswordValid, passwordInput);
  showError(document.querySelector('#pwcError'), !isPasswordCheck, passwordConfirmInput);
  showError(document.querySelector('#emError'), !isEmailValid, emailInput);
  showError(document.querySelector('#phError'), !isPhoneNumberValid, phoneNumberInput);
  showError(document.querySelector('#adError'), !isAddressValid, addressBasicInput);

  return isIdValid && isPasswordValid && isPasswordCheck && isEmailValid && isPhoneNumberValid && isAddressValid;
}

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const isValid = await validateInputs();
  if (isValid) {
    // 객체 생성
    const userName = userNameInput.value;
    const password = passwordInput.value;
    const roleType = "USER";
    const phoneNumber = phoneNumberInput.value;
    const mail = emailInput.value;
    const address = addressBasicInput.value;

    const data = {
      userName,
      password,
      roleType,
      phoneNumber,
      mail,
      address,
    }
    
    // JSON 생성
    const dataJson = JSON.stringify(data);
    
    const res = await fetch(`${URI}/api/auth/signup`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: dataJson,
    });
    
    if (res.status === 200) {
      alert("회원가입에 성공하였습니다!");
      window.location.href = '../login/login.html';
    } else {
      alert("회원가입에 실패하였습니다");
      console.error(error);
    }
  }
});