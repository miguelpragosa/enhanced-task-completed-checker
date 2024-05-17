import * as core from '@actions/core'
import * as github from '@actions/github'
import {removeIgnoreTaskLitsText, validateTaskList} from './utils'

async function run(): Promise<void> {
  try {
    const body = github.context.payload.pull_request?.body

    if (!body) {
      core.info('No tasks to check. Skipping the process.')
      return
    }

    const result = removeIgnoreTaskLitsText(body)
    core.debug(`result: ${result}`)

    const [isTaskCompleted, text] = validateTaskList(result)
    core.debug(`isTaskCompleted: ${isTaskCompleted}`)
    core.debug(`text: ${text}`)

    if (text) core.summary.addRaw(text).write()
    if (!isTaskCompleted) core.setFailed('Some tasks are incomplete!')
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
