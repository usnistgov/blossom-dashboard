SHELL := /bin/bash
.DEFAULT_GOAL := build

# Most targets require the dashboard to be run from within a submodule of the
# member repository in order to work properly
iac_dir := ../iac/
ter_cmd := ./$(iac_dir)/ter.sh
output_cmd := $(ter_cmd) output -raw

dev_environment := .env.development

.PHONY: serve
serve: node_modules configure
	npx vite

.PHONY: build
build: node_modules
	npx tsc
	VITE_CLIENT_ID=`$(output_cmd) client_id` \
	VITE_CLIENT_SECRET=`$(output_cmd) client_secret` \
	VITE_AUTH_URL=`$(output_cmd) auth_url` \
	BASE_URL=`$(output_cmd) base_url` \
		npx vite build

.PHONY: configure
configure: $(dev_environment)

$(dev_environment):
	set -Eeuo pipefail; ($(output_cmd) vite_dev_env) > $(dev_environment)

node_modules: package.json package-lock.json
	@echo Downloading dependencies...
	npm ci

.PHONY: clean
clean:
	rm -fr .env.development dist node_modules

.PHONY: refresh
refresh:
	$(ter_cmd) refresh
