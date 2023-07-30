let logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout((res) => {

        if(res.success) {
            location.reload();
        } else {
            console.log(res);
        }
    })
}

ApiConnector.current((res) => {

    if(res.success) {
        ProfileWidget.showProfile(res.data)
    } else {
        console.log(res)
    }
})

let ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((res) => {
        if(res.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(res.data);
        } else {
            console.log(res)
        }
    })
}

getRates();

setInterval(getRates, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (res) => {
        if(res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(true, "Баланс пополнен!")
        } else {
            moneyManager.setMessage(false, res.error)
        }
    })
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (res) => {
        if(res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(true, "Конвертация выполнена!")
        } else {
            moneyManager.setMessage(false, res.error)
        }
    })
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (res) => {
        if(res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(true, "Перевод выполнен!")
        } else {
            moneyManager.setMessage(false, res.error)
        }
    })
}


let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((res) => {
    if(res.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(res.data);
        moneyManager.updateUsersList(res.data);
    } else {
        console.log(res)
    }
})

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (res) => {
        if(res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен!")
        } else {
            favoritesWidget.setMessage(false, res.error);
        }
    })
}
favoritesWidget.removeUserCallback  = function (data) {
    ApiConnector.removeUserFromFavorites (data, (res) => {
        if(res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(true, "Пользователь удален!")
        } else {
            favoritesWidget.setMessage(false, res.error);
        }
    })
}
