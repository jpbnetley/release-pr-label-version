# Test release pr label version
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
secrets:
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
secrets:
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
  patch-release-script:
    description: 'Script to run for patch release'
    required: true
  minor-release-script:
    description: 'Script to run for minor release'
    required: true
  major-release-script:
    description: 'Script to run for major release'
    required: true

secrets:
  GITHUB_TOKEN:
    description: 'GitHub token for authentication'
    required: true
    default: '${{ secrets.GITHUB_TOKEN }}'
  ```
