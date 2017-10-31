document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
})


document.getElementById('openModal').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
})

const idGenerator = (() => {
  let i = -1;
  return () => {
    i++;
    return i;  
  }
})()

const newEntriesRow = (product, container, amount, id) => {
  return `
      <tr class=${id}>
        <td>${product}</td>
        <td>${container}</td>
        <td>${amount}</td>
        <td><i class="fa fa-times delete" aria-hidden="true"></i></td>
      </tr>
  `
}


const createNewFormEntry = (productId, containerId, amount, id) => {
  return `
    <div class='${id} invisibleEntry'>
      <input name='details[${id}][product]' value='${productId}' />
      <input name='details[${id}][container]' value='${containerId}' />
      <input name='details[${id}][amount]' value='${amount}' /> 
    </div>
  `
}

const addNewEntryToForm = (productId, containerId, amount, id) => {
  document.getElementById('orderDetails').innerHTML+=createNewFormEntry(productId, containerId, amount, id);
}

const addToEntriesTable = (product, container, amount, id) => {
  const tbody = document.getElementById(entries);
  console.log(entries)
  if(entries.getElementsByClassName('firstRow').length > 0) {
    entries.innerHTML = newEntriesRow(product, container, amount, id);
  } else {
    entries.innerHTML += newEntriesRow(product, container, amount, id);
  }
}

document.getElementById('addEntryButton').addEventListener('click', () => {

  const productSelect = document.getElementById('productSelect');
  const productName = productSelect.options[productSelect.selectedIndex].innerText;
  const productId = productSelect.value;

  const containerSelect = document.getElementById('containerSelect');
  const containerName = containerSelect.options[containerSelect.selectedIndex].innerHTML;
  const containerId = containerSelect.value;

  const amount = document.getElementById('amount').value;

  document.getElementById('modal').style.display = 'none';

  const id = idGenerator();
  addToEntriesTable(productName, containerName, amount, id);
  addNewEntryToForm(productId, containerId, amount, id);
  document.getElementById('submitBtn').removeAttribute('disabled');
})


document.getElementById('entries').addEventListener('click',(target) => {
  if(event.target.classList.contains('delete')){
    const id = event.target.parentNode.parentNode.classList[0];
    Array.from(document.getElementsByClassName(id)).forEach((element) => {
      element.remove();
    })
    if(document.getElementById('entries').getElementsByTagName('TR').length == 0) {
      document.getElementById('submitBtn').setAttribute('disabled', 'true');
    }
  }
})


