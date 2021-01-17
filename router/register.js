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
            addUserToDatabase(email)
            this.redirect('#/login')
        })
        .catch((error) => {
            console.log(error)
        });
    
}

async function addUserToDatabase(userMail){
    const obj = {email: userMail}
    await fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/teams/users.json`,{
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(obj)
    }).then(res=>res.json())
        
}