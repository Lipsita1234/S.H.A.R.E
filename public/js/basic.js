document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('fade-out', 'vanish');
});

document.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'a' && event.target.getAttribute('onclick')) {
        const x = event.clientX;
        const y = event.clientY;
        const r = Math.sqrt(window.innerWidth**2 + window.innerHeight**2) * 1.5;

        document.documentElement.style.setProperty('--click-x', `${x}px`);
        document.documentElement.style.setProperty('--click-y', `${y}px`);
        document.documentElement.style.setProperty('--circle-radius', `${r}px`);
    }
});

function navigateToNewPage(url) {
    // Start the fade-out transition
    document.body.classList.add('fade-out');
    
    // Wait for the transition to complete before navigating
    setTimeout(() => {
        
        document.body.classList.add('vanish'); // Add vanish class to remove pseudo-elements
        setTimeout(() => {
            document.body.classList.remove('vanish'); // Remove vanish class
            document.body.classList.remove('fade-out'); // Remove fade-out class
            
        }, 50); // Short delay to ensure the vanish effect is applied
    }, 700); // The duration of the fade-out transition in milliseconds
    
   setTimeout(() => {
    window.location.href = url; // Navigate to the new page in 400ms ( before the fade-out transition is completed )
   } , 200); 
}

// Listen for page load to reset the transition effect
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('fade-out', 'vanish');
        document.documentElement.style.setProperty('--circle-radius', '0px');
    }
});
