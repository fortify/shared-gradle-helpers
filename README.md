# Gradle Helper Scripts

This repository provides Gradle helper scripts as described in the
sections below.

## repo-helper.gradle

This Gradle helper script defines standard repositories used by most fortify-ps 
projects. This includes both standard Maven repositories and Fortify-specific 
repositories.

#### build.gradle

To use the repo-helper.gradle script, you just need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/master/repo-helper.gradle"
```

## junit-helper.gradle

This Gradle helper script defines the standard JUnit configuration used by most fortify-ps 
projects.

#### build.gradle

To use the junit-helper.gradle script, you just need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/master/junit-helper.gradle"
```

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


## dependency-sources-licenses-helper.gradle

This Gradle helper script defines default configuration and various tasks for downloading and packaging dependency sources, and generating and packaging a dependency license report.

This script provides the following tasks:

* `generateLicenseReport`: Provided by the `com.github.jk1.dependency-license-report` plugin, configured to generate a license report for all runtime dependencies
* `packageLicenseReport`: Package the output of the `generateLicenseReport` task into a zip file in the build/dist directory
* `downloadDependencySources`: Download all available source artifacts for runtime dependencies
* `packageDependencySources`: Package the output of the `downloadDependencySources` task into a zip file in the build/dist directory

#### build.gradle

To use the dependency-sources-licenses-helper.gradle script, your build.gradle file needs to include the `com.github.jk1.dependency-license-report` plugin, and apply the latest version of the script. 
For example:

```gradle
plugins {
    id 'com.github.jk1.dependency-license-report' version '1.12'
}

apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/master/dependency-sources-licenses-helper.gradle"
```

## ssc-parser-plugin-helper.gradle

This Gradle helper script defines default configuration and standard functionality for generating SSC parser plugin jar-files. This includes the following functionality:

* Define `compileExport` configuration for declaring plugin dependencies that need to be packaged with the plugin
* Define standard SSC parser plugin dependencies
* Generate plugin jar:
    * Update plugin.xml with current plugin version
    * Add `compileExport` dependencies to plugin jar

#### build.gradle

To use the ssc-parser-plugin-helper.gradle script, your build.gradle file needs to define the parser plugin version, and apply the latest version of the script. 
For example, using the `getProjectVersionAsPlainVersionNumber()` method provided by the `version-helper.gradle` script:

```gradle
ext {
	sscParserPluginVersion = getProjectVersionAsPlainVersionNumber()
}

apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/master/ssc-parser-plugin-helper.gradle"
```

## bintray-binaries-helper.gradle

This Gradle helper script defines a default bintray configuration for the https://bintray.com/fortify-ps/binaries repository.

#### build.gradle

To use the bintray-binaries-helper.gradle script, your build.gradle file needs to define various bintray properties, and then apply the latest version of the script. 
For example, using the `getProjectVersionAsBetaOrRelease()` method provided by the `version-helper.gradle` script:

```gradle
ext {
	bintrayDownloadContainerName = getProjectVersionAsBetaOrRelease(false)
	projectLicense = 'MIT'
}

apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/master/bintray-binaries-helper.gradle"
```

