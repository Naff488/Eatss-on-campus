document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    const totalPriceElement = document.getElementById("total-price");
    const estimatedTimeElement = document.getElementById("estimated-time");
    const summaryItemsElement = document.getElementById("summary-items");
    const payButton = document.getElementById("pay-button");
    const paymentStatus = document.getElementById("payment-status");

    items.forEach(item => {
        item.querySelector(".quantity").addEventListener("input", updateOrderSummary);
    });

    payButton.addEventListener("click", processPayment);

    function updateOrderSummary() {
        let total = 0;
        let estimatedTime = 0;
        summaryItemsElement.innerHTML = ""; // Clear previous summary

        items.forEach(item => {
            const quantity = parseInt(item.querySelector(".quantity").value);
            const price = parseFloat(item.getAttribute("data-price"));
            const time = parseInt(item.getAttribute("data-time"));

            if (quantity > 0) {
                total += price * quantity;
                estimatedTime += time * quantity;

                const summaryItem = document.createElement("div");
                summaryItem.innerText = `${item.getAttribute("data-name")} x${quantity} - ₹${(price * quantity).toFixed(2)}`;
                summaryItemsElement.appendChild(summaryItem);
            }
        });

        totalPriceElement.innerText = total.toFixed(2);
        estimatedTimeElement.innerText = estimatedTime;

        payButton.disabled = total === 0; // Disable button if total is 0
    }

    function processPayment() {
        const total = parseFloat(totalPriceElement.innerText);
        if (total > 0) {
            // Simulate payment process (e.g., redirect to a payment gateway)
            paymentStatus.innerText = `Payment of $${total} processed successfully!`;
            // Reset order after payment
            resetOrder();
        } else {
            paymentStatus.innerText = "Please add items to your order.";
        }
    }

    function resetOrder() {
        items.forEach(item => {
            item.querySelector(".quantity").value = 0;
        });
        updateOrderSummary();
        paymentStatus.innerText = ""; // Clear payment status
    }
});document.getElementById("pay-button").addEventListener("click", function() {
    // Show payment modal
    document.getElementById("payment-modal").style.display = "block";
});

// Close the modal when the close button is clicked
document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("payment-modal").style.display = "none";
});

// Handle payment confirmation
document.getElementById("confirm-payment").addEventListener("click", function() {
    // You can add payment validation here before confirming
    const upiId = document.getElementById("upi-id").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    if (upiId || (cardNumber && expiryDate && cvv)) {
        document.getElementById("payment-status").innerText = "Payment Successful!";
        document.getElementById("payment-modal").style.display = "none";
    } else {
        document.getElementById("payment-status").innerText = "Please provide payment details!";
    }
});

// Close the modal if clicked outside
window.onclick = function(event) {
    if (event.target === document.getElementById("payment-modal")) {
        document.getElementById("payment-modal").style.display = "none";
    }
};

