#!/bin/bash

SOURCE_BRANCH=master
ORIGINAL_BRANCH=$(git symbolic-ref --short HEAD)

SCRIPT_DIRECTORY=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

JSDOC_CONFIGURATION="${SCRIPT_DIRECTORY}/jsdoc.json"
JSDOC_OUTPUT="${SCRIPT_DIRECTORY}/jsdoc"

JSDOC_TEMPORARY_CONFIGURATION=$(mktemp)
JSDOC_TEMPORARY_OUTPUT=$(mktemp -d)

fail() {
    local result=$?

    if [ "${result}" != "0" ]; then
        echo "command \"$@\" exited with non-zero result: ${result}" >&2
        exit "${result}"
    fi
}

cp "${JSDOC_CONFIGURATION}" "${JSDOC_TEMPORARY_CONFIGURATION}" || fail

# Save the current state of the branch and switch branches
git stash save -u -q || fail
git checkout -q "${SOURCE_BRANCH}" || fail

# Build the documentation
jsdoc -c "${JSDOC_TEMPORARY_CONFIGURATION}" -d "${JSDOC_TEMPORARY_OUTPUT}" || fail

# Switch back branches
git checkout -q "${ORIGINAL_BRANCH}" || fail

# Delete the existing JSDoc output and copy the generated documentation over it
rm -rf "${JSDOC_OUTPUT}" || fail
mv "${JSDOC_TEMPORARY_OUTPUT}" "${JSDOC_OUTPUT}" || fail

# Check if any files have changed
if [ -n "$(git status -s)" ]; then
    # Add the generated documentation if it has changed
    git add "${JSDOC_OUTPUT}" || fail
    git commit -m "${1:-Update documentation}" || fail
else
    echo "No changes to documentation"
fi

# Restore the previous state of the branch
git stash apply -q > /dev/null || fail

# Delete the generated temporary configuration file
rm "${JSDOC_TEMPORARY_CONFIGURATION}"
