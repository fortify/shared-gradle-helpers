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

Your build.gradle file can then define the project version number using one of the following approaches:

* `version = getProjectVersion()`
    * Define the version number based directly on Git status, for example `5.4` for tagged versions, or `5.4-SNAPSHOT` for snapshot versions. This format is mostly used for libraries that get deployed to a Maven repository.
 
* `version = getProjectVersionAsBetaOrRelease(true)`
    * Define the version number in an alpha/beta/release format, for example `5.4-release` for tagged versions, or `5.4-beta-20191231-235930` for snapshot versions. This format is mostly used for artifacts that are downloaded manually by users, like command line utilities.
    
* `version = getProjectVersionAsBetaOrRelease(false)`
    * Similar to `getProjectVersionAsBetaOrRelease(true)` but without the date/timestamp, for example `5.4-beta`. This format is mostly used for generating a download container that holds multiple builds of the same snapshot version. 
    
* `version = getProjectVersionAsPlainVersionNumber()`
    * Define the version number as a plain version number, for example `5.4` for tagged versions, or `0.20191231.235930` for snapshot versions. This format is mostly used for versioned plugins where the plugin container requires a plain version number.
    
Note that in some cases you may want to use multiple variants within a single project, assigning the method return values to different properties. For example:

* Use `getProjectVersionAsBetaOrRelease(true)` as the main project version property. For example, this will generate artifacts named `<myplugin>-5.4-release.jar` or `<myplugin>-5.4-beta-20191231-235930.jar`.
* Use `getProjectVersionAsBetaOrRelease(false)` as the container name to which builds are being uploaded. For example, this will generate download containers named `5.4-release` or `5.4-beta`. Once a snapshot version has been released as a tagged version, you can delete all beta builds by simply deleting the beta container.
* Use `getProjectVersionAsPlainVersionNumber()` to generate a plugin version number contained in a plugin descriptor. For example, this will generate plugin versions `5.4` or `0.20191231.235930`.

