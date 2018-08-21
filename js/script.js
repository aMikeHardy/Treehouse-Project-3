// ----------SELECT ELEMENTS
const form = document.querySelector('form');   // form element
// BASIC INFO ELEMENTS
const nameField = document.getElementById('name');
const email = document.getElementById('mail');
const selectTitle = document.getElementById('title');
const otherOption = selectTitle.lastElementChild;
const jobRoleInput = document.getElementById('other-title');

// T-SHIRT ELEMENTS
const selectDesign = document.getElementById('design');
const JSpuns = selectDesign.firstElementChild.nextElementSibling;
const heartJS = selectDesign.lastElementChild;
const selectColor = document.getElementById('color');
const colorLabel = document.querySelector('label[for=color]');

// ACTIVITY ELEMENTS
const activities = document.querySelector('.activities');
// Activity Checkboxes
const mainConference = document.querySelector('input[name=all]');
const jsFrameworks = document.querySelector('input[name=js-frameworks]');
const jsLibraries = document.querySelector('input[name=js-libs]');
const expressCheck = document.querySelector('input[name=express]');
const nodeJS = document.querySelector('input[name=node]');
const buildTools = document.querySelector('input[name=build-tools]');
const npm = document.querySelector('input[name=npm]');
// Activity Total Elements
let runningTotal = 0;
const totalLabel = document.createElement('h3');
totalLabel.textContent = 'Total: $' + runningTotal;
activities.appendChild(totalLabel);

// PAYMENT INFO ELEMENTS
const paymentFieldset = document.getElementById('paymentFieldset');
const selectPayment = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
// credit card input elements
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const ccNum = document.getElementById('cc-num');
// register button
const btnRegister = document.querySelector('button');

// ----------FUNCTIONS
function initializeForm(){
  // Set focus to name field and hide 'Your Job Role' field and 'Color' fields
  nameField.focus();
  jobRoleInput.style.display = 'none';
  selectColor.style.display = 'none';
  colorLabel.style.display = 'none';

  // set up Payment options upon load
  selectPayment[1].selected = true;   // CREDIT CARD OPTION SELECTED BY DEFAULT
  payPalDiv.style.display = 'none';
  bitcoinDiv.style.display = 'none';
  selectPayment[0].disabled = true;
}

// Function to calculate the cost of selected activities
function updateTotal(amount){
  runningTotal += amount;
  totalLabel.textContent = 'Total: $' + runningTotal;
}

// Function to handle validation messaging for length errors and blank fields
function throwError(e, element, errorMsg){
	e.preventDefault();
     	element.className = 'error';
      element.value = '';
      element.placeholder = errorMsg;
}

// Function to check for blank fields
function checkBlankFields(e){
  if(nameField.value === ""){
    throwError(e, nameField, "Please enter your name...");
  }else{
    nameField.className = '';
  }
  if(email.value === ""){
    throwError(e, email, "Please enter a valid email address...");
  }
  // check to see if an activity was selected
  if(runningTotal <= 0){
    e.preventDefault();
    activities.style.color = 'red';
    totalLabel.textContent = ' - Please register for at least one activity above.';
  }
  // if credit card option is selected, check zip, cvv, and credit card number
  if (selectPayment[1].selected === true){
    if (zip.value === ""){
      throwError(e, zip, "Enter 5 digits..");
    }
    if (cvv.value === ""){
      throwError(e, cvv, "Enter 3 digits..");
    }
    if (ccNum.value === ""){
      throwError(e, ccNum, "Please enter 13-16 digits...");
    }
  }
}

// Initialize Form
initializeForm();

// ----------EVENT LISTENERS FOR FUNCTIONALITY

// BASIC INFO SECTION
// if 'Other' is selected for Job Role, show text field appears
selectTitle.addEventListener('change', (e)=>{
  if(otherOption.selected){
    jobRoleInput.style.display = 'block';
  }else{
    jobRoleInput.style.display = 'none';
  }
});

// T-SHIRT INFO SECTION
// Display matching color options when T-shirt theme is selected
selectDesign.addEventListener('change', (e)=>{
  if(JSpuns.selected){
    selectColor.style.display = 'block';
    colorLabel.style.display = 'block';
    selectColor[0].selected = true;
    for (let i = 0; i < selectColor.length; i += 1){
      if(i > 2){
        selectColor[i].style.display = 'none';
      }else
        selectColor[i].style.display = 'block';
    }
  }else if (heartJS.selected){
    selectColor.style.display = 'block';
    colorLabel.style.display = 'block';
    selectColor[3].selected = true;
    for (let i = 0; i < selectColor.length; i += 1){
      if(i < 3){
        selectColor[i].style.display = 'none';
      }else {
        selectColor[i].style.display = 'block';
      }
    }
  }else{
    selectColor.style.display = 'none';
    colorLabel.style.display = 'none';
  }
});

