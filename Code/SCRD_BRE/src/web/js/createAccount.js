/*
    Copyright 2014 OPM.gov

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

$(function() {
	// Setup page
    setupPage('CREATE_NEW_ACCOUNT', 1);
    
	
    var context = $('#context').val();
    var accountId = $('#accountId').val();

    populateNamedEntity('suffixes', context);
    populateNamedEntity('countries', context);
    populateNamedEntity('states', context);
    if (accountId !== '') {
        var account = getAccount(context, accountId);
        populateBasicInfo(context, accountId);
        
        if ($('.depositTab').length != 0) {
            populateCalculationVersion(account);
        }
    }

    /*$('.sDateLC').datepicker({
        showOn: "button",
        buttonImage: context + "/i/calendar.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true, yearRange: "-100:+1",
        buttonText: "Enter the Starting Date for calculation."
    });

    $('.eDateLC').datepicker({
        showOn: "button",
        buttonImage: context + "/i/calendar.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true, yearRange: "-100:+1",
        buttonText: "Enter the Ending Date for calculation."
    });*/

    // Shorten select option text if it stretches beyond max-width of select element
$.each($('.shortenedSelect option'), function(key, optionElement) {
    var curText = $(optionElement).text();
    $(this).attr('title', curText);

    // Tip: parseInt('350px', 10) removes the 'px' by forcing parseInt to use a base ten numbering system.
    var lengthToShortenTo = 12;
    
    if (curText.length > lengthToShortenTo) {
        $(this).text('... ' + curText.substring((curText.length - lengthToShortenTo), curText.length));
    }
});
    
    // button trigger start
    $('.jsStep1Next, .step1-2 a').click(function() {
        if (validate(accountId) == true) {
            if (createAccount(context, accountId) == true) {
                window.location = context + "/account/viewCreate?step=createServiceHistory";
            }
        }

    });

    $('.step3 a, .jsStep2Next').click(function() {
        
                var cur = $(".jsSaveCalculation");
                var tab = $(cur).parents(".tabsBlock").eq(0);
                var interestDateSave = $(".validationStatusBar .interestCalculatedToDate", tab).val(); // should be removed when interestCalculatedToDate become readonly
                $(".jsCancelFunction", tab).trigger("click");
                $(".validationStatusBar .interestCalculatedToDate", tab).val(interestDateSave); // should be removed when interestCalculatedToDate become readonly
                if ($(".entriesTbl tbody tr").length > 1 && validateCalculationEntry(cur) == false) {
                    showPopup(".createAccountPopupNext");
                    return false;
                }

                var saveBack = function(res, save, tab, calculationVersion) {
                    runCalculationCallBack(res, save, tab, calculationVersion);
                    if(res == 0){
                        showPopup(".createAccountPopupNext");
                        return false;
                    } else {
                        window.location = context + "/account/viewCreate?step=createAccountNote";
                    }
                };

                if($(".entriesTbl tbody tr").length <= 1){
                    window.location = context + "/account/viewCreate?step=createAccountNote";

                } else {
                   runCalculation(context, tab, true, saveBack); 
                }
                
            
        
    });


    $('.jsStep2Prev').click(function() {
        
                var cur = $(".jsSaveCalculation");
                var tab = $(cur).parents(".tabsBlock").eq(0);
                var interestDateSave = $(".validationStatusBar .interestCalculatedToDate", tab).val(); // should be removed when interestCalculatedToDate become readonly
                $(".jsCancelFunction", tab).trigger("click");
                $(".validationStatusBar .interestCalculatedToDate", tab).val(interestDateSave); // should be removed when interestCalculatedToDate become readonly
                if ($(".entriesTbl tbody tr").length > 1 && validateCalculationEntry(cur) == false) {
                    showPopup(".createAccountPopupPrev");
                    return false;
                }

                var saveBack = function(res, save, tab, calculationVersion) {
                    runCalculationCallBack(res, save, tab, calculationVersion);
                    if(res == 0){
                        showPopup(".createAccountPopupPrev");
                        return false;
                    } else {
                        window.location = context + "/account/viewCreate?step=createAccount";
                    }
                };
                if($(".entriesTbl tbody tr").length <= 1){
                    window.location = context + "/account/viewCreate?step=createAccount";

                } else {
                   runCalculation(context, tab, true, saveBack); 
                }
            
        
    });


    $('.jsStep2Finish').click(function() {
        
                var cur = $(".jsSaveCalculation");
                var tab = $(cur).parents(".tabsBlock").eq(0);
                var interestDateSave = $(".validationStatusBar .interestCalculatedToDate", tab).val(); // should be removed when interestCalculatedToDate become readonly
                $(".jsCancelFunction", tab).trigger("click");
                $(".validationStatusBar .interestCalculatedToDate", tab).val(interestDateSave); // should be removed when interestCalculatedToDate become readonly
                if ($(".entriesTbl tbody tr").length > 1 && validateCalculationEntry(cur) == false) {
                    showPopup(".createAccountPopupFinish");
                    return false;
                }

                var saveBack = function(res, save, tab, calculationVersion) {
                    runCalculationCallBack(res, save, tab, calculationVersion);
                    if(res == 0){
                        showPopup(".createAccountPopupFinish");
                        return false;
                    } else {
                        window.location = context + "/account/viewCreate?step=createAccountFinish";
                    }
                };
                if($(".entriesTbl tbody tr").length <= 1){
                    window.location = context + "/account/viewCreate?step=createAccountFinish";

                } else {
                   runCalculation(context, tab, true, saveBack); 
                }
            
        
    });

    

    $('.step1-3 a').click(function() {
        if (validate(accountId) == true) {
            if (createAccount(context, accountId) == true) {
                
                window.location = context + "/account/viewCreate?step=createAccountNote";
            }
        }
    });

    $('.step1-4 a').click(function() {
        if (validate(accountId) == true) {
            if (createAccount(context, accountId) == true) {
                window.location = context + "/account/viewCreate?step=createAccountFinish";
            }
        }
    });

    $('.jsStep3Next').click(function() {
        var value = $.trim($("textarea[name='notes']").val());
        if (value == '') {
            //showPopup('.emptyNotePopup');
            window.location = context + "/account/viewCreate?step=createAccountFinish";
            return;
        }
        $.ajax({
            url: context + '/account/' + accountId + '/notes',
            async: false,
            success: function(data) {
                if (data.length != 0) {
                    var note = data[0];
                    note.text = $('.notes').val();
                    note.date = new Date();
                    updateNote(context, accountId, note);
                } else {
                    addAccountNote(context, accountId);
                }

            },
            error: function(e) {
                alert('fail to get account notes, message:' + e.responseText);
            }
        });
        
    });
    $('.jsCancelCreateAccount').click(function() {
        cancelCreation(context);
    });

    

    // the tab is create service history
    if ($('.depositTab').size() != 0) {
        populateNamedEntity('payTypes', context);
        populateNamedEntity('serviceTypes', context);
        populateNamedEntity('retirementTypes', context);
        populateNamedEntity('appointmentTypes', context);
        populateNamedEntity('periodTypes', context);

    }
    // button trigger end

    $('.dollar').formatCurrency({
        negativeFormat: '%s-%n'
    });

    shortenSelect('.stateOfEmployment', 32);
    shortenSelect('.addressSelect', 32);
    shortenSelect('.countriesSelect', 32);

});

