# Gradle Helper Scripts

This repository provides Gradle helper scripts as described in the
section(s) below.

## version-helper.gradle

This Gradle helper script provides functionality for handling project version
numbers based on Git branches and tags. This script assumes the following
development methodology:

* All development is done in branches named `<version>-SNAPSHOT`, where
  `<version>` contains dot-separated digits like `1.5` or `1.8.32`.
  The script provides the `startSnapshotBranch` task to assist in creating
  correctly named snapshot branches.
* Whenever a snapshot branch is ready to be released, the developed runs the
  `releaseSnapshot` task. This task will merge the changes from the current
  snapshot branch with the master branch, and tag those changes using the version
  number from the snapshot branch name. For example, the current state of the
  `1.5-SNAPSHOT` branch will be tagged as `1.5`.

For more information about available tasks, see the comments in the helper script.

#### build.gradle

To use the version-helper.gradle script, your build.gradle file needs to include the `org.ajoberstar.grgit` plugin, and apply the latest version of the script. 
For example:

```gradle
plugins {
    id 'org.ajoberstar.grgit' version "4.0.0"
}

apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/master/version-helper.gradle"
```

Your build.gradle file can then define the project version number as follows:

```gradle
version = getProjectVersion()
```
