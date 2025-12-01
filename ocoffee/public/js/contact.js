
(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "OtP2xgoks_uu1co4k",
    });
})();

window.onload = function () {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        emailjs.sendForm('service_l9daqpq', 'template_hj2afaj', this)
            .then(() => {
                console.log('SUCCESS!');

                successMsg.style.display = 'block';
                errorMsg.style.display = 'none';

                form.reset();

                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);

            }, (error) => {
                console.log('FAILED...', error);

                errorMsg.style.display = 'block';
                successMsg.style.display = 'none';

                setTimeout(() => {
                    errorMsg.style.display = 'none';
                }, 4000);
            });
    });
}

