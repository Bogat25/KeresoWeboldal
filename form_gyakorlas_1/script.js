function submitForm() {
    var fullName = document.getElementById("fullName").value;
    var password = document.getElementById("password").value;
    var gender = document.getElementsByName("gender");

    var selectedGender = null;

    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked == true)
            selectedGender = gender[i];
    }

    var age = document.getElementById("age").value;
    //console.log(age);

    var languages = document.getElementsByName("prog");
    var languagesSelected = [];
    for (var i = 0; i < languages.length; i++) {
        if (languages[i].checked == true) {
            languagesSelected.push(languages[i].value);
        }
    }

    //itt lehetne simán csak kiirattatni is viszont így letisztultabban néz ki a consoleon
    for (var i = 0; i < languagesSelected.length; i++) {
        console.log(languagesSelected[i]);
    }










    //jegyzet
    //console.log(selectedGender.value);

}