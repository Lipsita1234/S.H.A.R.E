document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const progressBar = document.getElementById('progressBar');
    const form = document.querySelector('form');
    
    let currentStep = 0;

    function updateProgress() {
        const stepWidth = 100 / steps.length;
        progressBar.style.width = `${(currentStep + 1) * stepWidth}%`;
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
            step.classList.toggle('completed', index < currentStep);
        });
    }
    

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        updateProgress();
    }

    function handleFoodTypeSelection() {
        const foodType = document.querySelector('input[name="foodType"]:checked')?.value;
        document.getElementById('rawFoodDetails').style.display = foodType === 'raw' ? 'block' : 'none';
        document.getElementById('cookedFoodDetails').style.display = foodType === 'cooked' ? 'block' : 'none';
        document.getElementById('packedFoodDetails').style.display = foodType === 'packed' ? 'block' : 'none';
    }

    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step${currentStep + 1}`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const parentCard = field.closest('.card');
            const isVisible = parentCard && parentCard.style.display !== 'none';

            if (isVisible) {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            }
        });

        return isValid;
    }

    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
                handleFoodTypeSelection();
            } else {
                form.submit(); // Or redirect to a success page
            }
        } else {
            // Focus on the first invalid field
            const firstInvalidField = document.querySelector(`#step${currentStep + 1} .error`);
            if (firstInvalidField) {
                firstInvalidField.focus();
                alert('Please fill in all required fields.');
            }
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            handleFoodTypeSelection();
        }
    }

    showStep(currentStep);

    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', nextStep);
    });

    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', prevStep);
    });

    document.querySelectorAll('input[name="foodType"]').forEach(radio => {
        radio.addEventListener('change', handleFoodTypeSelection);
    });

    const foodOptions = document.querySelectorAll('.food-option input[type="radio"]');
    
    foodOptions.forEach(option => {
        option.addEventListener('change', function () {
            foodOptions.forEach(opt => {
                opt.closest('.food-option').classList.remove('active');
            });
            if (this.checked) {
                this.closest('.food-option').classList.add('active');
            }
        });
    });
});

/* DISABLING THE FOOD TYPE FORMS WHICH ARE NOT ACTIVE */ 

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the enabling/disabling of fields
    function handleFoodTypeSelection() {
        // Get the selected food type
        const selectedFoodType = document.querySelector('input[name="foodType"]:checked');
        
        // Default to raw if nothing is selected
        const selectedValue = selectedFoodType ? selectedFoodType.value : 'raw';

        // Get all the food detail sections
        const foodSections = {
            raw: document.getElementById('rawFoodDetails'),
            cooked: document.getElementById('cookedFoodDetails'),
            packed: document.getElementById('packedFoodDetails')
        };

        // Iterate over the sections and enable/disable fields
        for (const [foodType, section] of Object.entries(foodSections)) {
            if (section) {  // Check if the section exists
                const isActive = foodType === selectedValue;
                section.style.display = isActive ? 'block' : 'none';

                // Enable or disable all inputs/textarea within the section
                section.querySelectorAll('input, textarea').forEach(element => {
                    if (element) { // Check if the element exists
                        element.disabled = !isActive;
                    }
                });
            }
        }
    }

    // Attach event listener to food type options
    const foodTypeOptions = document.querySelectorAll('input[name="foodType"]');
    if (foodTypeOptions.length > 0) {
        foodTypeOptions.forEach(radio => {
            radio.addEventListener('change', handleFoodTypeSelection);
        });

        // Initial call to set up the form based on any pre-selected food type
        handleFoodTypeSelection();
    } else {
        console.warn('No food type options found.');
    }
});


/* END OF DISABLING THE FOOD TYPE FORMS WHICH ARE NOT ACTIVE */


/* DISABLING THE NEXT BUTTON WHEN NO FOOD TYPE IS SELECTED IN STEP 1 */

document.addEventListener('DOMContentLoaded', () => {
    const foodTypeOptions = document.querySelectorAll('input[name="foodType"]');
    const nextButtonStep1 = document.querySelector('#step1 .next-btn');

    // Add the greyed-out style by default
    nextButtonStep1.classList.add('disabled');

    // Function to handle the enabling of the Next button
    function handleFoodTypeSelection() {
        const selectedFoodType = document.querySelector('input[name="foodType"]:checked');
        if (selectedFoodType) {
            nextButtonStep1.classList.remove('disabled');
            nextButtonStep1.setAttribute('data-disabled', 'false');
        } else {
            nextButtonStep1.classList.add('disabled');
            nextButtonStep1.setAttribute('data-disabled', 'true');
        }
    }

    // Attach event listener to food type options
    foodTypeOptions.forEach(radio => {
        radio.addEventListener('change', handleFoodTypeSelection);
    });

    // Initial call to set up the form based on any pre-selected food type
    handleFoodTypeSelection();

    // Add click event listener to show an alert if the button is "disabled"
    nextButtonStep1.addEventListener('click', function(event) {
        console.log("next button clicked");
        if (nextButtonStep1.getAttribute('data-disabled') === 'true') {
            event.preventDefault();
            alert('Please select a food type to proceed.');
        } else {
            nextStep();  // Proceed to the next step
        }
    });
});


