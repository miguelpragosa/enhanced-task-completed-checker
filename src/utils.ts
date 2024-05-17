export function removeIgnoreTaskLitsText(text: string): string {
  return text.replace(
    /<!-- ignore-task-list-start -->[\s| ]*(- \[[x| ]\] .+[\s| ]*)+<!-- ignore-task-list-end -->/g,
    ''
  )
}

export function validateTaskList(body: string): [boolean, string] {
  let text = ''

  // Grouped checks
  const regexString =
    '<!-- task-group-(?<groupId>\\S+?)-start -->(?<checks>[\\S\\s]*?)<!-- task-group\\S+?-end -->'
  const regex = new RegExp(regexString, 'gm')

  let matches
  while ((matches = regex.exec(body))) {
    const groupId = matches.groups?.groupId
    const checks = matches.groups?.checks

    if (groupId && checks) {
      const completedTasks = checks.match(/(- \[[x]\].+)/g)
      // Add some statically defined actions to the body, so that they'll be processed by the logic below
      body += `\n- [${completedTasks ? 'x' : ' '}] Group "${groupId}"`
    }
  }

  // Cleanup for the next steps
  body = body.replace(
    /<!-- task-group-\S+?-start -->([\S\s]*?)<!-- task-group-\S+?-end -->/gm,
    ''
  )

  // Ungrouped checks
  const completedTasks = body.match(/(- \[[x]\].+)/g)
  const uncompletedTasks = body.match(/(- \[[ ]\].+)/g)

  if (completedTasks !== null) {
    for (let index = 0; index < completedTasks.length; index++) {
      if (index === 0) {
        text += '## :white_check_mark: Completed Tasks\n'
      }
      text += `${completedTasks[index]}\n`
    }
  }

  if (uncompletedTasks !== null) {
    for (let index = 0; index < uncompletedTasks.length; index++) {
      if (index === 0) {
        text += '## :x: Uncompleted Tasks\n'
      }
      text += `${uncompletedTasks[index]}\n`
    }
  }

  return [uncompletedTasks === null, text]
}
