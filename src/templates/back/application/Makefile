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
		gulp publishMessage && \
		gulp publishMsEmail && \
		gulp publishMsEntraId && \
		gulp publishOAuth && \
		gulp publishQueueManager && \
		gulp publishStorageAccount && \
		gulp publishStorageAccountAzure && \
		gulp publishTools && \
		gulp publishWhatsapp
