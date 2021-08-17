export function getIssuesUrl() {
  return `/issues`;
}

export function getIssueUrl(id: string | number = ":id") {
  return `/issues/${id}`;
}
