// import {
//   // 회원가입 등 네비바 랜더링
//   drawNavbar,
//   // 푸터 랜더링
//   drawFooter,
// } from '../../index.js';
// drawNavbar();
// drawFooter();
console.log('페이지 이동')

// SessionStorage에 저장된 'cartItem'을 가져오는 함수 생성
async function getSessionStorage() {
  try {
    let cartData = sessionStorage.getItem('cartItems');
    if (cartData ) {
      cartData = JSON.parse(cartData);
    } else {
      cartData = [] ;
    }

    // 현재 sessionStorage에 담겨 있는 정보 예시
    // [{productName: "킨토 캐스트 에스프레소컵 90ml", productPrice: "7,400원 (부가세포함)", quantity: "3"},
    // {productName: "킨토 캐스트 에스프레소컵 90ml", productPrice: "7,400원 (부가세포함)", quantity: "3"},
    // {productName: "킨토 캐스트 에스프레소컵 90ml", productPrice: "7,400원 (부가세포함)", quantity: "3"}]
    const shoppingList = cartData.map(item => `
      <li class="items odd">
        <div class="infoWrap"> 
          <div class="cartSection">
            <img src="https://kinto.kr/data/item/21091/thumb-21091_1024x1024_600x600.jpg" alt="" class="itemImg" />
            <h3>${item.productName}</h3>
            <p> <input type="text" class="qty" placeholder="1"/>${item.quantity} x ${item.productPrice} 원</p>
          </div>  
        
          <div class="prodTotal cartSection">
            <p> ${item.productPrice}'원'</p>
          </div>
          <div class="cartSection removeWrap">
            <a href="#" class="remove">x</a>
          </div>
        </div>
      </li>
    `).join('');
    document.querySelector('.cartWrap').insertAdjacentHTML('afterbegin', shoppingList);
  } catch (error) {
		console.error(error);
	}
}

await getSessionStorage()

// removeAllBtn 클릭 시, 모든 sessionStorage의 데이터를 지우고
// sessionStorage를 다시 불러옴.
const removeAllBtn = document.querySelector('.removeAll');
// removeButtons 클릭 시, 모든 remove의 배열에 각 removeItemOnClick을 실행시키며,
// 해당 버튼의 가장 가까운(부모요소) item class를 찾아서 splice해 준 뒤 
// sessionStorage에 다시 저장 후 화면에서 items를 remove
const removeButtons = document.querySelectorAll('.remove');

removeAllBtn.addEventListener('click', removeAllItem);

function removeAllItem() {
  sessionStorage.removeItem('cartItem');
  getSessionStorage()
}

removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    removeItem(button);
  });
});

function removeItem(button) {
  const itemIndex = button.closest('.items').dataset.index;
  const cartData = JSON.parse(sessionStorage.getItem('cartItem'));
  cartData.splice(itemIndex, 1);
  sessionStorage.setItem('cartItem', JSON.stringify(cartData));
  button.closest('.items').remove();
}