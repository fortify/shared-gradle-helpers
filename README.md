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
apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/<version>/repo-helper.gradle"
```

## junit-helper.gradle

This Gradle helper script defines the standard JUnit configuration used by most fortify-ps 
projects.

#### build.gradle

To use the junit-helper.gradle script, you just need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/<version>/junit-helper.gradle"
```

## thirdparty-helper.gradle

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
    id 'com.github.jk1.dependency-license-report' version '1.16'
}

apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/<version>/thirdparty-helper.gradle"
```

## ssc-parser-plugin-helper.gradle

This Gradle helper script defines default configuration and standard functionality for generating SSC parser plugin jar-files. This includes the following functionality:

* Define `implementationExport` configuration for declaring plugin dependencies that need to be packaged with the plugin
* Define standard SSC parser plugin dependencies
* Generate plugin jar:
    * Update plugin.xml with current plugin version
    * Add `implementationExport` dependencies to plugin jar

#### build.gradle

To use the ssc-parser-plugin-helper.gradle script, your build.gradle file needs to define the parser plugin version, and apply the latest version of the script, for example:

```gradle
ext.sscParserPluginVersion = project.version

apply from: "https://raw.githubusercontent.com/fortify-ps/gradle-helpers/<version>/ssc-parser-plugin-helper.gradle"
```

# Licensing

See [LICENSE.TXT](LICENSE.TXT)

