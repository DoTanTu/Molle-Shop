
var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
    cartItems = JSON.parse(cartItems);
    } else {
    cartItems = [];
    }
updateTotalHeader();
function updateTotalHeader(){
  var count = cartItems.length;
  $('.total-cart-header').text(count);
}
$('.add-to-cart').on('click', function (event) {
    event.preventDefault();
    var idProd = $('.add-to-cart').attr('data-id');
    var nameProd = $('.add-to-cart').attr('data-name');
    var imageProd = $('.product-slider__image').attr('src');
    var priceProd = parseFloat($('.add-to-cart').attr('data-price'));
    var priceSaleProd = parseFloat($('.add-to-cart').attr('data-priceSale'));
    var sizeProd = $('.size-choose.active .size__text').text();
    var colorProd = $('.color-choose.active .size__text').text();
    var quantityProd =  parseFloat($(".count__input").val());
    var existingItemIndex = cartItems.findIndex(function (item) {
        return item.id === idProd;
    });
      if (existingItemIndex !== -1) {
        var existingQuantity = parseInt(cartItems[existingItemIndex].quantity);
    
        var updatedQuantity = existingQuantity + quantityProd;
        cartItems[existingItemIndex].quantity = updatedQuantity;

        var updatedSize =  sizeProd;
        cartItems[existingItemIndex].size = updatedSize;

        var updatedColor =  colorProd;
        cartItems[existingItemIndex].color = updatedColor;
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Đã có trong giỏ hàng',
          showConfirmButton: false,
          timer: 2500
        })
      } else {
        var newItem = createNewItem(idProd, nameProd, imageProd, priceProd, priceSaleProd,sizeProd, colorProd, quantityProd);
        cartItems.push(newItem);
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Đã thêm vào giỏ hàng',
          showConfirmButton: false,
          timer: 2500
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateTotalHeader();
});
function createNewItem(id, name, image, price, priceSale, size, color, quantity) {
    return {
      id: id,
      name: name,
      image:image,
      price: price,
      priceSale: priceSale,
      size: size,
      color: color,
      quantity: quantity
    };
  }