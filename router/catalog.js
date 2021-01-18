export default async function () {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs'),
    }
    const idToken = sessionStorage.getItem('id')
    if (!idToken) {
        this.redirect('#/login')
        throw new Error(`Not logged in`)
    }else{
        await fetch('https://team-manager-61be4-default-rtdb.firebaseio.com/teams/.json')
        .then(res=>res.json())
        .then(data=>this.app.userData.teams = data)
    }
    console.log(this.app.userData)
    this.partial('./templates/catalog/teamCatalog.hbs', this.app.userData)
}