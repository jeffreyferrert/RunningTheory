import React from "react"
import { useDispatch } from "react-redux"
import { composeComment, editComment, deleteComment } from "../../store/comments"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function Comment({ comment, author, track }) {

    const dispatch = useDispatch()
    const { trackId } = useParams()

    const [editTheComment, setEditTheComment] = useState("")

    const [editCommentForm, setEditCommentForm] = useState(false)

    const handleSubmit = (e, type) => {
        if(type === "edit"){
            dispatch(editComment(comment._id, { description: editTheComment, author: author, track: track }))
        } else {
            dispatch(deleteComment(comment._id))
        }
    }

    return (
        comment.track._id === trackId ? (
            <li>
                <p>{comment.author.username}</p>
                <p>{comment.description}</p>
                {comment.author._id === author._id && !editCommentForm && (
                    <>
                        <button onClick={() => {
                            setEditCommentForm(true)
                            setEditTheComment(comment.description)
                        }}>Edit Comment</button>
                        <form onSubmit={(e) => handleSubmit(e, "delete")}>
                            <input type="submit" value={`Remove Comment`} />
                        </form>
                    </>
                )}
                {comment.author._id === author._id && editCommentForm && (
                    <form onSubmit={(e) => handleSubmit(e, "edit")}>
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