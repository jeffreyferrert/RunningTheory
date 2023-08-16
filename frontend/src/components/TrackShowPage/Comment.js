import React from "react"
import { useDispatch } from "react-redux"
import { editComment, deleteComment, fetchComments } from "../../store/comments"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function Comment({ comment, author, track }) {

    const dispatch = useDispatch()
    const { trackId } = useParams()

    const [editTheComment, setEditTheComment] = useState("")

    const [editCommentForm, setEditCommentForm] = useState(false)

    const handleSubmit = (e, type) => {
        e.preventDefault()
        if(type === "edit"){
            dispatch(editComment(comment._id, { description: editTheComment, author: author, track: track }))
            dispatch(fetchComments());
            setEditCommentForm(false)
        } else {
            dispatch(deleteComment(comment._id))
            setTimeout(() => {
                dispatch(fetchComments());
            }, 100);
        }
    }

    return (
        comment.track._id === trackId ? (
            <li className="comment-author-list">
                <div className="comment-container">
                    <p className="comment-author">@{comment.author.username}</p>
                    <p>{comment.description}</p>

                </div>
                {comment.author._id === author._id && !editCommentForm && (
                    <div className="comments-btn-container">

                        <button className="comment-btns" onClick={() => {
                            setEditCommentForm(true)
                            setEditTheComment(comment.description)
                        }}>Edit Comment</button>
                        <form onSubmit={(e) => handleSubmit(e, "delete")}>
                            <input className="comment-btns" type="submit" value={`Remove Comment`} />
                        </form>
                    </div>
                )}
                {comment.author._id === author._id && editCommentForm && (
                    <form onSubmit={(e) => handleSubmit(e, "edit")}>
                        <label>
                            <input
                            
                                type="text"
                                value={editTheComment}
                                name="editComment"
                                onChange={(e) => { setEditTheComment(e.target.value) }}
                            />
                        </label>
                        <input className="comment-btns" type="submit" value={`Edit Comment`} />
                    </form>
                )}
            </li>
        ) : null
    )
}