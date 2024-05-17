# Enhanced Task Completed Checker
A GitHub action that checks if all tasks are completed in the pull requests.

## :arrow_forward: Usage

### Create a workflow
```yml
name: 'PR Tasks Completed Check'
on: 
  pull_request:
    types: [opened, edited]

jobs:
  task-check:
    runs-on: ubuntu-latest
    steps:
      - uses: miguelpragosa/enhanced-task-completed-checker@v0.0.1
```

### Check whether tasks are completed
Add a pull request template to your repository (`.github/pull_request_template.md`).

For example: 
```markdown
## Optional checks
<!-- ignore-task-list-start -->
- [ ] (Optional) I've checked foo
- [ ] (Optional) I've reviewed bar
<!-- ignore-task-list-end -->

## Issue Type
<!-- task-group-issuetype-start -->
- [x] Bug
- [ ] Document
- [ ] Enhancement
<!-- task-group-issuetype-end -->

## Checklist
- [x] I have read the [CONTRIBUTING.md]()
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no lint errors
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
```

Create a pull request that contained tasks list to your repository and will be started automatically a workflow to check whether tasks are completed.

Every time edit a description of a pull request will be started automatically a new workflow to check.

![Check whether tasks are completed](check_result.png)

You can check a list of completed tasks and uncompleted tasks at the Actions page.

![Check a list of completed/uncompleted tasks](actions_console.png)

### Ignore checks whether tasks are completed
Please surround the task list with `<!-- ignore-task-list-start -->` and `<!-- ignore-task-list-end -->` for ignoring checks whether tasks are completed.

```markdown
## Issue Type
<!-- ignore-task-list-start -->
- [ ] Bug
- [ ] Document
- [x] Enhancement
<!-- ignore-task-list-end -->

## Checklist
- [x] I have read the [CONTRIBUTING.md]()
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no lint errors
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
```

### Task groups
Please surround a given task list with `<!-- task-group-<taskname>-start -->` and `<!-- task-group-<taskname>-end -->` for grouping them and validating them using an "at least one" criteria.

```markdown
## Issue Type
<!-- task-group-issuetype-start -->
- [x] Bug
- [ ] Document
- [ ] Enhancement
<!-- task-group-issuetype-end -->
```

Please note that the value introduced at `<taskname>` will be shown as part of the report shown at the Actions page.

## :memo: Licence
MIT