#!/usr/bin/env bash
# Strapi/Angular deployment to ALL-INKL using explicit FTPS (AUTH TLS on port 21).
# Dry-run is read-only. Live sync NEVER deletes remote files.
set -euo pipefail

mode="${1:-dry-run}"
if [[ "$mode" != "dry-run" && "$mode" != "deploy" ]]; then
  echo "Usage: bash scripts/deploy-ftps.sh dry-run|deploy" >&2
  exit 2
fi

for variable in FTP_SERVER FTP_USERNAME FTP_PASSWORD FTP_SERVER_DIR; do
  if [[ -z "${!variable:-}" ]]; then
    echo "Missing required environment variable: $variable" >&2
    exit 1
  fi
done
if [[ "$FTP_SERVER_DIR" != /* || "$FTP_SERVER_DIR" != */ ]]; then
  echo "FTP_SERVER_DIR must be an absolute FTP path ending with /" >&2
  exit 1
fi
if [[ "$FTP_SERVER" == *"://"* || "$FTP_SERVER" == *"/"* ]]; then
  echo "FTP_SERVER must be a hostname without a URL scheme or path" >&2
  exit 1
fi

local_dir="${GITHUB_WORKSPACE:-$PWD}/dist/portfolio/browser"
test -s "$local_dir/index.html"
test -s "$local_dir/blog/artikel.json"
test -s "$local_dir/glossar/index.html"
command -v lftp >/dev/null || { echo "lftp is not installed" >&2; exit 1; }

mirror_args='--reverse --verbose=1 --no-perms --parallel=1 --exclude-glob ".htaccess" --exclude-glob "*/.htaccess" --exclude-glob ".well-known/" --exclude-glob ".well-known/**" --exclude-glob ".git/" --exclude-glob ".git/**" --exclude-glob "node_modules/"'
if [[ "$mode" == "dry-run" ]]; then
  mirror_args="$mirror_args --dry-run"
  echo "FTPS dry run: plan only; no remote files will be changed."
else
  echo "FTPS deployment: updating site files; no remote deletions enabled."
fi

# The FTP password comes from a GitHub secret (environment variable), never from git.
# lftp negotiates explicit TLS on control and data connections; verification stays on.
# lcd + cd + mirror . . avoid accidentally uploading into a new /browser/ folder.
timeout 12m lftp --user "${FTP_USERNAME},${FTP_PASSWORD}" "ftp://${FTP_SERVER}:21" <<LFTP_CMDS
set cmd:fail-exit yes
set net:max-retries 2
set net:timeout 20
set net:reconnect-interval-base 4
set ftp:passive-mode yes
set ftp:ssl-allow yes
set ftp:ssl-force yes
set ftp:ssl-auth TLS
set ftp:ssl-protect-data yes
set ftp:ssl-protect-list yes
set ssl:verify-certificate yes
set ssl:check-hostname yes
lcd "$local_dir"
cd "$FTP_SERVER_DIR"
mirror $mirror_args . .
bye
LFTP_CMDS
