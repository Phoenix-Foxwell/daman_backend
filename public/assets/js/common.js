// DISPLAY ERROR MESSAGE
function myFunction(message) {
    // $(function() {
    //         $.alert(message, {
    //             title: 'Error',
    //             closeTime: 10 * 1000,
    //             autoClose: true,
    //             position: ['top-right'],
    //             withTime: false,
    //             type: 'error',
    //             isOnly: true
    //         });
    //     })
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", "hide"); }, 1000);;
}

// VALIDATE EMAIL
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    } else {
        return (false)
    }
}


// DISPLAY SUCCESS MESSAGE
function successFunction(message) {
    // $(function() {
    //         $.alert(message, {
    //             title: 'Success',
    //             closeTime: 5 * 1000,
    //             autoClose: true,
    //             position: ['top-right'],
    //             withTime: false,
    //             type: 'success',
    //             isOnly: true
    //         });
    //     })
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", "hide"); }, 3000);
}


    