// REGISTER FOR ACTIVITIES SECTION
// Handles checkbox functionality and calls runningTotal()
activities.addEventListener('change', (e)=> {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const checkboxName = checkbox.name;
    const activityLabel = checkbox.parentNode;
    activities.style.color = 'initial';
    // if checked, disable conflicting activities and increase running total
    if(checked){
      activityLabel.style.fontWeight = 'bold';
          if (checkboxName === 'js-frameworks'){
            expressCheck.disabled = true;
            updateTotal(100);
          }else if( checkboxName === 'express'){
            jsFrameworks.disabled = true;
            updateTotal(100);
          }else if (checkboxName === 'js-libs'){
            nodeJS.disabled = true;
            updateTotal(100);
          }else if( checkboxName === 'node'){
            jsLibraries.disabled = true;
            updateTotal(100);
          }else if( checkboxName === 'all'){
            updateTotal(200);
          }else if( checkboxName === 'build-tools'){
            updateTotal(100);
          }else if( checkboxName === 'npm'){
            updateTotal(100);
          }
    }else{ // if unchecked, enable conflicting activities and decrease running total
      activityLabel.style.fontWeight = 'normal';
      if (checkboxName === 'js-frameworks'){
        expressCheck.disabled = false;
        updateTotal(-100);
      }else if( checkboxName === 'express'){
        jsFrameworks.disabled = false;
        updateTotal(-100);
      }else if (checkboxName === 'js-libs'){
        nodeJS.disabled = false;
        updateTotal(-100);
      }else if( checkboxName === 'node'){
        jsLibraries.disabled = false;
        updateTotal(-100);
      }else if( checkboxName === 'all'){
        updateTotal(-200);
      }else if( checkboxName === 'build-tools'){
        updateTotal(-100);
      }else if( checkboxName === 'npm'){
        updateTotal(-100);
      }
    }
});

// PAYMENT INFO SECTION
// Show only the chosen payment option section
selectPayment.addEventListener('change', (e)=>{
  if(selectPayment[1].selected){
    creditCardDiv.style.display = 'block';
    payPalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  }else if(selectPayment[2].selected){
    payPalDiv.style.display = 'block';
    creditCardDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  }else if(selectPayment[3].selected){
    payPalDiv.style.display = 'none';
    creditCardDiv.style.display = 'none';
    bitcoinDiv.style.display = 'block';
  }
});

// ----------VALIDATION UPON SUBMIT

form.addEventListener('submit', (e)=>{
  // Validate credit card length
  if(selectPayment[1].selected === true){
    parseInt(ccNum.value);
    if (ccNum.value.length < 13 || ccNum.value.length > 16){
      throwError(e, ccNum, "Please enter 13-16 digits");
    }else{
      ccNum.className = '';
    }
    // Validate Credit Card value is all numbers
    if(isNaN(ccNum.value)){
      throwError(e, ccNum, "Please enter 13-16 digits");
    }else{
      ccNum.className = '';
    }
    // Validate Zip length
    if (zip.value.length != 5){
      throwError(e, zip, "Enter 5 digits");
    }else{
      zip.className = '';
    }
    // Validate Zip is a Number
    if(isNaN(zip.value)){
      throwError(e, zip, "Enter 5 digits");
    }else{
      zip.className = '';
    }
    //validate CVV length
    if (cvv.value.length != 3){
      throwError(e, cvv, "Enter 3 digits");
    }else{
      cvv.className = '';
    }
    //validate CVV value is all numbers
    if(isNaN(cvv.value)){
      throwError(e, cvv, "Enter 3 digits");
    }else{
      cvv.className = '';
    }
  }
  //validate Email by checking the position of the @ and .
  let aPosition = email.value.indexOf('@');
  let dotPosition = email.value.lastIndexOf('.');
  // make sure there is a character before the @
  if(aPosition < 1 || dotPosition - aPosition < 2){
    email.className = 'error';
    email.value = "";
    email.placeholder = 'Please enter a valid email.';
  }else{
    email.className = '';
  }
  // Call function to check for missing fields
  checkBlankFields(e);
});
