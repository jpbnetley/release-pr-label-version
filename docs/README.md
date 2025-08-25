# Release pr label version
> release prs with labels

The goal is to add labels to release pr's to indicate what type of release should be applied.  
This follows the [semver](https://semver.org/). IE Major.Minor.Patch.

Once the pr is merged to the release branch (in this case, `main`), release action will get the last merged pull request,  
and check if any release labels have been added.


## Actions explained
### labeler-validator
> Adds missing labels, and validates that the labels are added.
  - Will add a `release:version-required` if no release label is added.
  - If a release label is added, the `release:version-required` is removed
  - Will add `release:version-pre` if it is a pre-release
  Checks that the required labels are added.  
  This should be used with the branch protection rules so that a release pr cannot be merged if the correct label is not selected.

#### Permissions
  ```yml
permissions:
    pull-requests: write
    contents: read

  ```
Under workflow permissions, grant `Allow GitHub Actions to create and approve pull requests`
<image src='./assets/images/pr-permission.png'>

#### Inputs
  ```yml
inputs:
    isPreRelease:
      description: 'Indicates if the release is a pre-release'
      default: false
env:
    GITHUB_TOKEN
  ```

#### Example workflow
```yml
name: Ensure Release Version Label validator

on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize]
    branches:
      - main
      - dev

env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

permissions:
  pull-requests: write
  contents: read

jobs:
  validate-version-required-label:
    name: Validate Version Required Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Labeler validation
        uses: jpbnetley/release-pr-label-version/labler-validator@main
        with:
          isPreRelease: ${{ github.base_ref == 'dev' }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### labeler-release
> Handles semantic versioning based on labels applied to pull requests.

#### Permissions
  ```yml
permissions:
    pull-requests: write
    contents: read
  ```

#### Inputs
  ```yml
inputs:
  pre-release-script:
      description: 'Script to run for pre-release'
      required: false
  release-script:
      description: 'Script to run for release'
      required: false
  patch-release-script:
    description: 'Script to run for patch release'
    required: true
  minor-release-script:
    description: 'Script to run for minor release'
    required: true
  major-release-script:
    description: 'Script to run for major release'
    required: true
  release-branch-name: 
    description: The release branch name
    required: false
  pre-release-branch-name:
    description: The pre-release branch name
    required: false
  get-current-version-script:
    description: 'Script to get the current version'
    required: true
env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```

#### Example workflow
```yml
name: Release

on:
  push:
    branches: 
      - main

jobs:
  release-from-version-label:
    name: Release from Version Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Labeler release
        uses: jpbnetley/release-pr-label-version/labler-release@main
        with:
          major-release-script: echo 'major release script'
          minor-release-script: echo 'minor release script'
          patch-release-script: echo 'patch release script'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Ref
This composite actions is used in: https://github.com/jpbnetley/test-release-pr-label-version
