document.addEventListener("DOMContentLoaded", function() {
    Papa.parse("apple.csv", {
        download: true,
        header: true,
        complete: function(results) {
            updatePrices(results.data);
        }
    });

    function updatePrices(data) {
        data.forEach((product, index) => {
            let amazonPrice = formatPrice(product.amazon);
            let flipkartPrice = formatPrice(product.flipkart);
            let reliancePrice = formatPrice(product.reliance);
            let chromaPrice = formatPrice(product.chroma);

            let prices = [amazonPrice, flipkartPrice, reliancePrice, chromaPrice];
            let minPrice = Math.min(...prices.filter(price => !isNaN(price)));

            updatePrice(`price-amazon-${index + 1}`, amazonPrice, minPrice);
            updatePrice(`price-flipkart-${index + 1}`, flipkartPrice, minPrice);
            updatePrice(`price-reliance-${index + 1}`, reliancePrice, minPrice);
            updatePrice(`price-croma-${index + 1}`, chromaPrice, minPrice);
        });
    }

    function formatPrice(price) {
        return price === "SOLD OUT" || price === "" ? NaN : parseFloat(price.replace(/,/g, ''));
    }

    function updatePrice(elementId, price, minPrice) {
        let element = document.getElementById(elementId);
        if (element) {
            if (!isNaN(price)) {
                element.textContent = `₹${price.toLocaleString()}`;
                element.style.color = (price === minPrice) ? "#e74c3c" : "inherit"; // Highlight only the minimum price
            } else {
                element.textContent = "SOLD OUT";
                element.style.color = "inherit"; 
            }
        }
    }
});