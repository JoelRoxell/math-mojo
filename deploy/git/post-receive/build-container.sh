#!/bin/bash

REPO_NAME="math-mojo"

# Check out the newset version of the source code.
export GIT_WORK_TREE="/var/git/${REPO_NAME}"
git checkout -f

# Tag with latest commit ref.
TAG="$(git log --pretty=format:'%h' -n 1)"
COMMIT_TAG="${REPO_NAME}:${TAG}"
LATEST_TAG="${REPO_NAME}:latest"

# Build image.
docker build -t "${COMMIT_TAG}" "${GIT_WORK_TREE}"

# Get ID of last built image.
IMAGE_ID = "$(docker images -q ${REPO_NAME} | head -1)"

# Restart service.

# Remove dangling images
docker rmi $(docker images --quiet --filter "dangling=true")
