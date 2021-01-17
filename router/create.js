export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createForm: await this.load('./templates/create/createForm.hbs'),
    }

    this.partial('./templates/create/createPage.hbs', this.app.userData)
}

export function createNewTeamReq() {
    const idToken = sessionStorage.getItem('id')
    if (!idToken) {
        throw new Error(`Not logged in`)
    } else {
        if (this.params.name.length === 0 || this.params.comment.length === 0) {
            const err = document.getElementById('errorBox')
            err.disabled = false;
            err.style.display = 'block';
            const test = document.createElement('span')
            test.innerText = `All fields are required!`
            err.appendChild(test)
            function hideError() {
                err.style.display = 'none'
                test.innerText = '';
            }
            setTimeout(hideError, 2000);
        } else {
            fetch('https://team-manager-61be4-default-rtdb.firebaseio.com/teams/.json', {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify({
                    name: this.params.name,
                    commment: this.params.comment
                })

            })
                .then(res => res.json())
                .then(data => {
                    someFnc(data)
                    //this.app.userData.teamId = data.name
                    this.app.userData.isAuthor = true;
                    this.app.userData.isOnTeam = true;
                    this.app.userData.hasTeam = true;
                    console.log(this.app.userData)
                    this.redirect(`#/catalog/${data.name}`)
                })
        }

    }
}

async function someFnc(data){
    const obj = {
        _id: data.name
    }
    await fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/teams/${data.name}.json`,{
        method: "PATCH",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(obj)
    }).then(res=>res.json()).then(data=>console.log(data))
}