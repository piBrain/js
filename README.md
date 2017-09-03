# welcome to js funland

## How Tos

### Committing Changes (to a particular package)
- edit files normally but
- DO NOT `git commit` changes made in `packages/**/*`
- DO `git add` the changes you would like to commit to a particular package
- then run `lerna publish` in repo root

### Committing Changes (outside the packages)
- edit files normally
- use `git add` and `git commit` as usual

### Installing Dependencies
- add dependencies to respective `package.json`s (whethe a local or npm-hosted dependency)
- run `lerna bootstrap` in repo root



## Dependencies

### [`yarn`](https://yarnpkg.com/lang/en/docs/install/)

### [`lerna`](https://github.com/lerna/lerna)
    `yarn global add lerna`
