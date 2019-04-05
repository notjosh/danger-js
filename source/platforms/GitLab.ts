import GitLabAPI from "./gitlab/GitLabAPI"
import { Platform, Comment } from "./platform"
import { readFileSync } from "fs"
import { GitDSL } from "../dsl/GitDSL"

class GitLab implements Platform {
  public readonly name: string

  constructor(public readonly api: GitLabAPI) {
    this.name = "GitLab"
  }

  async getReviewInfo(): Promise<any> {
    return {}
  }

  async getPlatformReviewDSLRepresentation(): Promise<any> {
    return {}
  }

  async getPlatformGitRepresentation(): Promise<GitDSL> {
    return {
      modified_files: [],
      created_files: [],
      deleted_files: [],
      diffForFile: async () => ({ before: "", after: "", diff: "", added: "", removed: "" }),
      structuredDiffForFile: async () => ({ chunks: [] }),
      JSONDiffForFile: async () => ({} as any),
      JSONPatchForFile: async () => ({} as any),
      commits: [
        {
          sha: "123",
          author: { name: "1", email: "1", date: "1" },
          committer: { name: "1", email: "1", date: "1" },
          message: "456",
          tree: { sha: "123", url: "123" },
          url: "123",
        },
      ],
      linesOfCode: async () => 0,
    }
  }

  async getInlineComments(_: string): Promise<Comment[]> {
    return []
  }

  supportsCommenting() {
    return true
  }

  supportsInlineComments() {
    return true
  }

  async updateOrCreateComment(_dangerID: string, _newComment: string): Promise<string> {
    return "https://gitlab.com/group/project/merge_requests/154#note_132143425"
  }

  async createComment(_comment: string): Promise<any> {
    return true
  }

  async createInlineComment(_git: GitDSL, _comment: string, _path: string, _line: number): Promise<any> {
    return true
  }

  async updateInlineComment(_comment: string, _commentId: string): Promise<any> {
    return true
  }

  async deleteInlineComment(_id: string): Promise<boolean> {
    return true
  }

  async deleteMainComment(): Promise<boolean> {
    return true
  }

  async updateStatus(): Promise<boolean> {
    return true
  }

  getFileContents = (path: string) => new Promise<string>(res => res(readFileSync(path, "utf8")))
}

export default GitLab