function validate(createdAccountId) {
    var validated = true;
    var context = $('.basicInfoPanel');
    var country = $("select[name='country']", context).val();
    $('.halfRowField', context).find('.errorIcon').remove();

    var html = "<ul style='list-style-type: square;'>";

    var formType = $("input[name='formType']:checked", context);
    if(formType.length <= 0){

        html += "<li style='margin-left: 20px;'><span>Invalid Form submitted. Select a non empty value.</span><br/></li>";
        validated = false;
    }
    // Bug Fix 2
    var fieldNames = ['firstName', 'lastName', 'street1'];
    var displayNames = ['First Name', 'Last Name', 'Address #1'];
    $.each(fieldNames, function(idx) {
        var input = $("input[name='" + this + "']", context);
        if ($.trim(input.val()) == '') {
            //input.parent('div.halfRowField').append("<span class='errorIcon' title='Invalid " + displayNames[idx] + ". Enter a non empty value.'></span>");
            //input.addClass('error');
            //validated = false;
            html += "<li style='margin-left: 20px;'><span>Invalid " + displayNames[idx] + ". Enter a non empty value.</span><br/></li>";
            validated = false;
        }
        // Bug Fix 2
    });
    // Bug Fix 2
    var zipCode = $("input[name='" + "zipCode" + "']", context);
    if (country == '197' && (/^\d{5}(?:[-\s]\d{4})?$/.test(zipCode.val()) == false || $.trim(zipCode.val()) == '' )) {
            //zipCode.parent('div.halfRowField').append("<span class='errorIcon' title='Invalid input. Enter a valid zip code.'></span>");
            //zipCode.addClass('error');
            html += "<li style='margin-left: 20px;'><span>The format of zipCode is not correct.</span><br/></li>";
            validated = false;
    }

    var city =  $("input[name='" + "city" + "']", context);

    if (country == '197' &&  $.trim(city.val()) == ''){
        //city.parent('div.halfRowField').append("<span class='errorIcon' title='Invalid city. Enter a non empty value.'></span>");
        //city.addClass('error');
        html += "<li style='margin-left: 20px;'><span> City is required</span><br/></li>";
        validated = false;
    }

    var date = $("input[name='birthDate']", context);
    if (isNaN(Date.parse(date.val())) || Date.parse(date.val()) > new Date()) {
        //date.parent('div.halfRowField').append("<span class='errorIcon' title='The birth date is invalid or after the current time.'></span>");
        //date.addClass('error');
        html += "<li style='margin-left: 20px;'><span>The format of birth date is not correct or after the current time.</span><br/></li>";
        validated = false;
    }
    var state = $("select[name='state']", context);
    if ((state.val() == "0" || state.val() == "") && country == '197') {
        //state.parents('div.halfRowField').eq(0).append("<span class='errorIcon' title='Invalid input. Select a valid state'></span>");
        //state.addClass('error');
        html += "<li style='margin-left: 20px;'><span>Please select State/Province/Region</span><br/></li>";
        validated = false;
    }

    var ssn = $('.ssn1').val() + '-' + $('.ssn2').val() + '-' + $('.ssn3').val();
    if (/^\d{3}-?\d{2}-?\d{4}$/g.test(ssn) == false) {
        //$('.ssn', context).addClass('error');
        //$('.ssn1', context).parent('div.halfRowField').append("<span class='errorIcon' title='Invalid input. Enter the ssn in the format XXX-XX-XXXX.'></span>");
        html += "<li style='margin-left: 20px;'><span>The format of SSN is not correct</span><br/></li>";
        validated = false;
    }
    var email = $("input[name='email']", context);
    if ($.trim(email.val()) != '' && /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/g.test($.trim(email.val())) == false) {
        //email.addClass('error');
        //email.parent('div.halfRowField').append("<span class='errorIcon' title='The email format is invalid.'></span>");
        html += "<li style='margin-left: 20px;'><span>The format of email is not correct</span><br/></li>";
        validated = false;
    }
    var filter = {};
    filter.ssn = ssn;

    var contextR = $('#context').val();

    var numssn = 0;

    var foundId = '';

    $.ajax({
        url: contextR + '/account/search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(filter),
        async: false,
        success: function(data, text, xhr) {
                numssn = data.items.length;
                if(numssn > 0){
                    //foundId = data.items[0].holder.id;
                    foundId = data.items[0].id;
                }
        },
    });

    if(numssn > 0 && foundId+"" !== createdAccountId+""){

        //$('.ssn', context).addClass('error');
        //$('.ssn1', context).parent('div.halfRowField').append("<span class='errorIcon' title='Invalid input. The ssn already exists. Enter the ssn in the format XXX-XX-XXXX.'></span>");
        html += "<li style='margin-left: 20px;'><span>The SSN already exists. Pick another one.</span><br/></li>";
        validated = false;

    }

    $('.basicInfoPanel input[type="text"]').each(function() {
        var value = $(this).val();
        value = value.replace(/\</g, "&lt;");
        value = value.replace(/\>/g, "&gt;");
        $(this).val(value);
    });

    html += "</ul>";
    if (validated == false) {
        $('.basicValidationError').html(html);
        showPopup(".basicInfoValidationPopup ");
    }

    return validated;
}



