const productSelect = document.getElementById('page-product');
const requestedProduct = new URLSearchParams(window.location.search).get('product');

const backToTop = document.querySelector('.back-to-top');

if (backToTop && document.querySelector('.catalog-category')) {
  backToTop.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo(0, 0);
  });
}

if (productSelect && requestedProduct) {
  for (const option of productSelect.options) {
    if (option.value === requestedProduct) {
      productSelect.value = requestedProduct;
      break;
    }
  }
}

const requestDialog = document.getElementById('request-dialog');

if (requestDialog) {
  document.getElementById('open-request-dialog').addEventListener('click', function () {
    document.getElementById('request-result').hidden = true;
    requestDialog.showModal();
  });

  document.getElementById('close-request-dialog').addEventListener('click', function () {
    requestDialog.close();
  });
}

const form = document.querySelector('[data-order-form]');

if (form) {
  const result = document.getElementById(form.dataset.result);

  form.addEventListener('input', function (event) {
    result.hidden = true;
    if (event.target.willValidate && event.target.checkValidity()) {
      event.target.removeAttribute('aria-invalid');
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    result.hidden = true;
    for (const field of form.elements) {
      field.removeAttribute('aria-invalid');
      if (field.willValidate && !field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
      }
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.reset();
    if (requestDialog) requestDialog.close();
    result.hidden = false;
    result.focus();
    result.scrollIntoView({ block: 'center' });
  });
}
