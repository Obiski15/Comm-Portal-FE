"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Mic, Pause, Play, RotateCcw, Square } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { useFormField } from "../ui/form"

export default function RecordAssignment() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recordingTime, setRecordingTime] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const { setValue } = useFormField()

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

  const visualize = useCallback(() => {
    const analyser = analyserRef.current
    const canvas = canvasRef.current

    if (!analyser || !canvas) return

    const ctx = canvas.getContext("2d")

    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.85
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx!.fillStyle = document.documentElement.classList.contains("dark")
        ? "#242C3B"
        : "#000000"
      ctx?.fillRect(0, 0, canvas.width, canvas.height)

      // Create gradient for the bars
      const gradient = ctx!.createLinearGradient(0, canvas.height / 2, 0, 0)
      gradient.addColorStop(0, "#10b981")
      gradient.addColorStop(0.5, "#34d399")
      gradient.addColorStop(1, "#6ee7b7")

      const barCount = 20
      const barWidth = 3
      const gap = 2
      const totalWidth = barCount * (barWidth + gap)
      const startX = (canvas.width - totalWidth) / 2

      for (let i = 0; i < barCount; i++) {
        const index = Math.floor((i / barCount) * bufferLength)
        const amplitude = dataArray[index] / 255
        const barHeight = amplitude * (canvas.height * 0.6)

        const x = startX + i * (barWidth + gap)
        const y = canvas.height / 2 - barHeight / 2

        ctx!.fillStyle = gradient
        ctx?.fillRect(x, y, barWidth, barHeight)

        // Add rounded caps
        ctx?.beginPath()
        ctx?.arc(x + barWidth / 2, y, barWidth / 2, 0, Math.PI * 2)
        ctx?.fill()
        ctx?.beginPath()
        ctx?.arc(x + barWidth / 2, y + barHeight, barWidth / 2, 0, Math.PI * 2)
        ctx?.fill()
      }
    }

    draw()
  }, [])

  const startRecording = useCallback(async () => {
    try {
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
      const AudioContextClass = window.AudioContext
      audioContextRef.current = new AudioContextClass()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 512
      analyserRef.current.smoothingTimeConstant = 0.8

      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      // Setup media recorder
      const options: MediaRecorderOptions = { mimeType: "audio/webm" }
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        options.mimeType = "audio/mp4"
        if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
          options.mimeType = undefined
        }
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorderRef.current?.mimeType,
        })

        setValue("audio", audioBlob)
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
      toast.error(
        (err as unknown as Error).message ||
          "Could not access microphone. Please grant permission."
      )
    }
  }, [])

  const stopRecording = useCallback(() => {
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
  }, [isRecording])

  const restartRecording = useCallback(() => {
    // Stop current recording
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
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

    // Reset state
    setIsRecording(false)
    setIsPaused(false)
    setRecordingTime(0)
    audioChunksRef.current = []

    // Start new recording
    setTimeout(() => {
      startRecording()
    }, 100)
  }, [isRecording])

  const togglePause = useCallback(() => {
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
  }, [isPaused, isRecording])

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white/5 p-6">
      <div className="text-center">
        <p className="font-medium text-white/90">
          {isPaused
            ? "Paused"
            : isRecording
              ? "Recording in progress"
              : "Ready"}
        </p>
        <p className="text-4xl font-bold text-white">
          {formatTime(recordingTime)}
        </p>
      </div>

      <div>
        <canvas ref={canvasRef} className="h-20 rounded-lg" />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePause}
          disabled={!isRecording}
          className={cn(
            "rounded-full bg-primary/20 p-4 text-primary transition-colors hover:bg-primary/30 disabled:pointer-events-none",
            !isRecording && "opacity-50"
          )}
        >
          {!isPaused ? <Pause /> : <Play />}
        </button>

        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-background shadow-lg shadow-primary/30 transition-transform hover:scale-105 disabled:pointer-events-none"
        >
          {isRecording ? <Square /> : <Mic />}
        </button>

        <button
          type="button"
          disabled={!isRecording}
          onClick={restartRecording}
          className={cn(
            "rounded-full bg-primary/20 p-4 text-primary transition-colors hover:bg-primary/30 disabled:pointer-events-none",
            !isRecording && "opacity-50"
          )}
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  )
}
