export default async function(){ 
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm:  await this.load('./templates/login/loginForm.hbs')
    }

    this.partial('./templates/login/loginPage.hbs')
}

export async function loginPost(){
    const auth = firebase.auth()
    const { email, password } = this.params
    await (auth.signInWithEmailAndPassword(email, password)
        .then(({ user: { uid, email } }) => {
            this.app.userData.email = this.params.email
            this.app.userData.loggedIn = true;
            sessionStorage.setItem('id', uid)
            sessionStorage.setItem('email', email)
            assignUserID(this.app.userData)
            this.redirect('#/home')
        })
        .catch((error) => {
            console.log(error)
        }));
}

async function assignUserID(infoUser){
    await fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/users.json`)
        .then(res=>res.json())
        .then(data=>{
            const emailArr = Object.entries(data)
            const neededUser = emailArr.find(x=>x[1].email===infoUser.email)
            infoUser.userID = neededUser[0]
        })
}