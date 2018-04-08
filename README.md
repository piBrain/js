# welcome to js funland
[![Waffle.io - Columns and their card count](https://badge.waffle.io/8937b9e1f86b9c8a98b0d04e7121791b.svg?columns=all)](https://waffle.io/piBrain/js)


## Project Dependencies

### [`yarn`](https://github.com/yarnpkg/yarn)
- after [installing yarn](https://yarnpkg.com/lang/en/docs/install/) at least v1.0 (check with `yarn --version`), open a new terminal and run 
`yarn config set workspaces-experimental true`
### [`lerna`](https://github.com/lerna/lerna)
- `yarn global add lerna`


## How To's

### Branching
- since this single git is responsible for several distinct packages, it is important to note the package being changed in the branch name, in addition to a description of the changes being made and the pivotal hash
- `${packageName}-${pivotalHash}-${description}`
- `aura-be-2039487-create-users`

### Committing Changes
- edit files normally
- use `git add` and `git commit` as usual

### Bumping Package Version
- first commit all changes as usual
- (optional) run `lerna updated` to see which packages have "un-released" changes (changes that have not been tagged
  with a release version in git)
- run `lerna publish [-m 'description of unreleased changes']`, and choose an appropriate semver change from the menujjk

### Installing Dependencies
- `cd packages/dependentPackage` `yarn add/remove dependedPackage` (whether a local or npm-hosted dependency)
- `yarn install` in any directory of the repo or `lerna bootstrap` in the repo root
- [more info](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/#integrating-with-lerna)