function createAccount(context, createdAccountId) {
    var account = {
        claimNumber: Math.floor(Math.random() * 8999999) + 1000000,
        planType: '',
        returnedFromRecordsDate: new Date(),
        formType: {},
        holder: {
            address: {
            }
        },
        status: {
            id: 1
        },
        balance: 0
    };

    if (createdAccountId !== '') {
        $.ajax({
            url: context + '/account/' + createdAccountId,
            async: false,
            success: function(data, text, xhr) {
                account = data;
            },
            error: function(a, b, c) {
                alert('fail to save account, message:' + a.responseText);
            }
        });
    }

    var fields = $('.basicInfoPanel input.holder:text').serializeArray();
    $.each(fields, function() {
        if ($.trim(this.value).length !== 0) {
            if (this.name !== 'birthDate') {
                account.holder[this.name] = this.value;
            } else {
                account.holder[this.name] = Date.parse(this.value);
            }
        }

    });

    fields = $('.basicInfoPanel select.holder').serializeArray();
    $.each(fields, function() {
        if (this.value != 0) {
            if (this.name === 'suffix') {
                account.holder.suffix = {};
                account.holder.suffix.id = this.value;
            }

            if (this.name === 'stateOfEmployment') {
                account.holder.stateOfEmployment = {};
                account.holder.stateOfEmployment.id = this.value;
            }
        } else {
            if (this.name === 'suffix') {
                account.holder.suffix = null;
            }

            if (this.name === 'stateOfEmployment') {
                account.holder.stateOfEmployment = null;
            }
        }


    });

    fields = $('.basicInfoPanel input.address:text').serializeArray();
    $.each(fields, function() {
        if ($.trim(this.value).length !== 0) {
            account.holder.address[this.name] = this.value;
        }

    });

    fields = $('.basicInfoPanel select.address').serializeArray();
    $.each(fields, function() {
        if (this.value != 0) {
            if (this.name === 'state') {
                account.holder.address.state = {};
                account.holder.address.state.id = this.value;
            }
            if (this.name === 'country') {
                account.holder.address.country = {};
                account.holder.address.country.id = this.value;
            }
        } else {
            if (this.name === 'state') {
                account.holder.address.state = null;
            }
            if (this.name === 'country') {
                account.holder.address.country = null;
            }
        }

    });

    fields = $('.basicInfoPanel input.ssn:text').serializeArray();
    account.holder.ssn = fields[0].value + '-' + fields[1].value + '-' + fields[2].value;

    fields = $('.basicInfoPanel input.phone:text').serializeArray();

    account.holder.telephone = $.trim(fields[0].value) + '-' + $.trim(fields[1].value);
    if (account.holder.telephone == '-') {
        account.holder.telephone = null;
    }

    var formType = $('input[name=formType]:checked', '.basicInfoPanel').val();

    if(formType && formType !== "" ){

        if(isNull(account.formType)){
            account.formType = {};
        }
        account.formType.id = formType;
        if (formType == 2) {
            account.planType = 'CSRS';
        } else {
            account.planType = 'FERS';
        }

    } else {
        account.formType = null;
    }


    // send ajax request 
    var url = context + '/account/';
    var method = 'POST';
    if (createdAccountId !== '') {
        url = url + 'saveEmployee';
        method = 'PUT';
    } else {
        url = url + 'create';
    }

    $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(account),
        success: function(data, text, xhr) {
        },
        error: function(a, b, c) {
            alert('fail to create account, message:' + a.responseText);
            return false;
        }
    });
    return true;


}

