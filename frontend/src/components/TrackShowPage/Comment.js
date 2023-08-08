import React from "react"
import { useDispatch } from "react-redux"
import { composeComment, editComment } from "../../store/comments"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function Comment({ comment, author, track }) {

    const dispatch = useDispatch()
    const { trackId } = useParams()
    // console.log("author")
    // console.log(author)
    // console.log('track')
    // console.log(track)

    const [editTheComment, setEditTheComment] = useState("")

    const [editCommentForm, setEditCommentForm] = useState(false)

    const handleSubmit = (e) => {
        // e.preventDefault()
        dispatch(editComment(comment._id, { description: editTheComment, author: author, track: track }))
    }

    return (
        comment.track._id === trackId ? (
            <li>
                <p>{comment.author.username}</p>
                <p>{comment.description}</p>
                {comment.author._id === author._id && !editCommentForm && (
                    <button onClick={() => {
                        setEditCommentForm(true)
                        setEditTheComment(comment.description)
                    }}>Edit Comment</button>
                )}
                {comment.author._id === author._id && editCommentForm && (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Edit Comment
                            <input
                                type="text"
                                value={editTheComment}
                                name="editComment"
                                onChange={(e) => { setEditTheComment(e.target.value) }}
                            />
                        </label>
                        <input type="submit" value={`Edit Comment`} />
                    </form>
                )}
            </li>
        ) : null
    )
}