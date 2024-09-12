document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById('loginForm');
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
	const confirmPasswordInput = document.getElementById('confirmPassword');
	const emailError = document.getElementById('emailError');
	const passwordError = document.getElementById('passwordError');
	const confirmPasswordError = document.getElementById('confirmPasswordError');
	const showHiddenButton = document.getElementById('show-hide');

	loginForm.addEventListener('submit', function (event) {
		event.preventDefault()
		validateForm();
	})

	emailInput.addEventListener('blur', function () {
		validateEmail();
	})

	emailInput.addEventListener("input", function () { // Mientras escribimos no aparece el error
		clearError(emailError);
	})

	passwordInput.addEventListener('blur', function () {
		validatePassword();
	})

	passwordInput.addEventListener("input", function () { // Mientras escribimos no aparece el error
		clearError(passwordError);
	})

	confirmPasswordInput.addEventListener('blur', function () {
		confirmPassword()
	})

	confirmPasswordInput.addEventListener("input", function () { // Mientras escribimos no aparece el error
		clearError(confirmPasswordError);
	})

	showHiddenButton.addEventListener('click', function () {
		if (passwordInput.type === 'password') {
			passwordInput.type = 'text';
			confirmPasswordInput.type = 'text';
		} else {
			passwordInput.type = 'password';
			confirmPasswordInput.type = 'password';
		}
	})


	function validateForm() {
		const isValidEmail = validateEmail();
		const isValidPassword = validatePassword();
		const isValidConfirmPassword = confirmPassword();

		if (isValidEmail && isValidPassword && isValidConfirmPassword) {
			saveToLocalStorage();
			alert('Has ingresado con exito');
		}
	}

	function validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const emailValue = emailInput.value.trim();

		if (!emailRegex.test(emailValue)) {
			showError(emailError, 'Ingresa un email valido');
			return false;
		}
		return true;
	}

	function validatePassword() {
		// - Al menos una letra (mayúscula o minúscula).
		// - Al menos un dígito.
		// - Longitud mínima de 8 caracteres.
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		const passwordValue = passwordInput.value.trim();

		if (!passwordRegex.test(passwordValue)) {
			showError(passwordError, 'Ingresa una password valida que debe contener: <br>' +
				'Una letra mayúscula <br>Un dígito <br>Mínimo 8 caracteres');
			return false;
		}
		return true;
	}

	function confirmPassword() {
		const passwordValue = passwordInput.value.trim();
		const confirmPasswordValue = confirmPasswordInput.value.trim();

		if (passwordValue !== confirmPasswordValue) {
			showError(confirmPasswordError, 'La password ingresada no coinncide, ingresar nuevamente');
			return false;
		}
		return true;
	}


	function showError(errorField, errorMessage) {
		errorField.innerHTML = errorMessage;
		errorField.style.display = 'block';
	}

	function clearError(errorField) {
		errorField.innerHTML = '';
		errorField.style.display = 'none';
	}

	function saveToLocalStorage() {
		const emailValue = emailInput.value.trim();
		localStorage.setItem('email', emailValue);
		const body = createBodyBuilderJSON()
		console.log(body);
	}

	function createBodyBuilderJSON() {
		return {
			"email": emailInput.value.trim(),
			"password": passwordInput.value.trim()
		}
	}
})