function populateBasicInfo(context, createdAccountId) {
    $.ajax({
        url: context + '/account/' + createdAccountId,
        cache: false,
        success: function(data, text, xhr) {
            var panel = $('.basicInfoPanel');
            $("input[name='lastName']", panel).val(data.holder.lastName);
            $("input[name='firstName']", panel).val(data.holder.firstName);
            $("input[name='middleInitial']", panel).val(data.holder.middleInitial);
            $("input[name='birthDate']", panel).val(parseDateToString(data.holder.birthDate));
            $("input[name='email']", panel).val(checkNull(data.holder.email));
            $("input[name='title']", panel).val(checkNull(data.holder.title));
            $("input[name='geoCode']", panel).val(checkNull(data.holder.geoCode));
            $("input[name='cityOfEmployment']", panel).val(checkNull(data.holder.cityOfEmployment));
            $("input[name='departmentCode']", panel).val(checkNull(data.holder.departmentCode));
            $("input[name='street1']", panel).val(data.holder.address.street1);
            $("input[name='street2']", panel).val(checkNull(data.holder.address.street2));
            $("input[name='street3']", panel).val(checkNull(data.holder.address.street3));
            $("input[name='street4']", panel).val(checkNull(data.holder.address.street4));
            $("input[name='street5']", panel).val(checkNull(data.holder.address.street5));
            $("input[name='city']", panel).val(data.holder.address.city);
            
            
            if(data.formType){
                $("input[name=formType][value=" + data.formType.id + "]").prop('checked', true);
            }
            

            // get ssn
            var ssnTokens = data.holder.ssn.split('-');
            $('.ssn1', panel).val(ssnTokens[0]);
            $('.ssn2', panel).val(ssnTokens[1]);
            $('.ssn3', panel).val(ssnTokens[2]);
            // get phone number
            if (data.holder.telephone != null) {
                var numTokens = data.holder.telephone.split('-');
                $('.phoneInput', panel).val(numTokens[0]);
                $('.phoneExt', panel).val(numTokens[1]);
            }
            // get suffix
            if (data.holder.suffix != null) {
                $("select[name='suffix']", panel).val(data.holder.suffix.id);
            }
            // get country
            if (data.holder.address.country != null) {
                $("select[name='country']", panel).val(data.holder.address.country.id);
            }
            // get state of deployment
            if (data.holder.stateOfEmployment != null) {
                $("select[name='stateOfEmployment']", panel).val(data.holder.stateOfEmployment.id);
            }

            if(!isNull(data.holder.address.state)){
                $("select[name='state']", panel).val(data.holder.address.state.id);
            }

            if(!isNull(data.holder.address.zipCode)){
                $("input[name='zipCode']", panel).val(data.holder.address.zipCode);
            }

            $(".accountInfo .name").text(data.holder.firstName + " " + data.holder.lastName);
            $(".accountInfo .claimNum").text(data.claimNumber);





        },
        error: function(a, b, c) {
            alert('fail to get account, message:' + a.responseText);
        }
    });
}

