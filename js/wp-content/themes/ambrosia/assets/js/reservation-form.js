jQuery(document).ready(function($) {

	if ($(".awe-start-date-input").length) {
		$(".awe-start-date-input").datepicker({
            dateFormat: ReservationForm.dateFormat,
            constrainInput: true,
            minDate: 0,
        });

		$(".awe-start-date-input").on('change', function() {
			var d = $(this).val();
			if ($(this).hasClass("de-date")) {
				d = d.replace(/\//g, '.');
			}
			$(this).next().next().val(d);
		});
	}

	if ($(".awe-reservation-form").length) {
		$(".awe-reservation-form").on('submit', function() {
			var check = true;
			var dateInput = $(this).find(".awe-start-date-input");
			var perInput = $(this).find("#pers");

			// check date input
			if (dateInput.val() == "") {
				if (dateInput.parent().children('p').length) {
					dateInput.parent().children('p').show();
				} else {
					var p = $('<p class="reser-alert">Please fill the required field</p>');
					dateInput.parent().append(p);
				}
				check = false;
			} else {
				dateInput.parent().children('p').hide();
			}

			// check people input
			if (perInput.val() == "") {
				if (perInput.parent().children('p').length) {
					perInput.parent().children('p').show();
				} else {
					var p = $('<p class="reser-alert">Please fill the required field</p>');
					perInput.parent().append(p);
				}
				check = false;
			} else {
				perInput.parent().children('p').hide();
			}

			if (!check)
				return false;
		});
	}

});