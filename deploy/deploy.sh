#!/bin/bash

SERVER_IP="${SERVER_IP:-192.168.1.101}"
SSH_USER="${SSH_USER:-$(whoami)}"
DOCKER_VERSION="${DOCKER_VERSION:-1.12.1}"
REPO_NAME="math-mojo"
DOCKER_PULL_IMAGES=("joelroxell/math-mojo")

function help() {
cat << EOF
Usage: ${0} (-h | -s | -d | -g)

Environment variables:
  SERVER_IP       Remote host used for deployment and build automations.

  SSH_USER        User account to ssh and scp.

  DOCKER_VERSION  Docker version to install on remote host.

Options:
  -h|--help         Show this message.
  -s|--ssh-add-key  Add id_rsa.pub to remote host.
  -S|--ssh-secure   Configure secure ssh.
  -d|--docker       Install Docker.
  -g|--git-init     Install and initialize git.

Examples:
  Add SSH key:
    $ ${0} -k

  Install docker v${DOCKER_VERSION}
    $ ${0} -d

EOF
}

function configure_ssh() {
  echo "Adding public SSH key..."
  cat "$HOME/.ssh/id_rsa.pub" | ssh -t "${SSH_USER}@${SERVER_IP}" bash -c "'
    mkdir /home/${SSH_USER}/.ssh
    cat >> /home/${SSH_USER}/.ssh/authorized_keys
  '"
  echo "Added ssh key successfully."
}

# Disable ssh password authenticaton.

# initialize remote bare git repo and prepare source code and folders.
function git_init() {
  REPO_LOCATION="/var/git"

  scp "git/post-receive/build-container.sh" "${SSH_USER}@${SERVER_IP}:/tmp/math-mojo-auto-build"

  ssh -t "${SSH_USER}@${SERVER_IP}" bash -c "'
    sudo apt-get update && apt-get install -y -q git
    sudo rm -rf ${REPO_LOCATION}/${REPO_NAME}.git ${REPO_LOCATION}/${REPO_NAME}
    sudo mkdir -p ${REPO_LOCATION}/${REPO_NAME}
    sudo git --git-dir=${REPO_LOCATION}/${REPO_NAME}.git --bare init

    sudo mv /tmp/math-mojo-auto-build ${REPO_LOCATION}/${REPO_NAME}.git/hooks/post-receive
    sudo chmod +x ${REPO_LOCATION}/${REPO_NAME}.git/hooks/post-receive
    sudo chown ${SSH_USER}:${SSH_USER} -R ${REPO_LOCATION}/${REPO_NAME}.git ${REPO_LOCATION}/${REPO_NAME}

    echo "Finished repo initialization"
  '"
}

while [[ $# > 0 ]]; do
  case "${1}" in
    -s|--ssh )
      configure_ssh
      ;;

    -S|--ssh-secure)
      ssh_secure "${2}"
      shift
      ;;

    -h|--help)
      help
      ;;

    -g|--git-init)
      git_init
      ;;
    *)
      echo "${1} is not a valid flag, run ${0} --help to se options."
      ;;
  esac
  shift
done
