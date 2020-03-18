# Fortify scan scripts can invoke this script as follows:
#
# # Set scan options, for example to include extra build id's or to scan as a module
# # Note that this must include the actual -scan or -scan-module options
# scanOpts="-b fortify-ssc-parser-util -scan" 
#
# # Load and execute scan script from GitHub (replace 1.0 with correct version if necessary)
# source <(curl -s https://raw.githubusercontent.com/fortify-ps/gradle-helpers/1.0/fortify-scan.sh.inc)


# Terminate immediately on any errors
set -e

# Get the full path of the directory where this script is located
scriptDir=$(dirname $(readlink -f $0))

# Define build id as the last element of the path identified by ${scriptDir}
buildId=$(basename ${scriptDir})

# Display all script commands from here on
set -x

# Clean our build model
sourceanalyzer -b "${buildId}" -clean

# Translate using SCA Gradle integration. The -Pfortify option informs our build script that 
# we're running a Fortify translation, allowing the build script to take appropriate measures 
# if necessary. We use the fully qualified path to gradlew (using ${scriptDir}), as this seems
# to work with both Linux and Windows Fortify SCA installations (i.e. when running this script
# with MinGW/Git Bash/... on Windows).
sourceanalyzer -b "${buildId}" -gradle "${scriptDir}/gradlew" clean build -Pfortify

# Scan the project using scan options specified in ${scanOpts}
sourceanalyzer -b "${buildId}" -f "${buildId}.fpr" ${scanOpts}
