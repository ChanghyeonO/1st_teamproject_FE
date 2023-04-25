import {
  // 회원가입 등 네비바 랜더링
  drawNavbar,
  // 푸터 랜더링
  drawFooter,
} from '../../index.js';
drawNavbar();
drawFooter();

// 장바구니에서 아이템 삭제
document.querySelectorAll('a.remove').forEach(function (removeLink) {
  removeLink.addEventListener('click', function (event) {
    event.preventDefault();
    // 해당 삭제 버튼의 부모부모부모 노드(li<div<div<a>>>)가 아이템의 범위, 그걸 remove
    removeLink.parentNode.parentNode.parentNode.style.display = 'none';
  });
});

// 테스트용으로 모든 아이템 보여주기
// document.querySelectorAll('a.btn.continue').forEach(function (continueLink) {
//   continueLink.addEventListener('click', function () {
//     document.querySelectorAll('li.items').forEach(function (item) {
//       item.style.display = 'block';
//     });
//   });
// });

// SessionStorage에 저장된 'cartItem'을 가져오는 함수 생성
async function getSessionStorage () {
  try {
    let cartData = sessionStorage.getItem('cartItem');
    if (cartData ) {
      cartData = JSON.parse(cart);
    } else {
      cartData = { items: [] };
    }

    const 



  } catch (error) {
		console.error(error);
	}
}
