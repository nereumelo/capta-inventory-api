#!/bin/sh

libDir="/opt/oracle"
resDir="resources/oracle"
PLATFORM=$(uname)
ARCH=$(uname -m)

log() {
    local level="$1"
    local message="$2"
    echo "[$level] $message"
}

requireSudo() {
    local isNotRoot="[ $(id -u) -ne 0 ]"

    if eval "$isNotRoot"; then
        log "ERROR" "This script must be run as root. Please use sudo."
        exit 1
    fi
}

verifySupportedSystem() {
    if [ "$PLATFORM" != "Linux" ] || [ "$ARCH" != "x86_64" ]; then
        log "ERROR" "Unsupported platform or architecture detected."
        log "INFO" "This script is designed to run only on Linux x86_64 systems."
        log "INFO" "Please refer to the node-oracledb driver installation guide for manual setup on your system."
        exit 1
    fi
}


installPackages() {
    local packages="libaio1|libaio1t64"
    local isNotInstalled="! dpkg -l | grep -qE '$packages'"

    if eval "$isNotInstalled"; then
        log "INFO" "Installing required packages: '$packages'"
        apt update -qq

        if ! apt-get install -y -qq libaio1; then
            # If libaio1 fails, install libaio1t64 and link it
            log "INFO" "Installing libaio1 substitute: libaio1t64"
            apt-get install -y -qq libaio1t64 && \
            ln -s /usr/lib/x86_64-linux-gnu/libaio.so.1t64 /usr/lib/x86_64-linux-gnu/libaio.so.1
        fi
    fi
}

setupOracleInstantClient() {
    local clientNotFound="[ ! -d '$libDir/instantclient' ]"

    if eval "$clientNotFound"; then
        log "INFO" "Installing Oracle Instant Client"
        mkdir -p $libDir
        unzip -q -o $resDir/instantclient-basiclite-linux.x64-19.25.0.0.0dbru.zip -d $resDir \
            && mv $resDir/instantclient_19_25 $resDir/instantclient \
            && mv $resDir/instantclient $libDir \
            && rm -rf $resDir/META-INF
        if ! grep -q "LD_LIBRARY_PATH=$libDir/instantclient" /etc/profile; then
            echo "export LD_LIBRARY_PATH=$libDir/instantclient" >> /etc/profile
            source /etc/profile
        fi
        log "INFO" "Successfully installed Oracle Instant Client"
    else
        log "INFO" "Oracle Instant client already installed"
    fi
}

init() {
    log "INFO" "Starting the initialization process..."
    requireSudo
    verifySupportedSystem
    installPackages
    setupOracleInstantClient
    log "INFO" "Initialization process completed."
}

destroy() {
    log "INFO" "Starting the destruction process..."
    requireSudo
    apt remove --purge libaio1 -y
    apt remove --purge libaio1t64 -y
    rm -rf $libDir
    log "INFO" "Destruction process completed."
}

showHelp() {
    echo "Usage: $0 [option]"
    echo "Options:"
    echo "  --init, -i       Executes the initialization"
    echo "                   (default if no option is provided)"
    echo "  --destroy, -d    Executes the destruction process"
    echo "  --help, -h       Displays this help message"
}

main() {
    case "$1" in
        --destroy|-d)
            destroy
            ;;
        --help|-h)
            showHelp
            ;;
        ""|--init|-i)
            init
            ;;
        *)
            log "ERROR" "Unknown option: $1\n"
            showHelp
            exit 1
            ;;
    esac
}

main "$@"