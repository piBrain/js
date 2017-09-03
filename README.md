# welcome to js funland

## How Tos

### Committing Changes
- edit files normally
- use `git add` and `git commit` as usual

### Bumping Package Version
- first commit all changes as usual
- then run `lerna publish` in repo root, bumping version appropriately for each package that has been changed since the
  last `lerna publish`

### Installing Dependencies
- add dependencies to respective `package.json`s (whethe a local or npm-hosted dependency)
- run `lerna bootstrap` in repo root



## Dependencies

### [`yarn`](https://yarnpkg.com/lang/en/docs/install/)

### [`lerna`](https://github.com/lerna/lerna)
    `yarn global add lerna`
