import { avatar } from "../utils/constants";

export default class UserInfo{
    constructor({ nameSelector, descriptionSelector, avatarSelector }){
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return {
            name: this._name.textContent,
            description: this._description.textContent,
        };
    }

    setAvatar(avatarInfo){
        this._avatar.src = avatarInfo.avatarLink;
    }

    setUserInfo(userInfo){
        this._name.textContent = userInfo.name;
        this._description.textContent = userInfo.description;
    }
}