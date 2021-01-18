export default async function(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/register/registerForm.hbs')
    }
    this.partial('./templates/register/registerPage.hbs')
}

export function registerPost(){
    const auth = firebase.auth()

    const { email, password, repeatPassword } = this.params
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            //addUserToDatabase(email,this.app.userData)
            this.redirect('#/login')
        })
        .catch((error) => {
            console.log(error)
        });
    
}

/*async function addUserToDatabase(userMail,infoUser){
    const obj = {email: userMail}
    await fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/users.json`,{
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(obj)
    }).then(res=>res.json())
        .then(data=>infoUser.userID = data.name)
        
}*/
