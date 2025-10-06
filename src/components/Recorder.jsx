"use client"

import { useRef, useState } from "react"

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [time, setTime] = useState(0)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const startTimeRef = useRef(null)

  // Start recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    // Set up MediaRecorder
    mediaRecorderRef.current = new MediaRecorder(stream)
    audioChunksRef.current = []

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data)
    }

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)

      // send to backend
      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.webm")

      fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(data => console.log("Server response:", data))
    }

    mediaRecorderRef.current.start()
    setIsRecording(true)

    // Start timer
    startTimeRef.current = Date.now()
    updateTimer()

    // Start visualization
    setupVisualizer(stream)
  }

  // Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setIsRecording(false)

    cancelAnimationFrame(animationRef.current)
  }

  // Timer updater
  const updateTimer = () => {
    setTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    if (isRecording) {
      setTimeout(updateTimer, 1000)
    }
  }

  // Audio visualizer
  const setupVisualizer = stream => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()

    source.connect(analyser)
    analyser.fftSize = 256

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = "red"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i]
        ctx.fillStyle = "gold"
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
        x += barWidth + 1
      }
    }

    draw()
  }

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={startRecording} disabled={isRecording}>
        🎙 Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        ⏹ Stop Recording
      </button>

      <p>⏱ Time: {time}s</p>

      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        style={{ border: "1px solid #ccc", marginTop: "1rem" }}
      ></canvas>

      {audioUrl && (
        <div>
          <h4>Playback:</h4>
          <audio src={audioUrl} controls />
        </div>
      )}
    </div>
  )
}

export default AudioRecorder
