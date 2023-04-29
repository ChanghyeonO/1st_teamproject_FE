export const drawNavbar = () => {
  let userId = '';
  let navTemplate = `
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href='../main-page/home-page.html'>
          <img
            src="../../assets/img/DAMAH-logo.PNG"
            alt="담아"
            style="width: 100px; height: 60px"
          />
        </a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <li class="navbar-item navbar-item--arrow" href="#">
            PRODUCT
            <div class="dropdown-container">
              <ul>
                <li class="product-list"><a href="../list/list.html?c=MUG" class="mug-list">MUG & CUP</a></li>
                <li class="product-list"><a href="../list/list.html?c=TUMBLER" class="tumbler-list">TUMBLER & BOTTLE</a></li>
                <li class="product-list"><a href="../list/list.html?c=TEA" class="tea-list">TEA-WARE</a></li>
              </ul>
            </div>
          </li>

          <li class="navbar-item" href="#">ABOUT</li>
          <li class="navbar-item" href="#">LOCATION</li>
          <li class="navbar-item" href="#">FOR BUSINESS</li>
        </div>

        <div class="navbar-end">
          <div class="navbar-icon">
            <div class="icon-buttons">
              <span class="icon-button" id="homebtn">
                <i class="fi fi-rr-home"></i>
              </span>   
              <span class="icon-button" id="userinfo">
                <i class="fi fi-rr-user"></i>
              </span>
              <span class="icon-button" id="cart">
                <i class="fi fi-rr-shopping-cart"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
  // 첫 번째 header 태그를 찾아서 해당 태그의 시작 부분에 nav.html을 삽입
  const headerTag = document.getElementsByTagName('header')[0];
  headerTag.insertAdjacentHTML('afterbegin', navTemplate);
};

// footer.css를 template에 적용하는 함수
export const drawFooter = () => {
  let footerTemplate = `
    <div class="footer">
        <div class="footer-row">
            <p>회사명: (주)담아 | 대표자: Team Rescue | 사업자등록번호: ###-##-##### | 
                통신판매업 신고: 제 ####-서울%%-@@@@호</p>
            <p>주소: 서울 성동구 아차산로##길 ## 서울넉넉 @층(우편번호 12345) | 전화: 070-4633-2017</p>
            <p>메일: damah@mail.com | 개인정보관리 책임자: Master</p>
            <p>©2023 DAMAH . All right reserved.</p>
        </div>
    </div>
  `;
  // 마지막 footer 태그를 찾아서 해당 태그의 시작 부분에 footer.html을 삽입
  const footerTag = document.getElementsByTagName('footer')[0]; // footer 태그를 가져와 footerTag 변수에 할당
  footerTag.insertAdjacentHTML('beforeend', footerTemplate); // footerTag에 template을 렌더링
};

// nav 바에 js 요소 적용
export const activeNavbar = () => {
  // 로그인 버튼, 로그아웃 버튼, 유저 정보 버튼, 장바구니 버튼을 가져온다.
  const homeBtn = document.getElementById('homebtn');
  // const logoutBtn = document.getElementById('logout');
  const userinfoBtn = document.getElementById('userinfo');
  const cartBtn = document.getElementById('cart');
  const URI = 'http://34.64.252.224'; // 서버 포트 URI

  homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../main-page/home-page.html';
  });

  // loginBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   window.location.href = '../login/login.html';
  // });

  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../shopping-cart/shopping-cart.html';
  });

  userinfoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('isLogined')) {
      window.location.href = '../user/user.html';
    } else {
      console.log('로그인 확인 토큰 없음');
      window.location.href = '../login/login.html';
    }
  });

};

// 숫자에 쉼표를 추가 (10000 -> 10,000)
export const addCommas = n => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
