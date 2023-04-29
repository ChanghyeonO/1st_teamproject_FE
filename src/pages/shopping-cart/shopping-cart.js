import {
  drawNavbar,
  drawFooter,
  activeNavbar,
  addCommas,
} from '../../utils/index.js';
drawNavbar();
drawFooter();
activeNavbar();

// sessionStorage에서 정보 가져오기
const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));

async function getSessionStorage() {
  try {
    let cartData = sessionStorage.getItem('cartItems');
    if (cartData) {
      cartData = JSON.parse(cartData);
      if (!Array.isArray(cartData)) {
        // cartData를 array타입으로 변경
        cartData = [cartData];
      }
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

    const shoppingList = cartData
      .map((item) => {
        const productTotal =
          parseInt(item.quantity) * parseInt(item.productPrice);
        const productImageID = "${item.productID}.jpeg";
        return `
          <li class="items odd">
            <div class="infoWrap"> 
              <div class="cartSection">
                <img src="../../assets/product-imgs/${item.productID}.jpeg" alt="" class="itemImg" />
                <h3 class= productName>${item.productName}</h3>
                <ul class="count-container">
                  <li class="count-button">
                    <div class="minus-button"><i class="fi fi-br-minus"></i></div>
                    <input type="text" class="inner-number" value=${item.quantity}></input>
                    <div class="plus-button"><i class="fi fi-rr-plus"></i></div>
                  </li>
                </ul>
                <p class="item-quantity">${item.quantity}</p>
                <p> x </p>
                <p class="item-price">${item.productPrice}</p>
              </div>  
            
              <div class="prodTotal cartSection">
                ${addCommas(productTotal)} 원
              </div>
              <div class="cartSection removeWrap">
                <a href="#" class="remove">x</a>
              </div>
            </div>
          </li>
          `;
      })
      .join('');
    // cartWrap 아래에 shoppingList를 추가.
    document
      .querySelector('.cartWrap')
      .insertAdjacentHTML('beforeend', shoppingList);
    updateTotalRow();
    return cartData;
  } catch (error) {
    console.error(error);
  }
}
getSessionStorage();



// 제품 qty 더하기 빼기 이벤트
const minusButtons = document.querySelectorAll('.minus-button');
const plusButtons = document.querySelectorAll('.plus-button');
const innerNumbers = document.querySelectorAll('.inner-number');

// 마이너스 버튼 클릭 이벤트
minusButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    const innerNumber = event.target.parentElement.parentElement.querySelector('input.inner-number');
    const count = parseInt(innerNumber.value);
    if (count > 1) {
      innerNumber.value = count - 1;
      // 현재 상품의 수량 정보를 sessionStorage에서 찾아서 변경
      const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
      cartItems.forEach((item) => {
        if (
          item.productName === event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.productName').textContent
        ) {
          item.quantity = innerNumber.value;
          event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.item-quantity').textContent = innerNumber.value;   // closest?
          event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.prodTotal').textContent 
            = addCommas( innerNumber.value * event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.item-price').textContent + "원" );
        }
      });
      // 변경된 정보를 sessionStorage에 다시 저장
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      updateTotalRow();
    }
  });
});

// 플러스 버튼 클릭 이벤트
plusButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    const innerNumber = event.target.parentElement.parentElement.querySelector('input.inner-number');
    const count = parseInt(innerNumber.value);
    innerNumber.value = count + 1;
    // 현재 상품의 수량 정보를 sessionStorage에서 찾아서 변경
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    cartItems.forEach((item) => {
      if (
        item.productName === event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.productName').textContent
      ) {
        item.quantity = innerNumber.value;
        event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.item-quantity').textContent = innerNumber.value;
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.prodTotal').textContent 
          = addCommas( innerNumber.value * event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.item-price').textContent + "원" );
      }
    });
    // 변경된 정보를 sessionStorage에 다시 저장
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateTotalRow();
  });
});

// 수량 버튼 클릭 이벤트
innerNumbers.forEach(function (button) {
  button.addEventListener('input', function (event) {
    // console.log(event.target.parentElement.parentElement.querySelector('input.inner-number').value);
    const innerNumber = event.target.parentElement.parentElement.querySelector('input.inner-number');
    const inputQty = innerNumber.value;
    const tempQty = inputQty;

    if (inputQty !== '' && isNaN(inputQty)) {
      alert('올바른 숫자를 입력해주세요');
      inputQty = tempQty;
    }
    if (inputQty !== '' && inputQty <= 0) {
      alert('1보다 큰 숫자를 입력해주세요');
      inputQty = tempQty;
    }

    // 현재 상품의 수량 정보를 sessionStorage에서 찾아서 변경
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    cartItems.forEach((item) => {
      if (
        item.productName === event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.productName').textContent
      ) {
        item.quantity = inputQty;
        event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.item-quantity').textContent = inputQty;
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.prodTotal').textContent 
          = addCommas( inputQty * event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.item-price').textContent + "원" );
      }
    });
    // 변경된 정보를 sessionStorage에 다시 저장
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateTotalRow();
  });
  // 입력 후 엔터를 누르면 입력창 종료
  button.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) { 
      event.target.blur(); 
    }
  });
});

// 선택상품 금액, 주문금액 갱신해주는 함수
function updateTotalRow() {
  // sessionStorage에서 cartItem들을 가져옴, default는 []
  const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  let totalPrice = 0;
  // cartItems를 순회하며 각 아이템의 가격과 수량을 곱한 값을 totalPrice에 더함
  cartItems.forEach((item) => {
    totalPrice += item.productPrice * item.quantity;
  });

  document.querySelector('.selected-all-value').innerHTML = addCommas(totalPrice + ' 원');
  if (totalPrice === 0) {
    document.querySelector('.total-value').innerHTML = '0 원'
  } else {
    document.querySelector('.total-value').innerHTML = addCommas(totalPrice + 4000 + ' 원');
  }
}
window.addEventListener('storage', updateTotalRow);




// 주문하기 버튼
const orderButton = document.querySelector('.order');
console.log(orderButton);

orderButton.addEventListener('click', (event) => {
  event.preventDefault();
  const orderData = {
    orders: cartItems.map((item) => ({
      name: item.productName,
      count: item.quantity,
    })),
  };

  fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (response.ok) {
        alert('주문 성공!');
        window.location.href = '../main-page/home-page.html';
        return fetch('/api/order/orders');
      } else {
        throw new Error('주문 실패');
      }
    })
    .catch((error) => {
      alert('주문 실패, 재고를 확인해주세요');
      console.error(error);
    });
});




// 장바구니에서 아이템 삭제
document.querySelectorAll('a.remove').forEach(function (removeLink) {
  removeLink.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log(removeLink.parentNode.parentNode.querySelector('.productName').textContent)

    // 지우는 상품의 제품명
    const productNameToDelete = removeLink.parentNode.parentNode.querySelector('.productName').textContent;
    // 해당 삭제 버튼의 부모부모부모 노드(li<div<div<a>>>)가 범위
    removeLink.parentNode.parentNode.parentNode.remove();

    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    const updatedCartItems = cartItems.filter(item => ( item.productName !== productNameToDelete ));
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateTotalRow();
  });
});

// removeAllBtn 클릭 시, 모든 sessionStorage의 데이터를 지우고
// sessionStorage를 다시 불러옴
const removeAllBtn = document.querySelector('.removeall');
removeAllBtn.addEventListener('click', removeAllItem);

function removeAllItem() {
  sessionStorage.removeItem('cartItems');
  getSessionStorage();
}