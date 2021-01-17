export default async function(){

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs')
    }

    /*fetch(`https://team-manager-61be4-default-rtdb.firebaseio.com/teams/${this.params.id}.json`)
        .then(res=>res.json())
        .then(data=>{
            const requestedTeam = this.app.userData.teams.find(x=>x._id === this.params.id)
            this.name = data.name
            this.comment = data.comment
            this._id = this.params.id
            this.members = [{username: 'Pesho'}]
        })
    
    const dataObj = {
        _id: 2141241,
        name: 'youou',
        comment: 'nice comments',
        members: []
    }
    this.app.userData.isAuthor = true;*/
   // Object.assign(dataObj,this.app.userData)
    this.partial('./templates/catalog/details.hbs',this.app.userData)
}