function cancelCreation(context) {
    post_to_url(context + '/account/cancelCreation', {});
}

function addAccountNote(context, createdAccountId) {
    var note = {
        accountId: parseInt(createdAccountId),
        writer: user.role.name + ', ' + user.firstName,
        text: $('.notes').val(),
        date: new Date()
    };
    $.ajax({
        url: context + '/account/' + createdAccountId + '/notes',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(note),
        success: function(data, text, xhr) {
            window.location = context + '/account/viewCreate?step=createAccountFinish';
        },
        error: function(a, b, c) {
            alert('fail to add account note, message:' + a.responseText);

        }
    });
}

function updateNote(context, createdAccountId, note) {
    $.ajax({
        url: context + '/account/' + createdAccountId + '/notes',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(note),
        success: function(data, text, xhr) {
            window.location = context + '/account/viewCreate?step=createAccountFinish';
        },
        error: function(a, b, c) {
            alert('fail to update account note, message:' + a.responseText);

        }
    });
}

function checkNull(value) {
    if (value == null) {
        return '';
    }
    return value;
}

// removed from here per https://github.com/nasa/SCRD/issues/72 since the function already exists (and is working)
// in script.js
//
// function calculatePeriodInDays(startDate, endDate)

function calculateMidPoint(beginDate, endDate) {

    // plus one day to end date
    endDate = new Date(endDate.getTime() + 86400 * 1000);

    var startY = beginDate.getFullYear();
    var startM = beginDate.getMonth();
    var startD = beginDate.getDate();

    var endY = endDate.getFullYear();
    var endM = endDate.getMonth();
    var endD = endDate.getDate();

    if (endD < startD) {
        endD += 30;
        endM -= 1;
    }

    if (endM < startM) {
        endM += 12;
        endY -= 1;
    }

    var months = 12 * (endY - startY) + (endM - startM);

    var days = (endD - startD);

    // Divide days and months by 2
    days = parseInt(days / 2);
    days += parseInt((months * 30 / 2)) % 30;
    months = parseInt(parseInt(months * 30 / 2) / 30);
    
    if (startD == 31) {
        // according to this thread, consider 30 days a month:
        // http://apps.topcoder.com/forums/?module=Thread&threadID=802606&start=0
        startD = 30;
    }
    while (startD + days > 30) {
        startM += 1;
        days -= 30;
    }

    while (startM + months > 12) {
        startY += 1;
        months -= 12;
    }

    var midPointDate = new Date(startY, startM + months, startD + days);

    return midPointDate;
}



