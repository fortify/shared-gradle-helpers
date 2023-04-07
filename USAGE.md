
<!-- START-INCLUDE:repo-usage.md -->

# Gradle Helper Scripts Usage Instructions

The sections below describe the various Gradle helper scripts provided in this repository. Helper scripts may provide additional instructions in comments at the top of the helper script.

## junit-helper.gradle

This Gradle helper script defines a standard JUnit configuration used by some Fortify projects.

#### build.gradle

To use the junit-helper.gradle script, you just need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify/shared-gradle-helpers/<version>/junit-helper.gradle"
```

## markdown2html.gradle

This Gradle helper script allows for building HTML files from Markdown files, for example to generate an HTML version of USAGE.md. It optionally allows for some special processing based on hidden HTML tags embedded in the Markdown file, to allow for variations between online display on GitHub and HTML version included in distruction downloads.

#### build.gradle

To use the markdown2html.gradle script, you need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify/shared-gradle-helpers/<version>/markdown2html.gradle"
```

In addition, you will need to define a `Copy` task named `copyMarkdown` that copies the Markdown files to be converted into the directory identified by the `${m2hSourceDir}` variable. Running the `markdownToHtml` task (for example through a `dependsOn` instruction on a `dist` task) will invoke the `copyMarkdown` task, process & convert all Markdown files in the `${m2hSourceDir}` directory, and copy the resulting output to a directory identified by the `${m2hOutputDir}` variable.

## readme2html.gradle

This Gradle helper script has been superseded by [markdown2html.gradle](#markdown2html-gradle). Both `readme2html.gradle` and `markdown2html.gradle` provide the same processing and conversion characteristics, but the latter allows for arbitrary Markdown files to be converted, whereas `readme2html.gradle` will convert only README.html from the project directory (and therefore doesn't require a `copyMarkdown` task to be defined in build.gradle).

To use the readme2html.gradle script, you just need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify/shared-gradle-helpers/<version>/readme2html.gradle"
```

## repo-helper.gradle

This Gradle helper script defines standard repositories used by most Fortify projects. This may include both standard Maven repositories and Fortify-specific repositories.

#### build.gradle

To use the repo-helper.gradle script, you just need to apply it: 
For example:

```gradle
apply from: "https://raw.githubusercontent.com/fortify/shared-gradle-helpers/<version>/repo-helper.gradle"
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

apply from: "https://raw.githubusercontent.com/fortify/shared-gradle-helpers/<version>/ssc-parser-plugin-helper.gradle"
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

apply from: "https://raw.githubusercontent.com/fortify/shared-gradle-helpers/<version>/thirdparty-helper.gradle"
```

<!-- END-INCLUDE:repo-usage.md -->


---

*[This document was auto-generated from USAGE.template.md; do not edit by hand](https://github.com/fortify/shared-doc-resources/blob/main/USAGE.md)*
