#!/bin/bash

# Ensure you are working with the latest remote data
git fetch origin

# Check the status to see what changes are staged
git status

# Add all modified and new files to staging
git add .

# Commit the changes with a custom message
# The message can be passed as an argument to the script (e.g., ./push_changes.sh "Your message here")
git commit -m "${1:-'Update changes'}"  # Default message is 'Update changes' if no argument is passed

# Push the changes to the 'main' branch (or 'master' if that's your branch name)
git push origin main  # Use 'master' if you're using that branch instead