"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Pause, Play, Square } from "lucide-react"

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioURL, setAudioURL] = useState(null)
  const [error, setError] = useState(null)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const timerRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    // Set canvas size
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const visualize = () => {
    if (!analyserRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const analyser = analyserRef.current

    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.85
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = "#0f0f1a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create gradient for the bars
      const gradient = ctx.createLinearGradient(0, canvas.height / 2, 0, 0)
      gradient.addColorStop(0, "#10b981")
      gradient.addColorStop(0.5, "#34d399")
      gradient.addColorStop(1, "#6ee7b7")

      const barCount = 40
      const barWidth = 6
      const gap = 4
      const totalWidth = barCount * (barWidth + gap)
      const startX = (canvas.width - totalWidth) / 2

      for (let i = 0; i < barCount; i++) {
        const index = Math.floor((i / barCount) * bufferLength)
        const amplitude = dataArray[index] / 255
        const barHeight = amplitude * (canvas.height * 0.6)

        const x = startX + i * (barWidth + gap)
        const y = canvas.height / 2 - barHeight / 2

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, barHeight)

        // Add rounded caps
        ctx.beginPath()
        ctx.arc(x + barWidth / 2, y, barWidth / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x + barWidth / 2, y + barHeight, barWidth / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    draw()
  }

  const startRecording = async () => {
    try {
      setError(null)

      // Check if browser supports required APIs
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support audio recording")
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })
      streamRef.current = stream

      // Setup audio context and analyser
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 512
      analyserRef.current.smoothingTimeConstant = 0.8

      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      // Setup media recorder
      const options = { mimeType: "audio/webm" }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = "audio/mp4"
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = ""
        }
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorderRef.current.mimeType,
        })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
      }

      mediaRecorderRef.current.start(100)
      setIsRecording(true)
      setIsPaused(false)
      setRecordingTime(0)

      visualize()

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setError(
        err.message || "Could not access microphone. Please grant permission."
      )
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }

  const togglePause = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        setIsPaused(false)
        visualize()
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1)
        }, 1000)
      } else {
        mediaRecorderRef.current.pause()
        setIsPaused(true)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-purple-500/20 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-center text-4xl font-bold text-transparent text-white">
            Audio Recorder
          </h1>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-red-200">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4">
            <canvas ref={canvasRef} className="h-48 w-full rounded-lg" />
          </div>

          <div className="mb-8 text-center">
            <div className="mb-2 font-mono text-5xl text-purple-300">
              {formatTime(recordingTime)}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${isRecording && !isPaused ? "animate-pulse bg-red-500" : "bg-gray-600"}`}
              />
              <span className="text-sm text-gray-400">
                {isRecording ? (isPaused ? "Paused" : "Recording") : "Ready"}
              </span>
            </div>
          </div>

          <div className="mb-8 flex justify-center gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex transform items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-purple-700 hover:to-pink-700"
              >
                <Mic size={24} />
                Start Recording
              </button>
            ) : (
              <>
                <button
                  onClick={togglePause}
                  className="flex transform items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-orange-600 hover:to-yellow-600"
                >
                  {isPaused ? <Play size={24} /> : <Pause size={24} />}
                  {isPaused ? "Resume" : "Pause"}
                </button>

                <button
                  onClick={stopRecording}
                  className="flex transform items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-red-600 hover:to-rose-600"
                >
                  <Square size={24} />
                  Stop
                </button>
              </>
            )}
          </div>

          {audioURL && (
            <div className="rounded-xl border border-purple-500/30 bg-slate-900/60 p-6">
              <h3 className="mb-3 font-semibold text-white">Your Recording:</h3>
              <audio src={audioURL} controls className="mb-4 w-full" />
              <a
                href={audioURL}
                download="recording.webm"
                className="inline-block transform rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2 font-semibold text-white transition-all hover:scale-105 hover:from-green-600 hover:to-emerald-600"
              >
                Download Recording
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
