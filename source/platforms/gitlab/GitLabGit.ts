import { debug } from "../../debug"
import { GitLabDSL } from "../../dsl/GitLabDSL"
import { GitJSONDSL, GitDSL } from "../../dsl/GitDSL"
import { GitJSONToGitDSLConfig, gitJSONToGitDSL, GitStructuredDiff } from "../git/gitJSONToGitDSL"
const d = debug("GitLabGit")

export const gitLabGitDSL = (gitlab: GitLabDSL, json: GitJSONDSL): GitDSL => {
  const config: GitJSONToGitDSLConfig = {
    repo: `${gitlab.mr.project_id}`, // we don't get the repo slug, but `project_id` is equivalent in API calls
    baseSHA: gitlab.mr.diff_refs.base_sha,
    headSHA: gitlab.mr.diff_refs.head_sha,

    // TODO: implement me when the API methods are in
    getFileContents: async (): Promise<string> => {
      return ""
    },
    // TODO: implement me when the API methods are in
    getFullDiff: async (): Promise<string> => {
      return ""
    },
    // TODO: implement me when the API methods are in
    getStructuredDiffForFile: async (): Promise<GitStructuredDiff> => Promise.resolve([]),
  }

  d("Setting up git DSL with: ", config)
  return gitJSONToGitDSL(json, config)
}
