import { config } from "./config";

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }

    getPosts(itemID) {
        const requestURL = itemID ? `${this._url}/posts/${itemID}` : `${this._url}/posts`;
        return fetch(requestURL, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(res => res.json())
            .catch(err => alert(err.message));

    }

    addPost(post) {
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

    editPost(post, itemID) {
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .catch(err => alert(err.message));
    }

    addComment(Id, comment) {
        return fetch(`${this._url}/posts/comments/${Id}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        }).then(res => res.json())
            .catch(err => alert(err.message));

    }

    delComment(postId, commentId) {
        return fetch(`${this._url}/posts/comments/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },

        }).then(res => res.json())
            .catch(err => alert(err.message));

    }

    getMyInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        }).then(res => res.json())
            .catch(err => alert(err.message));

    }

    changeProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            }),
        }).then(res => res.json())
            .catch(err => alert(err.message));
    }


    changeAvatar(avatar){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                avatar: `${avatar}`,
                }),
        }).then(res => res.json())
        .catch(err => alert(err.message));
    }

    getComment(id) {

        return fetch(`${this._url}/posts/comments/${id}`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        }).then(res => res.json())
            .catch(err => alert(err.message));


    }

    addLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        })
            .then(res => res.json())
            .catch(err => alert(err.message));

    }

    deleteLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        })
            .then(res => res.json())
            .catch(err => alert(err.message));

    }

    deletePost(itemID) {
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        }).then(res => res.json())
            .catch(err => alert(err.message));

    }
    signUp(userData) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(onResponce);
    }

    signIn(userData) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(onResponce);
    }

}

export default Api;