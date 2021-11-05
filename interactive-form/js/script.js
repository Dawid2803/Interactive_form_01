//sets focus to the name input field.
const userName = document.getElementById('name');
userName.focus();

/*hides the other job role input field until
  the other option is picked by the user*/
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = 'none';

/*adds the input field for other job roles when
the other option is chosen on the dropdown list */ 
jobRoleList = document.querySelector('#title');
jobRoleList.addEventListener('change', e => 
{
    if(e.target.value === "other"){
       return otherJobRole.style.display = 'initial';
    }
    else{
        otherJobRole.style.display = 'none';
    }
}
)

/*pseudocode for color selector
    start by hiding all colors,
    itirate though all options;
    if option = data-theme, display option;
    if option != data-theme, display none;*/
const shirtDesign = document.querySelector('#design');
const shirtColors = document.querySelector('#color');
const colorOptions = shirtColors.children;

shirtColors.disabled = true;
for(let i = 0; i<colorOptions.length; i++){
    colorOptions[i].hidden = true;

}

shirtDesign.addEventListener('change', e=>{
    shirtColors.disabled = false;
    for(let i = 0; i<colorOptions.length; i++){
        const designValue = e.target.value;
        const dataTheme = colorOptions[i].getAttribute('data-theme');
        if(designValue === dataTheme){
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', 'true');
            
        }else if(designValue !== dataTheme){
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute('selected');
        }
       
    }
})


//Register for Activities code block//
const activities = document.querySelector('#activities');
const totalCostFinal = document.querySelector('#activities-cost');
let totalCost = 0;



activities.addEventListener('change', e => {
    //insures that the data-cost attribute is valid before adding the totalCosts//
    if(e.target.getAttribute('data-cost') !== ''){
        const dataCost = +e.target.getAttribute('data-cost');
        /*If target is checked, adds the checked items value to the total costs
            if checked is false subtracks the item value from total cost */
        if(e.target.checked)
            {
            totalCost += dataCost; 
            }
        else{
            totalCost -= dataCost;
            }
            //shows the current value of totalCost as a value for the user//
        totalCostFinal.innerHTML = `Total: $${totalCost}`;
        }
    }
)

//Payment info code block
/*sets creditCard as the initial selected item and hides
  the other payment methods until selected*/
const payment = document.querySelector('#payment');
const paymentMethods = payment.children;
paymentMethods[1].setAttribute('selected', 'true');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
paypal.style.display = 'none';
bitcoin.style.display= 'none';

payment.addEventListener('change', e=>{
    /*if target is selected as payment method, the selected target's
    payment info is displayed and the other options are hidden*/
    if(e.target.value === 'paypal'){
        paypal.style.display = 'inline-block';
        creditCard.style.display = "none"
        bitcoin.style.display = 'none';
        paymentMethods[1].setAttribute('selected', 'false');

    }
    else if(e.target.value === 'bitcoin'){
        bitcoin.style.display = 'inline-block';
        paypal.style.display = 'none';
        creditCard.style.display = "none"
        paymentMethods[1].setAttribute('selected', 'false');

        }
    else{
        creditCard.style.display = "initial"
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        paymentMethods[1].setAttribute('selected', 'true');
        }
    }
)


/*pseudocode for form validation
    create helper functions for validating the user inputs for name,email
    , activities and credit card details if chosen as payment method.
    create event listener function.
    create addeventlistener for form and use helper functions to determine
    true of false values for the items validated, if any required
    items are returned false, do not accept form, else accept form.  */

const form = document.querySelector('form');
const nameHint = document.querySelector('#name-hint');
const emailHint = document.querySelector('#email-hint');
const activitiesHint = document.querySelector('#activities-hint');
const ccHint = document.querySelector('#cc-hint');
const zipHint = document.querySelector('#zip-hint');
const cvvHint = document.querySelector('#cvv-hint');

//Helper validation functions for form validation event listener//
function nameValidation(){
    const nameValue = userName.value;
    const isNameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return isNameValid;
}

function emailValidation(){
    const emailValue = document.querySelector('#email').value;
    const isEmailValid = /^[^@]+@[^@.]+\.com$/.test(emailValue);
    return isEmailValid;
}

function activitiesValidation(){
    const areActivtiesValid = totalCost > 0;
    return areActivtiesValid;
}

function creditCardValidation(){
    const CardNumberValue = document.querySelector('#cc-num').value;
    const isCardNumberValid = /^\d{13,16}$/.test(CardNumberValue);
    return isCardNumberValid; 
}
function zipValidation(){
    const zipValue = document.querySelector('#zip').value;
    const isZipValid = /^\d{5}$/.test(zipValue);
    return isZipValid;
}
function cvvValidation(){
    const cvvValue = document.querySelector('#cvv').value;
    const isCvvValid = /^\d{3}$/.test(cvvValue);
    return isCvvValid;
}

function addNotValidClass(element){
    element.style.display = 'initial';
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
}

function removeNotValidClass(element){
    element.style.display = 'none';
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
}

form.addEventListener('submit', e=>{
    if(nameValidation() === false){
        e.preventDefault();
        addNotValidClass(nameHint);
    }else{
        removeNotValidClass(nameHint);
    }

    if(emailValidation() === false){
        e.preventDefault();
        addNotValidClass(emailHint);
    }else{
        removeNotValidClass(emailHint);
    }

    if(activitiesValidation() === false){
        e.preventDefault();
       addNotValidClass(activitiesHint);
    }else{
       removeNotValidClass(activitiesHint);
    }

//checks to see if creditCard was chosen as payment option(paymentMethod[1])//
//before running the validation of the credit card details//
    if(paymentMethods[1].getAttribute('selected') === 'true'){
        if(creditCardValidation() === false){
            e.preventDefault();
            addNotValidClass(ccHint);
        }else{
            removeNotValidClass(ccHint);
        }
        if(zipValidation() === false){
            e.preventDefault();
            addNotValidClass(zipHint);
        }else{
            removeNotValidClass(zipHint);
        }
        if(cvvValidation() === false){
            e.preventDefault();
            addNotValidClass(cvvHint);
        }else{
            removeNotValidClass(cvvHint);
        }
    }

})



/*adds the focus class for accessibility purposes,
    the class makes it easier to see if you are tabbing
    over an activity.*/

const activitiesInput = activities.querySelectorAll('input[type=checkbox]');

for(let i = 0; i < activitiesInput.length; i++){
    activitiesInput[i].addEventListener('focus', ()=>{
        activitiesInput[i].parentElement.classList.add('focus');
    })
    activitiesInput[i].addEventListener('blur', ()=>{
        activitiesInput[i].parentElement.classList.remove('focus');
    })
}






