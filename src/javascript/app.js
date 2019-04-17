$(() => {
    let form,
        formMessages = $('#form-messages'),
        formSuccess = false;

    // If viewport is 768px and below, remove desktop .App__main
    // Simple workaround for bug of Mobile version form
    if ($(window).width() < 768) {
        $('body main.desktop__main').remove();
        form = $('.mobile__form');
    } else {
        $('body main.mobile__main').remove();
        form = $('.desktop__form');
    }

    // Form event listener
    $(form).on('submit', (e) => {
        e.preventDefault();

        // Serialize form data.
        let formData = $(form).serialize();

        // Submit form via AJAX
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })

            // On successful request
            .done(() => {

                toastr.success('SUCCESS!');

                // Empty the form
                $('#fname', '#lname', '#gdpr', '#email').val('');

                console.log();

            })
            .fail((data) => {

                // Form message has the error class
                toastr.warning('Oops! Something went wrong');

                // Set message text
                data.responseText !== '' ? $(formMessages).text(data.responseText) : console.log('Oops! An error occured and your message could not be sent.');
            });
    });

    $("button.form__submit").on('click', () => {
        let formDataFilled = $('#fname').val().length > 0 && $('#lname').val().length > 0 && $('#email').val().length > 0 && $('#company').val().length > 0 && $('#phone').val().length > 0 && $('#gdpr').is(":checked");
        console.log("this: ", $(this));
        console.log('formDataFilled: ' + formDataFilled)
        if (formDataFilled == true) {
            formSuccess = true;
            setTimeout(() => {
                if (formSuccess === true) {
                    console.log('Form Success!');
                }
            }, 1500);
            dataLayer.push({
                'event': 'form_submission_success'
            });

        }
    });

});