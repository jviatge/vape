clear-docker:
	docker system prune -a

migration:
	docker exec app sh -c 'cd database; npx prisma migrate deploy'

logs:
	docker logs app -f

production-build:
	docker-compose up -d --build