export default async function () {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs')
    }
    const dataObj = {}
    await fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/teams/${this.params.id}.json`)
            .then(res=>res.json())
            .then(data=>{
                Object.assign(dataObj,data)
            })
    dataObj.members = []
    Object.assign(dataObj,this.app.userData)
    if(this.params.id!==this.app.userData.teamID){
        dataObj.isAuthor = false;
        dataObj.isOnTeam = false;
    }else{
        dataObj.isAuthor = true;
        dataObj.isOnTeam = true;
    }
    this.partial('./templates/catalog/details.hbs', dataObj)
}
