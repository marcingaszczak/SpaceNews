import React, { useState } from 'react';
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useSelector, useDispatch } from 'react-redux';



function Like(props) {
    const state = useSelector(state => state)
    let initialState = false
    if(props.likedBy !== undefined){
        props.likedBy.forEach(person => {
            if (state.username === person) {
                initialState = true
            }
        })
    }
    const [clicked, setClicked] = useState(initialState)
    const postId = props.id
    const dispatch = useDispatch();

    const postNamesArray = Object.keys(state.posts)
    let clickedPost = ''

    const handlePlusClick = () => {
        setClicked(true)
        postNamesArray.forEach(post => {
            if(post === postId) {
                clickedPost = post;
            } else return;;
        })
        const newLikes = state.posts[clickedPost].likes + 1;
        let likedBy = '';
        if(state.posts[clickedPost].likedBy === undefined) {
            likedBy = [state.username]
        } else {
            likedBy = [...state.posts[clickedPost].likedBy, state.username]
        }


        Object.keys(state.posts).map(post => {
            return {post: state.posts[post]}
        })
        fetch(`https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts/${clickedPost}.json`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: state.posts[clickedPost].author,
                content: state.posts[clickedPost].content,
                date: state.posts[clickedPost].date,
                likes: newLikes,
                likedBy: likedBy})
        })
        .then(response => response.json())
        .then(data => {
            const reduxLiked = state.posts;
            reduxLiked[clickedPost].likedBy = likedBy;
            reduxLiked[clickedPost].likes = newLikes
            dispatch({type: 'like', userInfo: reduxLiked})
        })
        .catch(err => console.log(err))
    }


    const handleMinusClick = () => {
        setClicked(false)
        postNamesArray.forEach(post => {
            if(post === postId) {
                clickedPost = post;
            };
        })
        const newLikes = state.posts[clickedPost].likes - 1;
        const remove = state.posts[clickedPost].likedBy;
        const index = state.posts[clickedPost].likedBy.indexOf(state.username)
        if(index > -1) {
            remove.splice(index, 1);
        }

        Object.keys(state.posts).map(post => {
            return {post: state.posts[post]}
        })
        fetch(`https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts/${clickedPost}.json`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: state.posts[clickedPost].author,
                content: state.posts[clickedPost].content,
                date: state.posts[clickedPost].date,
                likes: state.posts[clickedPost].likes,
                likedBy: remove})
        })
        .then(response => response.json())
        .then(data => {
            const reduxDisliked = state.posts;
            reduxDisliked[clickedPost].likedBy = remove;
            reduxDisliked[clickedPost].likes = newLikes
            dispatch({type: 'dislike', userInfo: reduxDisliked})
        })
        .catch(err => console.log(err))
    }


    //set variable for liked/not liked (change thumb color)



    return (
        <React.Fragment>
            {clicked ? (<Button startIcon={<ThumbUpIcon />} onClick={handleMinusClick}>
            {state.posts[postId].likes}
        </Button>) :
            (<Button color='secondary' startIcon={<ThumbUpIcon />} onClick={handlePlusClick}>
                {state.posts[postId].likes}
            </Button>)}
        </React.Fragment>

    )
}

export default Like


