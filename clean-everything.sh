# Log start of the cleaning process
tee >(logger) <<< "================ Clean Everything ================"
tee >(logger) <<< "Removing build directories"

# Remove various build directories and caches
rm -rf $(find . -type d -name .yarn)
rm -rf $(find . -type d -name .cache)
rm -rf $(find . -type d -name .eslintcache)
rm -rf $(find . -type d -name .next)
rm -rf $(find . -type d -name .turbo)
rm -rf $(find . -type d -name "*.log")
rm -rf $(find . -type d -name build)
rm -rf $(find . -type d -name coverage)
rm -rf $(find . -type d -name dist)
# Leave .tmp for Sqlite dbs

# Remove storybook static build
rm -rf apps/ui-library/storybook-static

# Log node modules removal
tee >(logger) <<< "Removing node modules"
rm -rf $(find . -type d -name node_modules)

# Clean up pnpm related files
tee >(logger) <<< "Removing pnpm-lock.yaml"
pnpm store prune
rm -rf pnpm-lock.yaml

# Build process
# tee >(logger) <<< "Build Everything"
# bash build-everything.sh

pnpm self-update
