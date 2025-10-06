import {
  IAssignment,
  IAssignments,
  ICreateAssignment,
  IEditAssignment,
  IGradeAssignment,
  ISubmitAssignment,
} from "@/types"

import BaseService from "./base.service"

export default class AssignmentService extends BaseService {
  constructor() {
    super("assignment")
  }

  async createAssignment(data: ICreateAssignment) {
    const formdata = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).map(file => {
          formdata.append("attachment", file)
        })
      }

      formdata.append(key, String(value))
    })

    return await this.post("/", formdata, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    })
  }

  async submitAssignment(data: ISubmitAssignment) {
    const formdata = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).map(file => {
          formdata.append("image", file)
        })
      }

      formdata.append(key, String(value))
    })

    return await this.post(`/submit/${data.assignmentId}`, formdata, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    })
  }

  async gradeAssignment({ assignmentId, grade }: IGradeAssignment) {
    return await this.post<Omit<IGradeAssignment, "assignmentId">, IAssignment>(
      `/grade/${assignmentId}`,
      { grade }
    )
  }

  async editAssignment({ assignmentId }: IEditAssignment) {
    return await this.post<unknown, IAssignment>(`/grade/${assignmentId}`)
  }

  async getAssignments() {
    return await this.get<IAssignments>(`/`)
  }

  async getAssignment(assignmentId: string) {
    return await this.get<IAssignment>(`/${assignmentId}`)
  }

  async deleteAssignment(assignmentId: string) {
    return await this.delete(`/${assignmentId}`)
  }
}
