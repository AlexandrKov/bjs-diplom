"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    console.log(data);

    ApiConnector.login(data, (res) => {
        console.log(res);

        if(res.success) {
            location.reload()
        } else {
            alert(res.error)
        }
    })
}

userForm.registerFormCallback = (data) => {
    console.log(data);

    ApiConnector.register(data, (res) => {
        console.log(res);

        if(res.success) {
            location.reload()
        } else {
            alert(res.error)
        }
    })
}