$(document).ready(function() {

    //Date Calculator
    $('.jsCalBtn').click(function() {
        var block = $(this).parents(".dateCalculator");
        var sDate = $("input[name=sDate]", block).val();
        var eDate = $("input[name=eDate]", block).val();
        if (sDate == "" || isDate(sDate) == false) {
            $(".errorMsg", block).text("Starting Date is invalid.");
            $(".errorMask", block).show();
        } else if (eDate == "" || isDate(eDate) == false) {
            $(".errorMsg", block).text("Ending Date is invalid.");
            $(".errorMask", block).show();
        } else if(Date.parse(eDate) < Date.parse(sDate)){
            $(".errorMsg", block).text("Ending Date should not be before Starting Date.");
            $(".errorMask", block).show();
        } else {
            sDate = parseStringToDate(sDate);
            eDate = parseStringToDate(eDate);
            var periodInDays = calculatePeriodInDays(sDate, eDate);
            var midPointDate = calculateMidPoint(sDate, eDate);
            var cells = $("#calResultsTbl tbody td");
            var inYear = parseInt(periodInDays / (12 * 30));
            var inMonth = parseInt((periodInDays - inYear * 12 * 30) / 30);
            var inDay = (periodInDays - inYear * 12 * 30 - inMonth * 30);
            
            cells.eq(0).text(inYear);
            cells.eq(1).text(inMonth);
            cells.eq(2).text(inDay);
            cells.eq(3).text((periodInDays / (12 * 30)).toFixed(1));
            cells.eq(4).text(periodInDays);
            cells.eq(5).text(parseDateToString(midPointDate));
        }
    });


});



function parseStringToDate(dateString) {
    var parts = dateString.split("/");
    return new Date(parts[2], parts[0] - 1, parts[1]);
}