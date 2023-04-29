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

// 모든 slider images 가져옴, 이미지 루틴을 돌리기 위한 index 설정
const sliderImages = document.querySelectorAll('.slider img');
const dots = document.querySelectorAll('.dot');
let currentImageIndex = 0;

// slider의 이미지를 7초마다 전환하는 함수
function changeImage() {
  // 최근의 이미지를 안보이게
  sliderImages[currentImageIndex].style.display = 'none';
  // 다음 이미지의 인덱스 +1
  currentImageIndex++;
  // slider의 이미지수와 최근 이미지의 index가 같다면, 최근 이미지의 index를 0으로
  if (currentImageIndex === sliderImages.length) {
    currentImageIndex = 0;
  }
  // 다음 이미지 보이게
  sliderImages[currentImageIndex].style.display = 'block';
}
// 이미지 전환 간격은 7000ms
setInterval(changeImage, 5000);

// 매개변수로 받은 인덱스의 slider 이미지를 보여주는 함수
function showImage(index) {
  sliderImages[currentImageIndex].style.display = 'none';
  currentImageIndex = index;
  sliderImages[currentImageIndex].style.display = 'block';
  updateActiveDot();
}

// 이미지와 dot가 같은 순번에 활성화
function updateActiveDot() {
  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// dots가 click event를 받았을 때 해당 인덱스의 이미지를 보여줌
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showImage(index);
  });
});