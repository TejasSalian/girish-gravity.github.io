
function UserService() {
    this.service = "UserService";
}

UserService.prototype = new WebService();

UserService.prototype.IsEmailExists = function (PostData, callback, async) {
    var request = new RequestHeader("IsEmailExists", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.AuthenticateUser = function (PostData, callback, async) {
    var request = new RequestHeader("AuthenticateUser", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.CreateProfile = function (PostData, callback, async) {
    var request = new RequestHeader("CreateProfile", PostData, callback);
    return this.PostRequest(request, async);
}
UserService.prototype.InviteCollabrator = function (PostData, callback, async) {
    var request = new RequestHeader("InviteCollabrator", PostData, callback);
    return this.PostRequest(request, async);
}
UserService.prototype.ApproveUser = function (PostData, callback, async) {
    var request = new RequestHeader("ApproveUser", PostData, callback);
    return this.PostRequest(request, async);
}
UserService.prototype.DeleteUser = function (PostData, callback, async) {
    var request = new RequestHeader("DeleteUser", PostData, callback);
    return this.PostRequest(request, async);
}
UserService.prototype.ForgotPassword = function (PostData, callback, async) {
    var request = new RequestHeader("ForgotPassword", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.ChangePassword = function (PostData, callback, async) {
    var request = new RequestHeader("ChangePassword", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetProjectList = function (PostData, callback, async) {
    var request = new RequestHeader("GetProjectList", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.CreateProject = function (PostData, callback, async) {
    var request = new RequestHeader("createProject", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetProjectDetails = function (PostData, callback, async) {
    var request = new RequestHeader("GetProjectDetails", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetProjectTemplates = function (PostData, callback, async) {
    var request = new RequestHeader("GetProjectTemplates", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetNotificationCount = function (PostData, callback, async) {
    var request = new RequestHeader("GetNotificationCount", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetNotification = function (PostData, callback, async) {
    var request = new RequestHeader("GetNotification", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetLatestVersion = function (PostData, callback, async) {
    var request = new RequestHeader("GetLatestVersion", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetPreviousVersion = function (PostData, callback, async) {
    var request = new RequestHeader("GetPreviousVersion", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.UpdateComment = function (PostData, callback, async) {
    var request = new RequestHeader("UpdateComment", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.CreateNewVersion = function (PostData, callback, async) {
    var request = new RequestHeader("CreateNewVersion", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.CreateProjectStage = function (PostData, callback, async) {
    var request = new RequestHeader("CreateProjectStage", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.ChangeProjectStage = function (PostData, callback, async) {
    var request = new RequestHeader("ChangeProjectStage", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.ApproveProject = function (PostData, callback, async) {
    var request = new RequestHeader("ApproveProject", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.SetProjectDate = function (PostData, callback, async) {
    var request = new RequestHeader("SetProjectDate", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.IsEmailExists = function (PostData, callback, async) {
    var request = new RequestHeader("IsEmailExists", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.IsOrgExists = function (PostData, callback, async) {
    var request = new RequestHeader("IsOrgExists", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.DeleteFile = function (PostData, callback, async) {
    var request = new RequestHeader("DeleteFile", PostData, callback);
    return this.PostRequest(request, async);
}


var _gUserService = new UserService(); 