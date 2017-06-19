var LoginController = (function () {
	function LoginController(model) {
		this.model = model;
	}

	LoginController.prototype.Login = function (userName, password,rememberMe) {
		this.model.UserName = userName;
		this.model.Password = password;
		this.model.RememberMe = rememberMe;

		if (this.checkPassword(userName, password))
			this.model.LoginSuccessful;
		else {
			this.model.LoginSuccessful = false;
			this.model.LoginErrorMessage = "Incorrect username or
			password";
		}
	};
return LoginController;
})();