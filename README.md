# Task-API
Simple CRUD application for Task API, Task Entity contains the following properties: refer `src/db/models/task.ts`
1. id: uuid
2. date: date
3. status: string => can be OPEN | INPROGRESS | COMPLETED => refer `src/utils/types/task_status.ts`
4. title: string
5. description: string

## Routes

The following are the routes supported
- Creating a task (POST request):
```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "example-task",
    "description": "example-desc",
    "date": "2023-09-30",
    "status":"OPEN"}' http://localhost:8000/task
```

- Updating a task (PATCH request):
```bash
curl -X PATCH -H "Content-Type: application/json" -d '{
    "description": "example-description",
    "date": "2023-10-30",
    "status":"COMPLETED"}' http://localhost:8000/task/<taskId>
```

- Getting all tasks (GET request with query parameters): (note that page starts from 0)
```bash
curl "http://localhost:8000/task/all?pageSize=10&page=0"
```

- Getting metrics for a task (GET request):
```bash
curl http://localhost:8000/task/metrics
```

- Getting a specific task (GET request):
```bash
curl http://localhost:8000/task/taskId
```

## How to run
You need `docker` and `docker compose` installed
- Build
```bash
docker compose build
```
- Start
```bash
docker compose up -d
```
- Stop
```bash
docker compose down
```
