# DOCKER
docker-cleanup:
	@docker compose -f ./docker-compose.local.yml down -v

docker-start: docker-cleanup
	@docker compose -f ./docker-compose.local.yml up -d

docker-restart:
	@docker compose -f ./docker-compose.local.yml restart

docker-stop: docker-cleanup

# DEPLOYMENTS
.PHONY: deploy-dev
deploy-dev:
	@bash scripts/deployments/deploy-dev.sh

.PHONY: deploy-qa
deploy-qa:
	@bash scripts/deployments/deploy-qa.sh

.PHONY: deploy-prod-hotfix
deploy-prod-hotfix:
	@bash scripts/deployments/deploy-prod-hotfix.sh

.PHONY: deploy-prod
deploy-prod:
	@bash scripts/deployments/deploy-prod.sh

.PHONY: deploy-all
deploy-all:
	@printf "[ATTENTION!] The changes will be published in the entire deploy branch flow.\n\n"; \
	read -p "Are you sure you want to continue? (y/n): " confirm; \
	if [ "$$confirm" = "y" ]; then \
		$(MAKE) deploy-dev && \
		$(MAKE) deploy-qa && \
		$(MAKE) deploy-prod; \
	else \
		echo "Operation canceled."; \
	fi

# GIT
.PHONY: commit
commit:
	npm run commit

# PUBLISH
.PHONY: publish-all
publish-all:
	@gulp publishApplication && \
		gulp publishAuditing && \
		gulp publishCommon && \
		gulp publishIam && \
		gulp publishMcp && \
		gulp publishMessage && \
		gulp publishMsEmail && \
		gulp publishMsEntraId && \
		gulp publishOAuth && \
		gulp publishQueueManager && \
		gulp publishStorageAccount && \
		gulp publishStorageAccountAzure && \
		gulp publishTools && \
		gulp publishWhatsapp

# .ENV FILES
SOPS_AGE_KEY_FILE := .keys/age.txt
.PHONY: env encrypt decrypt edit clean

env: decrypt

encrypt:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env > .env.local.enc
	@echo ">> .env.local.enc updated"

decrypt:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.local.enc > .env
	@echo ">> .env generated"

encrypt-dev:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env.dev > .env.dev.enc
	@echo ">> .env.dev.enc updated"

decrypt-dev:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.dev.enc > .env.dev
	@echo ">> .env.dev generated"

encrypt-qa:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env.qa > .env.qa.enc
	@echo ">> .env.qa.enc updated"

decrypt-qa:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.qa.enc > .env.qa
	@echo ">> .env.qa generated"

encrypt-prod:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env.prod > .env.prod.enc
	@echo ">> .env.prod.enc updated"

decrypt-prod:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.prod.enc > .env.prod
	@echo ">> .env.prod generated"

encrypt-all:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env > .env.local.enc
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env.dev > .env.dev.enc
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env.qa > .env.qa.enc
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --encrypt --input-type binary --output-type binary .env.prod > .env.prod.enc

decrypt-all:
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.local.enc > .env
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.dev.enc > .env.dev
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.qa.enc > .env.qa
	@SOPS_AGE_KEY_FILE=$(SOPS_AGE_KEY_FILE) sops --decrypt --input-type binary --output-type binary .env.prod.enc > .env.prod

clean:
	@rm -f .env
	@echo ">> .env eliminado"
