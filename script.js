// Product search and filter functionality
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const productListGrid = document.querySelector('.listings');
const products = productListGrid ? Array.from(productListGrid.getElementsByClassName('products')) : [];
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase().replace(/-/g, ' ');
        const category = product.getAttribute('data-category');

        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = selectedCategory === 'All-categories' || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    })
}

if (searchInput && categoryFilter) {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

// Form validation
//The form uses an imported library of function - to display an alert whenever conditons aren't met
const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Name validation
        const fullname = document.getElementById('fullname')?.value.trim() || '';
        if (!fullname) {
            Swal.fire({
                icon: 'error',
                text: 'Name cannot be empty!'
            });
            return;
        }

        if (fullname.length > 20) {
            Swal.fire({
                icon: 'error',
                text: 'Name must not be more than 20 characters!'
            });
            return;
        }

        // Password validation
        const password = document.getElementById('password')?.value || '';
        if (!password) {
            Swal.fire({
                icon: 'error',
                text: 'Password cannot be empty!'
            });
            return;
        }

        // Confirm password validation
        const confirmPassword = document.getElementById('password1')?.value || '';
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                text: 'Passwords do not match!'
            });
            return;
        }
        // After password and confirm password validation
        const agree = document.getElementById('agree')?.checked;
        if (!agree) {
            Swal.fire({
                icon: 'error',
                text: 'You must agree to the Privacy Policy to register!'
            });
        return;
        }

        setCookie('jg_username', fullname, 7);
        setCookie('jg_registered', 'true', 7);

        // Success alert
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: `Welcome to Drive Hub, ${fullname}!, you are our newest member`
        });

        // Clear form fields
        registerForm.reset();
    });
}


// Cookie implementation 

// Declare a function setCookie that takes three parameters: name(cookie name), value(name value-Natalie), and days(days cookie should last)
function setCookie(name, value, days) {
    // Stores cookie expiration date
    let expires = "";
    // Chceck if days parameter is provided
    if (days) {
        // Retrieve current date and time
        const date = new Date();
        // date.getTime() returns the number of milliseconds since January 1, 1970
        // Add the number of days converted to milliseconds to the current time
        // date.setTime() updates date by adding the calculated milliseconds
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        // Convert the expiration date to UTC string format and set it to expires variable
        expires = "; expires=" + date.toUTCString();
    }

    // Set the cookie by assigning a string to document.cookie
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
