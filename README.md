# Release pr label version
> release prs with labels

The goal is to add labels to release pr's to indicate what type of release should be applied.  
This follows the [semver](https://semver.org/). IE Major.Minor.Patch.

Once the pr is merged to the release branch (in this case, `main`), release action will get the last merged pull request,  
and check if any release labels have been added.


## Actions explained
### labeler-validator
> checks that the required labels are added.  
  This should be used with the branch protection rules so that a release pr cannot be merged if the correct label is not selected.

#### Permissions
  ```yml
permissions:
    pull-requests: write
    contents: read

  ```

#### Inputs
  ```yml
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
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### labeler
> adds missing labels, and validates that the labels are added.
  - Wil add a `release:version-required` if no release label is added.
  - If a release label is added, the `release:version-required` is removed

#### Permissions
```yml
permissions:
    pull-requests: write
    contents: read
```

#### Inputs
```yml
github-token:
    description: 'GitHub token for authentication'
    required: true
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### Example workflow
```yml
name: Ensure Release Version Label

on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize]
    branches:
      - main

env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

permissions:
  pull-requests: write
  contents: read

jobs:
  add-version-required-label:
    name: Add Version Required Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Labeler validation
        uses: jpbnetley/release-pr-label-version/labler@main
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
