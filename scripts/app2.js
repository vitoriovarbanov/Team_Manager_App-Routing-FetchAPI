import home from '../router/home.js'
import about from '../router/about.js'
import login, { loginPost } from '../router/login.js'
import register, { registerPost } from '../router/register.js'
import catalog from '../router/catalog.js'
import details from '../router/details.js'
import create, { createNewTeamReq} from '../router/create.js'
import edit from '../router/edit.js'
import logout from '../router/logout.js'


window.addEventListener('load', function () {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.userData = {
            loggedIn: false,
            hasNoTeam: false,
            userID: 0
           // teams: []
        }

        this.get('#/home', home)
        this.get('/', home)
        this.get('index.html', home)

        this.get('#/about', about)

        this.get('#/login', login)

        this.get('#/register', register)

        this.get('#/catalog', catalog)

        this.get('#/catalog/:id', details)

        this.get('#/create', create)

        this.get('#/edit/:teamId', edit)

        this.get('#/logout', logout)

        this.post('#/register', (context) => {registerPost.call(context)})
        this.post('#/login', (context) => {loginPost.call(context)})
        this.post('#/create', (context) => {createNewTeamReq.call(context)})
    })

    app.run()
})
























/*(function routerRender() {
    const root = document.getElementById('main')
    const uri = 'home'
    Promise.all([
        importTemplate(`../templates/${uri}/${uri}.hbs`),
        importTemplate(`../templates/common/header.hbs`),
        importTemplate(`../templates/common/footer.hbs`)
    ]).then(data=>{
        Handlebars.registerPartial('header',data[1])
        const
        root.innerHTML = data[1]
        root.innerHTML += data[0]
        root.innerHTML += data[2]
    })
    /*fetch(`../templates/${uri}/${uri}.hbs`)
        .then(res => res.text())
        .then(templateRes => {
            root.innerHTML = templateRes
        })
})()

function importTemplate(templateLocation) {
    return fetch(templateLocation).then(res => res.text())
}

const divMain = document.getElementById('main')
document.querySelectorAll('a').forEach(el => {
    el.addEventListener('click', navigateFn)
})*/

/*window.addEventListener('popstate', function (e) {
    console.log(e.state)
});*/


/*function navigateFn(e) {
    e.preventDefault()
    const data = e.target.getAttribute('href')
    history.pushState({}, '', data)
    routerRender(router[data])
    /*const p = document.createElement('p');
    p.innerText = router[data]
    divMain.appendChild(p)
}*/