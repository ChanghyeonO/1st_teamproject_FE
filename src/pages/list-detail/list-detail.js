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

const leftContentsBoxData = document.querySelector('.left-content')

const contentMiddleData = document.querySelector('.content-middle-data')

const productName = document.querySelector('.product-name');
const productPrice = document.querySelector('.product-price');
const specificationsText = document.querySelector('.specifications-text');
const handlingPrecautionsText = document.querySelector('.handling-precautions-text');

const modalBox = document.querySelector('.modal-box');
const closeButton = document.querySelector('.close-modal');
const explanationModal = document.querySelector('.explanation-modal');

const minusButton = document.querySelector('.minus-button');
const plusButton = document.querySelector('.plus-button');
const innerNumber = document.querySelector('.inner-number');

const cartAddButton = document.querySelector('.cart-add-button');

const specificationsContainer = document.querySelector('.specifications-container');
const handlingPrecautionsContainer = document.querySelector('.handling-precautions-container');

const specificationsContents = document.querySelector(".specifications-contents");
const handlingPrecautionsContents = document.querySelector(".handling-precautions-contents");

async function fetchData() {
    try {
        //현재 URL에서 쿼리 문자열을 추출해서 URLSearchParmas 객체 생성
        const params = new URLSearchParams(window.location.search);
        //객체에서 값만 추출해서 변수 data에 저장
        let data = "";
        for (const value of params.values()) {
            data = value;
        }
        console.log(data)

        //fetch() 메서드에서 http://34.64.252.224/product/detail? 문자열과 URLSearchParmas 객체를 조합해서 요청 URL 생성 및 서버에 요청
        const response = await fetch(`${URI}/api/product/detail?` + new URLSearchParams({ id: data }));

        const jsonData = await response.json();

        const jsonDataId = jsonData.data._id;
        const jsonDataPrice = jsonData.data.price;
        const jsonDataName = jsonData.data.name;
        const jsonDataSpecifications = jsonData.data.specifications;
        const jsonDataHandlingPrecautions = jsonData.data.handlingPrecautions;


        // left - content - box의 inner - data
        leftContentsBoxData.innerHTML = `
            <div class="top-image-box">
              <img src="https://kinto.kr/data/item/8433/thumb-pinfo_cast_w_pd_009_800x600.jpg" />
            </div>
            <div class="bottom-image-box">
              <img src="https://kinto.kr/data/item/8433/thumb-pinfo_cast_w_pd_003_800x600.jpg" />
            </div>        
          `

        contentMiddleData.innerHTML = `
            <img src="https://kinto.kr/data/item/8433/thumb-pinfo_cast_w_pd_009_800x600.jpg"/>
            <h5>제품 이미지</h5>
            <p>상기 이미지는 모니터마다 보여지는 색이 다를 수 있습니다.<br> 해당 이미지는 참고용으로만 사용하시기 바랍니다.</p>
            <img src="https://kinto.kr/data/item/8433/thumb-pinfo_cast_w_pd_003_800x600.jpg"/>
            <h5>제품 이미지</h5>
            <p>상기 이미지는 모니터마다 보여지는 색이 다를 수 있습니다.<br> 해당 이미지는 참고용으로만 사용하시기 바랍니다.</p>
            `

        //right-content-box의 inner-data
        productName.innerHTML = jsonDataName;
        productPrice.innerHTML = `${jsonDataPrice}원 (부가세별도)`;
        specificationsText.innerHTML = jsonDataSpecifications;
        handlingPrecautionsText.innerHTML = jsonDataHandlingPrecautions;


        //left-content-box의 image박스를 클릭했을 때 해당 이미지가 있는 scrollY 좌표로 이동하도록 구현
        document.querySelector('.top-image-box').addEventListener('click', function () {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });

        document.querySelector('.bottom-image-box').addEventListener('click', function () {
            window.scroll({
                top: 800,
                left: 0,
                behavior: 'smooth'
            });
        });

        if (innerNumber.value > jsonData.count) {

        }

        return {
            jsonDataId,
            jsonDataPrice,
            jsonDataName,
            jsonDataSpecifications,
            jsonDataHandlingPrecautions
        }
    } catch (error) {
        console.log(error);
    }
}

const result = await fetchData();

console.log(result.jsonDataId)

let count = 1;

minusButton.addEventListener('click', function () {
    if (count > 1) {
        count--;
    }
    innerNumber.value = count;
})
plusButton.addEventListener('click', function () {
    count++;
    innerNumber.value = count;
})

innerNumber.addEventListener('input', function () {
    const value = innerNumber.value;
    if (isNaN(value)) {
        alert('숫자가 아닙니다!');
        innerNumber.value = 1;
    } else {
        count = parseInt(value);
    }
});

// 장바구니 배열 생성
const cartItems = [];
cartAddButton.addEventListener('click', function () {
    // 여기에 제품 아이디 추가 하셔야합니다!
    const cartItem = {
        productID: result.jsonDataId,
        productName: result.jsonDataName,
        productPrice: result.jsonDataPrice,
        quantity: innerNumber.value
    };

    addToCart(cartItem);
    modalBox.style.display = 'block';
    explanationModal.innerHTML = `
    ${result.jsonDataName} 제품
    ${innerNumber.value}개가 장바구니에 추가되었습니다.
    `
});

function addToCart(item) {
    // 장바구니 목록을 불러옴
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');

    // 이미 장바구니에 존재하는 제품인지 찾는다.
    const existingItemIndex = cartItems.findIndex(i => i.productID === item.productID);

    if (existingItemIndex > -1) {
        // 이미 존재하는 제품일 경우, 수량을 더함.
        cartItems[existingItemIndex].quantity = Number(cartItems[existingItemIndex].quantity) + Number(item.quantity);
    } else {
        // 새로운 제품일 경우, 장바구니에 추가.
        cartItems.push(item);
    }

    // 장바구니 목록을 localStorage에 저장
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}


closeButton.addEventListener('click', function () {
    modalBox.style.display = 'none';
})


specificationsContainer.addEventListener('click', function () {
    specificationsContents.style.display = specificationsContents.style.display === "none" ? "block" : "none";

});

handlingPrecautionsContainer.addEventListener('click', function () {
    if (handlingPrecautionsContents.style.display === "none") {
        handlingPrecautionsContents.style.display = "block";
        handlingPrecautionsContainer.style.borderBottom = 'none';

    } else {
        handlingPrecautionsContents.style.display = "none";
        handlingPrecautionsContainer.style.borderBottom = '2px solid #ccc';

    }
});


