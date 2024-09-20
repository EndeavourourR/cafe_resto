const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.addEventListener('DOMContentLoaded', () => {
            const orderTableBody = document.querySelector('#orderTable tbody');
            const totalPriceElement = document.getElementById('totalPrice');
            const paymentModal = document.getElementById('paymentModal');
            const paymentDetails = document.getElementById('paymentDetails');
            const modalTotalPrice = document.getElementById('modalTotalPrice');
            const paymentModalRes = document.getElementById('paymentModalRes');
            const modalTotalPriceRes = document.getElementById('modalTotalPriceRes');

            // Order Functions
            document.getElementById('addItem').addEventListener('click', addItemToOrder);
            document.getElementById('submitOrder').addEventListener('click', submitOrder);
            document.querySelector('.close').addEventListener('click', () => {
                paymentModal.style.display = 'none';
            });

            document.getElementById('payNow').addEventListener('click', () => {
                alert("Payment processed successfully!");
                paymentModal.style.display = 'none'; // Close the modal after payment
            });

            function addItemToOrder() {
                const itemSelect = document.getElementById('items');
                const selectedItem = itemSelect.options[itemSelect.selectedIndex];
                const itemName = selectedItem.text;
                const itemPrice = parseFloat(selectedItem.dataset.price);
                const quantity = parseInt(document.getElementById('quantity').value);

                if (quantity <= 0 || itemSelect.value === "") return;

                const itemTotal = (itemPrice * quantity).toFixed(2);
                const row = document.createElement('tr');
                row.innerHTML = `<td>${itemName}</td><td>${quantity}</td><td>$${itemTotal}</td>`;
                orderTableBody.appendChild(row);
                updateTotalPrice(itemTotal);
            }

            function updateTotalPrice(itemTotal) {
                const currentTotal = parseFloat(totalPriceElement.innerText.replace('$', '')) || 0;
                const newTotal = (currentTotal + parseFloat(itemTotal)).toFixed(2);
                totalPriceElement.innerText = `$${newTotal}`;
            }

            function submitOrder() {
                const name = document.getElementById('name').value;
                const tableNumber = document.getElementById('tableNumber').value;
                const total = totalPriceElement.innerText;

                if (parseFloat(total.replace('$', '')) <= 0) {
                    alert("Please add items to your order before submitting.");
                    return;
                }

                paymentDetails.innerHTML = `Name: ${name}<br>Table Number: ${tableNumber}<br>Total Amount: ${total}`;
                modalTotalPrice.innerText = total; // Set total amount in modal
                generateQRCode(`Order: ${name}, Total: ${total}`); // Generate QR code
                paymentModal.style.display = 'block';
            }

            // Reservation Functions
            document.getElementById('submitReservation').addEventListener('click', submitReservation);

            function submitReservation() {
                const name = document.getElementById('nameRes').value;
                const mobileNumber = document.getElementById('mobileNumber').value;
                const date = document.getElementById('date').value;
                const startTime = document.getElementById('startTime').value;
                const endTime = document.getElementById('endTime').value;

                const startDateTime = new Date(`${date}T${startTime}`);
                const endDateTime = new Date(`${date}T${endTime}`);
                const durationHours = (endDateTime - startDateTime) / 3600000; // Convert milliseconds to hours
                const reservationCharges = Math.max(durationHours, 0) * 3; // $3 per hour
                const totalAmount = reservationCharges.toFixed(2);

                const details = `
                    Name: ${name}<br>
                    Mobile: ${mobileNumber}<br>
                    Date: ${date}<br>
                    Start Time: ${startTime}<br>
                    End Time: ${endTime}<br>
                    Reservation Charges: $${totalAmount}
                `;

                document.getElementById('reservationDetails').innerHTML = details;
                modalTotalPriceRes.innerText = `$${totalAmount}`; // Set total amount in modal
                generateQRCode(`Reservation: ${name}, Total: $${totalAmount}`); // Generate QR code for reservation
                paymentModalRes.style.display = 'block';
            }

            document.getElementById('payNowRes').addEventListener('click', () => {
                alert("Payment processed successfully!");
                paymentModalRes.style.display = 'none'; // Close the modal after payment
            });

            document.querySelector('.closeRes').addEventListener('click', () => {
                paymentModalRes.style.display = 'none';
            });

            function generateQRCode(data) {
                $('#qrcode').empty(); // Clear previous QR code
                $('#qrcode').qrcode(data);
                $('#qrcodeRes').empty(); // Clear previous QR code for reservation
                $('#qrcodeRes').qrcode(data);
            }
        });
        const scrollUpButton = document.getElementById('scrollUp');

        window.onscroll = function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollUpButton.style.display = "block";
            } else {
                scrollUpButton.style.display = "none";
            }
        };

        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });