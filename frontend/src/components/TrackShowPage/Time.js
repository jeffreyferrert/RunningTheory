import React from "react"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { deleteTime } from "../../store/times"
import './Time.css'

export default function Time({ time, currUser }) {
    const dispatch = useDispatch()
    const { trackId } = useParams()
    // console.log(time.track._id)
    // console.log(trackId)
    function handleSubmit(e) {
        dispatch(deleteTime(time._id))
    }

    return (
        time.track._id === trackId ? (
            <div className="single-time-container">
                <p>{time.author.username}</p>
                <p className="track-time">
                    {time.hours < 10 ? "0" + time.hours : time.hours}:
                    {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
                    {time.seconds < 10 ? "0" + time.seconds : time.seconds}
                </p>
                {time.author._id === currUser._id ? (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input id="delete-time-btn"
                        type="submit" value={`Remove Time`} />
                    </form>
                ) : null}
            </div>
        ) : (
            <div className="single-time-container">
                <p>{time.track.name}</p>
                <p className="track-time">
                    {time.hours < 10 ? "0" + time.hours : time.hours}:
                    {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
                    {time.seconds < 10 ? "0" + time.seconds : time.seconds}
                </p>
                {time.author._id === currUser._id ? (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input id="delete-time-btn"
                        type="submit" value={`Remove Time`} />
                    </form>
                ) : null}
            </div>
        )
    )

}