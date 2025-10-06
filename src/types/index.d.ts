type BaseResponse<T> = {
  data: T
}

export interface IError {
  error: {
    message?: string
    status?: string
    stack?: unknown
  }
  statusCode: number
}

export type UserRole = "student" | "teacher" | "parent" | "admin"

// auth
export interface ILogin {
  email: string
  password: string
}

export interface ISignup {
  email: string
  password: string
  confirm_password: string
  role: UserRole
}

// user
export interface User {
  _id: string
  email: string
  name: string
  class?: string
  parentsOf?: [string]
  childOf?: string
  image: string
  role: UserRole
}

export type IUser = BaseResponse<{ user: User | null }>

// spitch
interface ITranslateRequest {
  source: string
  target: string
  text: string
}

interface ITranscribeRequest {
  language: string
  audio: ArrayBuffer
}

interface ITTSRequest {
  text: string
  language: string
}

type ITranslateResponse = BaseResponse<{ text: string }>
type ITranscribeResponse = BaseResponse<{ text: string }>
type ITTSResponse = BaseResponse<{ base64: string }>

// Assignments
type Ass = {
  attachments: FileList
  title: string
  description: string
  dueDate: number
}

export type IAssignments = BaseResponse<{
  assignments: {
    subject: string
    _id: string
    title: string
    description: string
    dueDate: number
    attachments?: {
      url: string
      fileName: string
    }[]
    submissions: {
      student: string
      content: string
      images: string[]
      grade: number
      submittedAt: number
      status: string
    }[]
    class: string
  }[]
}>

export type IAssignment = BaseResponse<{
  assignment: {
    subject: string
    _id: string
    title: string
    description: string
    attachments?: {
      url: string
      fileName: string
    }[]
    dueDate: number
    submissions: {
      student: string
      content: string
      images: string[]
      grade: number
      feedback: string
      submittedAt: number
      status: string
    }[]
    class: string
  }[]
}>
export interface IGradeAssignment {
  assignmentId: string
  grade: number
}
export interface ICreateAssignment {
  title: string
  description: string
  attachment: File
}
export interface ISubmitAssignment {
  content: string
  assignmentId: string
}
export interface IEditAssignment {
  assignmentId: string
}

// messages
export type MessageId = `class-${string}` | `user-${string}`
export interface Message {
  _id: string
  recipient?: { _id: string; name: string }
  class?: { _id: string; name: string }
  sender?: string
  content?: string
  images?: string[]
  createdAt?: Date
}

export type ISendMessage =
  | { content: string; images?: FileList }
  | { content?: string; images: FileList }

export type IChats = BaseResponse<{ chats?: User[] }>
export type IMessages = BaseResponse<{
  messages?: Message[]
  recipientInfo: { _id: string; name: string; image: string }
}>
export type IRecipientsToChat = BaseResponse<{ recipients: User[] }>
