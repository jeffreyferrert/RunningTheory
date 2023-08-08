import React from "react"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function Time({ time }) {
    const dispatch = useDispatch()

    return(
        <div>
            <p>{time.author.username}</p>
            <p>{time.hours}:{time.minutes}:{time.seconds}</p>
        </div>
    )

}