
const auth = firebase.auth();
const db = firebase.firestore();

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/home', function (context) {
        loadPartials(context).then(function () {
            if (sessionStorage.hasOwnProperty('id')) {
                context.email = sessionStorage.email
                context.loggedIn = true;
            }
            this.partial('./templates/home/home.hbs')

        });
    });

    this.get('#/about', function (context) {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs'
        }).then(function () {
            if (sessionStorage.hasOwnProperty('id')) {
                context.email = sessionStorage.email
                context.loggedIn = true;
            }
            this.partial('./templates/about/about.hbs')
        });
    });

    this.get('#/login', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('./templates/login/loginPage.hbs')
        })
    })

    this.get('#/register', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'registerForm': './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs')
        })
    })

    this.get('#/logout', function (context) {
        sessionStorage.clear()
        context.redirect('#/home')
    })

    this.get('#/catalog', function (context) {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'team': './templates/catalog/team.hbs',
        }).then(function () {
            if (sessionStorage.hasOwnProperty('id')) {
                context.email = sessionStorage.email
                context.loggedIn = true;
            }
            if (!sessionStorage.hasOwnProperty('teamId')) {
                context.hasNoTeam = true
            }
            context.teams = [{name: 'First teams', comment: 'Some comeennta'},{name: 'Sec teams', comment: 'Someennta'} ]
            this.partial('./templates/catalog/teamCatalog.hbs',context)
        })
})


this.get('#/create', function (context) {
    this.loadPartials({
        'header': './templates/common/header.hbs',
        'footer': './templates/common/footer.hbs',
        'createForm': './templates/create/createForm.hbs',
    }).then(function () {
        if (sessionStorage.hasOwnProperty('id')) {
            context.email = sessionStorage.email
            context.loggedIn = true;
        }
        this.partial('./templates/create/createPage.hbs')
    })
})

//POST

this.post('#/register', function (context) {
    const { email, password, repeatPassword } = context.params
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            context.redirect('#/login')
        })
        .catch((error) => {
            console.log(error)
        });
})

this.post('#/login', function (context) {
    const { email, password } = context.params
    auth.signInWithEmailAndPassword(email, password)
        .then(({ user: { uid, email } }) => {
            sessionStorage.setItem('id', uid)
            sessionStorage.setItem('email', email)
            context.redirect('#/home')
        })
        .catch((error) => {
            console.log(error)
        });
})

this.post('#/create', function (context) {
    const { name, comment } = context.params
    db.collection('teams').add({
        name,
        comment
    }).then(function (docRef) {
        console.log(docRef.id);
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    context.redirect('#/catalog')
})
})
app.run('#/home')

function loadPartials(context) {
    return context.loadPartials({
        'header': './templates/common/header.hbs',
        'footer': './templates/common/footer.hbs'
    })
}
