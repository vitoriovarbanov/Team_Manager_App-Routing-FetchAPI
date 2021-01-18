export default async function(){
    sessionStorage.clear()
    this.app.userData.hasTeam = false;
    this.app.userData.loggedIn = false;
    this.redirect('#/home')
}