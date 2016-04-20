var userListData = [];

//DOM Ready
$(document).ready(function(){
    //$('#fromTest').on('click', test());
    getGuardians();

    // Add Guardian button click
    $('#btnAddGuardian').on('click', addGuardian);

    // Add Weapon button click
    $('#btnAddWeapon').on('click', addWeapon);

    // Add Armor button click
    $('#btnAddArmor').on('click', addArmor);

    // New Equip button click
    $('#btnEquipArmor').on('click', equip);

    // GuardianID link click
    $('#guardianList table tbody').on('click', 'td a.linkShowGuardian', showGuardianStats);

});

// Fill table with data
function getGuardians(){
    //console.log('I Ran');
    // Empty Content String
    var tableContent = '';


    //jQuery Ajax call for JSON
    $.getJSON('/guardianlist', function(data){
        userListData = data;

        //Fore each item in our JSON, add a table row and cells to the content
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkShowGuardian" rel="' + this.GuardianID + '">' + this.GuardianID + '</a></td>';
            tableContent += '<td>' + this.class + '</td>';
            tableContent += '<td>' + this.gender + '</td>';
            tableContent += '<td>' + this.race + '</td>';
            tableContent += '<td>' + this.level + '</td>';
            tableContent += '</tr>';
        });

        //Inject the whole content string into our existing HTML table
        $('#guardianList table tbody').html(tableContent);
    });
};

function addGuardian(){
    //console.log('adding guardian');
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addGuardian input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newGuardian = {
            'GuardianID': $('#addGuardian fieldset input#GuardianID').val(),
            'class': $('#addGuardian fieldset input#class').val(),
            'gender': $('#addGuardian fieldset input#gender').val(),
            'race': $('#addGuardian fieldset input#race').val(),
            'level': $('#addGuardian fieldset input#level').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newGuardian,
            url: '/addGuardian',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === '') {

                // Clear the form inputs
                $('#addGuardian fieldset input').val('');

                // Update the table
                getGuardians();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.message);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function addWeapon(){
    console.log('adding weapon');
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addWeapon input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newWeapon = {
            'WeaponID': $('#addWeapon fieldset input#WeaponID').val(),
            'WeaponName': $('#addWeapon fieldset input#WeaponName').val(),
            'Type': $('#addWeapon fieldset input#Type').val(),
            'Subtype': $('#addWeapon fieldset input#Subtype').val(),
            'Attack': $('#addWeapon fieldset input#Attack').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newWeapon,
            url: '/addWeapon',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === '') {

                // Clear the form inputs
                $('#addWeapon fieldset input').val('');

                // Update the table
                //getGuardians();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.message);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function addArmor(){
    console.log('adding Armor');
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addArmor input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newArmor = {
            'ArmorID': $('#addArmor fieldset input#ArmorID').val(),
            'ArmorName': $('#addArmor fieldset input#ArmorName').val(),
            'Type': $('#addArmor fieldset input#Type').val(),
            'Defense': $('#addArmor fieldset input#Defense').val(),
            'intellect': $('#addArmor fieldset input#intellect').val(),
            'discipline': $('#addArmor fieldset input#discipline').val(),
            'strength': $('#addArmor fieldset input#strength').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newArmor,
            url: '/addArmor',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === '') {

                // Clear the form inputs
                $('#addArmor fieldset input').val('');

                // Update the table
                //getGuardians();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.message);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function equip(){
    console.log('equipping Armor');
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#equip input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var equipment = {
            'GuardianID': $('#equip fieldset input#GuardianID').val(),
            'wPrimary': $('#equip fieldset input#wPrimary').val(),
            'wSpecial': $('#equip fieldset input#wSpecial').val(),
            'wHeavy': $('#equip fieldset input#wHeavy').val(),
            'Helmet': $('#equip fieldset input#Helmet').val(),
            'Gauntlets': $('#equip fieldset input#Gauntlets').val(),
            'Chest': $('#equip fieldset input#Chest').val(),
            'Legs': $('#equip fieldset input#Legs').val(),
            'ClassArmor': $('#equip fieldset input#ClassArmor').val(),
            'Artifacts': $('#equip fieldset input#Artifacts').val(),
            'Ghost': $('#equip fieldset input#Ghost').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: equipment,
            url: '/equip',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === '') {

                // Clear the form inputs
                $('#equip fieldset input').val('');

                // Update the table
                //getGuardians();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.message);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function showGuardianStats(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisGuardianID = $(this).attr('rel');
    console.log(thisGuardianID);
    // Get Index of object based on id value
    var arrayPosition = guardianList.map(function(arrayItem) { return arrayItem.GuardianID; }).indexOf(thisGuardianID);

    // Get our User Object
    var thisGuardianObject = userListData[arrayPosition];

    //Populate Info Box
    $('#race').text(thisGuardianObject.fullname);
    $('#class').text(thisGuardianObject.age);
    $('#light').text(thisGuardianObject.gender);
    $('#intellect').text(thisGuardianObject.location);
    $('#discipline').text(thisGuardianObject.location);
    $('#strength').text(thisGuardianObject.location);

};
