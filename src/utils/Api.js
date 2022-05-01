import { config } from "./config";

class Api {
    constructor({url, token}){
        this._url = url;
        this._token = token;
    }

    getPosts(itemID){
        const requestURL = itemID? `${this._url}/posts/${itemID}` : `${this._url}/posts`;
        return fetch(requestURL, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(res => res.json())
        .catch(err => alert(err.message));

    }

    addPost(post){
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(post),
        }).then(res => res.json())
        .catch(err => alert(err.message));

    }

    getMyInfo(){
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(res => res.json())
        .catch(err => alert(err.message));

    }

    getInfoAuthorComment(Id){
        return fetch(`${this._url}/users/${Id}`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(res => res.json())
        .catch(err => alert(err.message));


    }

    addLike(itemID){
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(res => res.json())
        .catch(err => alert(err.message));

    }

    deleteLike(itemID){
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(res => res.json())
        .catch(err => alert(err.message));

    }

    deletePost(itemID){
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(res => res.json())
        .catch(err =>alert(err.message));

    }

}

export default new Api(config);