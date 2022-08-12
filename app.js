//Listen for submit

const form = document.getElementById('calculator');

form.addEventListener('submit', function (e) {
  //Hide results
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.getElementById('loader').style.display = 'block';
  setTimeout(calculateResults, 1500);
  e.preventDefault();
});

//calculate Results
function calculateResults() {
  console.log('calculating. . .');

  //ui variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // hide loader and show results
    document.getElementById('results').style.display = 'flex';
    document.getElementById('loader').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  // hide loader and hide results
  document.getElementById('results').style.display = 'none';
  document.getElementById('loader').style.display = 'none';
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('h1');
  // add class
  errorDiv.className = 'alert';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error before heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
