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
IMAGE_ID="$(docker images -q ${REPO_NAME} | head -1)"

# Stop service.
docker rm -f $(docker ps -a -q -f name=math-mojo)

# Start new image.
docker run --name "${REPO_NAME}" -p 80:3000 -d "${IMAGE_ID}"

# Remove dangling images
docker rmi $(docker images --quiet --filter "dangling=true")
