'use strict';

let router;

let initRouter = () => {
    let root = "/";
    let useHash = true;
    let hash = "#";
    router = new Navigo(root, useHash, hash);
    let mainView = document.getElementById('mainContent');

    let loadView = function (view) {
        return (url) => {
            switch (url) {
                case "/partite":
                    {
                        view.innerHTML = gamesTable();
                        break;
                    }
                case "/giocatori":
                    {
                        view.innerHTML = playersTable();

                        break;
                    }
                case "/bonus":
                    {
                        view.innerHTML = bonusTable();
                        break;
                    }
                case "/home":
                    {
                        view.innerHTML = homeCards();
                        setCards();
                        break;
                    }
                case "/error":
                    {
                        view.innerHTML = "<p class='errore'> SERVER UNREACHABLE </p>"
                        break;
                    }
                default:
                    {
                        view.innerHTML = landingPage();
                    }
            }
        }
    };

    let viewLoader = loadView(mainView);

    router.on({
        '/giocatori': () => { viewLoader('/giocatori') },
        '/bonus': () => { viewLoader('/bonus') },
        '/partite': () => { viewLoader('/partite') },
        '/error': () => { viewLoader('/error') },
        '/home': () => { viewLoader('/home') },
        '*': () => { viewLoader('/load') }
    });
    router.resolve();
};

let showGames = () => {
    router.navigate('/partite/');
}
let showPlayers = () => {
    router.navigate('/giocatori/');
}
let showBonuses = () => {
    router.navigate('/bonus/');
}

let showError = () => {
    router.navigate('/error');
}

let goHome = () => {
    router.navigate('/home');
}



initRouter();