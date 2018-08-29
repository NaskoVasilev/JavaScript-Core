function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let productInput = $('.custom-select');
    let priceInput = $('#price');
    let quantityInput = $('#quantity');
    let submitBtn = $('#submit');

    productInput.on('input', function () {
        let productName = productInput.val();
        if (productName !== '') {
            submitBtn.removeAttr('disabled')
        } else {
            submitBtn.attr('disabled', true)
        }
    })
    let totalQuantity = 0;
    let totalPrice = 0;

    submitBtn.on('click', function () {
        let product = productInput.val();
        let quantity = Number(quantityInput.val())
        totalQuantity += quantity;
        if (totalQuantity <= 150) {
            let price = Number(priceInput.val())
            totalPrice += price;
            let result = $(`<li>Product: ${product} Price: ${price} Quantity: ${quantity}</li>`)
            $('.display').append(result)

            $('#sum').val(totalPrice)
            $('#capacity').val(totalQuantity)
        } else {
            totalQuantity -= quantity;
        }
        productInput.val('');
        quantityInput.val('1')
        priceInput.val('1')
        submitBtn.attr('disabled', true)

        if (totalQuantity >= 150) {
            $('#capacity').val('full')
                .addClass('fullCapacity')

            productInput.attr('disabled', true)
            priceInput.attr('disabled', true)
            quantityInput.attr('disabled', true)
            submitBtn.attr('disabled', true)
        }
    })

}
