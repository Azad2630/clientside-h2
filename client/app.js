  let currentOrderNumber = 1;
  let dailyOrders = [];
  let totalPrice = 0;
  
  
  function addItem(item, price) {
    const orderList = document.getElementById('orderList');
    const listItem = document.createElement('li');
    listItem.textContent = item + ' ($' + price + ')';
    listItem.onclick = function() {
      removeItem(listItem, price);
    };
    orderList.appendChild(listItem);
    totalPrice += price;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
  }
  
  function removeItem(item, price) {
    const orderList = document.getElementById('orderList');
    orderList.removeChild(item);
    totalPrice -= price;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
  }
  
  function cancelOrder() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    totalPrice = 0;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
  }
  
  function confirmOrder() {
    if (totalPrice === 0) {
      alert("Order is empty. Please add items to confirm order.");
      return;
    }
    const orderItems = getOrderItems();
    if(orderItems.length === 0) {
      alert("Order is empty. Please add items to confirm order.");
      return;
    }
    alert("Items in the order:\n" + orderItems.join(', ')+ "\nTo finish order click 'OK'");
    dailyOrders.push({
      orderNumber: currentOrderNumber,
      items: orderItems,
      totalPrice: totalPrice
    });
    updateTotalOrders();
    currentOrderNumber++;
    document.getElementById('orderNumber').textContent = currentOrderNumber;
    cancelOrder();
  }
  
  function getOrderItems() {
    const items = [];
    const orderList = document.getElementById('orderList');
    orderList.querySelectorAll('li').forEach(item => {
      items.push(item.textContent);
    });
    return items;
  }
  
  function updateTotalOrders() {
    const totalOrdersContainer = document.getElementById('totalOrders');
    totalOrdersContainer.textContent = dailyOrders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2);
    const individualOrdersContainer = document.getElementById('individualOrders');
    individualOrdersContainer.innerHTML = '';
    dailyOrders.forEach(order => {
      const orderButton = document.createElement('button');
      orderButton.textContent = 'Order ' + order.orderNumber + ' - $' + order.totalPrice.toFixed(2);
      orderButton.addEventListener('click', function() {
        alert("Items:\n" + order.items.join(', '));
      });
      individualOrdersContainer.appendChild(orderButton);
      individualOrdersContainer.appendChild(document.createElement('br'));
    });
  }