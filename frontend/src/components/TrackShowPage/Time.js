import React from "react"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { deleteTime } from "../../store/times"

export default function Time({ time, currUser }) {
    const dispatch = useDispatch()
    const { trackId } = useParams()
    console.log(time.track._id)
    console.log(trackId)
    function handleSubmit(e) {
        dispatch(deleteTime(time._id))
    }

    return (
        time.track._id === trackId ? (
            <div>
                <p>{time.author.username}</p>
                <p>{time.hours}:{time.minutes}:{time.seconds}</p>
                {time.author._id === currUser._id ? (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="submit" value={`Remove Time`} />
                    </form>
                ) : null}
            </div>
        ) : null
    )

}