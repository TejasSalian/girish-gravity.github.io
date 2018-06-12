var _gLocalUrl = "service/";


function User() {
    this.userid = 0;
    this.email = "";
    this.password = "";
    this.firstname = "";
    this.lastname = "";
    this.organization = "";
    this.image = "";
    this.phone = "";
    this.refcode = "";
}

function StartProject() {
    this.isfileuploaded = false;
    this.questions = new Array();
    this.foldercount = 0;
    this.projectid = 0;
    this.projectname = "";
}

function ProjectQuestions() {
    this.id = 0;
    this.answer = "";
}

function ProjectDetail() {
    var projectid = 0;
    var projectstage = 1;
    var versionid = 0;
    var stage = 1;
    var comments = "";
    var releasenote = "";
    var image = "";
    var deliverydate = "";
    var releasedate = "";
    var userid = 0;
}


function FileDetail()
{
    this.pCount = 0;
    this.FolderName = "";
    this.FileName = "";
}