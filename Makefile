SHELL:=/bin/bash

.PHONY: help
# Run "make" or "make help" to get a list of user targets
# Adapted from https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?##.*$$' $(MAKEFILE_LIST) | awk 'BEGIN { \
	 FS = ":.*?## "; \
	 printf "\033[1m%-30s\033[0m %s\n", "TARGET", "DESCRIPTION" \
	} \
	{ printf "\033[32m%-30s\033[0m %s\n", $$1, $$2 }'

.PHONY: serve
serve: node_modules .env.development ## Serve the development dashboard
	npx vite

.PHONY: build
build: node_modules .env.prod ## Build the production dashboard
	npx vite build --mode prod

.PHONY: dependencies
dependencies: node_modules ## Download project dependencies

node_modules: package.json package-lock.json
	@echo Downloading dependencies...
	npm ci

.PHONY: clean
clean: ## Clean the project of build and dependency artifacts
	rm -fr dist node_modules

# Special error target for missing files

.env.development .env.prod:
	@echo .env.development and .env.prod are required to serve/build this project. See .env.development.sample and .env.prod.sample for more details
	@exit 1
