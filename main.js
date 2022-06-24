//Lấy dữ liệu fetch API từ ngân hàng
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Để chọn các điều khiển khác nhau
//querySelector() trả về phần tử đầu tiên là phần tử con của phần tử mà nó được gọi ra khớp với nhóm bộ chọn được chỉ định.
var search = document.querySelector(".searchBox"); 
var convert = document.querySelector(".convert");
var fromCurrecy = document.querySelector(".from");
var toCurrecy = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var resultFrom;
var resultTo;
var searchValue;

// Sự kiện khi tiền tệ được thay đổi
fromCurrecy.addEventListener("change", (event) => {
  resultFrom = `${event.target.value}`; //event.target.value để lấy giá trị từ cgi đó
});
// Sử dụng addEventListener thì bạn có thể bổ sung rất nhiều hành động vào sự kiện tại nhiều thời điểm khác nhau.
// Sự kiện khi tiền tệ được thay đổi
toCurrecy.addEventListener("change", (event) => {
  resultTo = `${event.target.value}`;
});
//Nhập giá trị
search.addEventListener("input", updateValue);

// Hàm để cập nhật giá trị vào ô tìm kiếm
function updateValue(e) {
  searchValue = e.target.value;
}

// Khi người dùng nhấp vào, nó sẽ gọi hàm getresults
convert.addEventListener("click", getResults);

// Kết quả hàm
function getResults() { //Kết quả lấy từ API, sau đó thực hiện chuyển đổi
  fetch(`${api}`)
    .then((currency) => {
      return currency.json();
    })
    .then(displayResults); //Hiện thị kết quả
}

// Hiển thị kết quả sau khi chuyển đổi
function displayResults(currency) {
  let toRate = currency.rates[resultTo];
  let fromRate = currency.rates[resultFrom];
  finalValue.innerHTML = ((toRate / fromRate) * searchValue);
  finalAmount.style.display = "block";
}

