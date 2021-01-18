export default async function () {
    this.app.userData.isAuthor = false;
    this.app.userData.isOnTeam = false;
    this.app.userData.hasTeam = false;
    this.app.userData.teamID = '';
    updateUserTeamInfo(this.app.userData)
    this.redirect('#/catalog')
}

async function updateUserTeamInfo(userInfo){
    const obj = {
        teamID: '',
    }
    await fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/users/${userInfo.userID}.json`,{
        method: "PATCH",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(obj)
    }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err))
}