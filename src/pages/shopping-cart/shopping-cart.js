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
async function getSessionStorage() {
  try {
    let cartData = sessionStorage.getItem('cartItem');
    if (cartData ) {
      cartData = JSON.parse(cartData);
    } else {
      cartData = { items: [] };
    }

    // 현재 sessionStorage에 담겨 있는 정보 예시
    // [{productName: "킨토 캐스트 에스프레소컵 90ml", productPrice: "7,400원 (부가세포함)", quantity: "3"}]

    // map으로 각각의 데이터를 가져와서 li 만들어 준 후 join
    // 지금은 li class가 items odd로 고정, css로 odd even을 다르게 보여줄 경우 filter를 한 번 더 적용해야 할 것 같습니다.
    // img src의 경우 sessionStorage에 담겨 있지 않아 id값을 활용하여 다르게 가져와야 할 것 같습니다.
    // prodTotal 하위의 <p>태그는 'productPrice'값이 현재 Number가 아니기에 창현님이 수정하신 수 다시 적용해야합니다.
    // #remove 함수가 만들어지지 않아 동작 확인이 안됩니다. 기능 추가 부탁드립니다!

    const shoppingList = cartData.map(item =>`
      <li class="items odd">
        <div class="infoWrap"> 
          <div class="cartSection">
            <img src="https://kinto.kr/data/item/21091/thumb-21091_1024x1024_600x600.jpg" alt="" class="itemImg" />
            <h3>${item.productName}</h3>
            <p> <input type="text" class="qty" placeholder="1"/>${item.quantity} x ${item.productPrice} 원</p>
          </div>  
        
          <div class="prodTotal cartSection">
            <p> 금액을 Number로 변경'원'</p>
          </div>
          <div class="cartSection removeWrap">
            <a href="#" class="remove">x</a>
          </div>
        </div>
      </li>
    `).join('');
    // cartWrap 아래에 shoppingList를 추가.
    document.querySelector('.cartWrap').insertAdjacentHTML('beforeend', shoppingList);
  } catch (error) {
		console.error(error);
	}
}

getSessionStorage()