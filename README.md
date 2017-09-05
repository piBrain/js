# welcome to js funland

## How To's

### Branching
- since this single git is responsible for several distinct packages, it is important to note the package being changed
  in the branch name, in addition to a description of the changes being made and the pivotal hash
- `${packageName}-${pivotalHash}-${description}`
- `aura-be-2039487-create-users`

### Committing Changes
- edit files normally
- use `git add` and `git commit` as usual

### Bumping Package Version
- first commit all changes as usual
- (optional) run `lerna updated` to see which packages have "un-released" changes (changes that have not yet been tagged with a version number
- then run `lerna publish` in repo root, bumping version appropriately for each package that has been changed since the last `lerna publish`
- `lerna publish -m "changes made"` can be used to label releases

### Installing Dependencies
- add dependencies to respective `package.json`s (whethe a local or npm-hosted dependency)
- run `lerna bootstrap` in repo root



## Dependencies

### [`yarn`](https://yarnpkg.com/lang/en/docs/install/)

### [`lerna`](https://github.com/lerna/lerna)
    `yarn global add lerna`
