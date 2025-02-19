# AI Expenses Manager API

A modern expenses management system built as a practical application of Clean Architecture, Hexagonal Architecture and domain-driven design principles through a well-structured, maintainable codebase while providing a RESTful API for managing personal expenses with smart AI-powered categorization features.

## Features

- 🏗️ Clean Architecture / Hexagonal Architecture
- 🔐 JWT-based authentication
- 🤖 AI-powered expense categorization
- 📊 Expense management and tracking
- 📝 Swagger API documentation
- 🔒 Security features (rate limiting, helmet protection)
- 🎯 TypeScript with strict typing
- 🗃️ PostgreSQL database with Prisma ORM
- 🐳 Docker support
- ✅ Unit testing with Vitest
- ✅ CI/CD with GitHub Actions
- ✅ Deployment to Google Cloud Run

## Tech Stack

- Node.js & Express
- TypeScript
- PostgreSQL
- Prisma ORM
- OpenAI API
- Docker
- JWT Authentication
- Swagger Documentation
- Vitest Testing Framework

## Architecture

This project follows Clean Architecture principles, also known as Hexagonal Architecture, with clear separation of concerns:

```
src/
├── application/           # Application layer (Use cases, DTOs)
│   ├── dtos/             # Data Transfer Objects
│   ├── errors/           # Application-specific errors
│   ├── messages/         # Response messages
│   ├── payloads/         # Request/Response payloads
│   └── providers/        # Provider interfaces
├── domain/               # Domain layer (Business logic)
│   ├── entities/         # Domain entities
│   └── repositories/     # Repository interfaces
├── infrastructure/       # Infrastructure layer
│   ├── database/        # Database implementations
│   ├── logging/         # Logging implementations
│   ├── providers/       # External service implementations
│   └── web/             # Web server setup
├── use-cases/           # Business logic implementations
├── types/               # TypeScript type definitions
│   └── express/         # Express type extensions
└── config/              # Configuration files

tests/
├── factories/           # Test data factories
│   ├── user.factory.ts
│   ├── expense.factory.ts
│   └── category.factory.ts
└── use-cases/          # Use case tests
    ├── users/
    └── expenses/

prisma/
├── schema.prisma      # Prisma schema

.husky/                # Git hooks
```

### Architectural Principles

- **Domain-Driven Design (DDD)**: Business logic is centered in the domain layer
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Interface Segregation**: Clients don't depend on interfaces they don't use
- **Single Responsibility**: Each module has one reason to change

## Prerequisites

- Node.js 18 or higher
- PostgreSQL
- Docker (optional)
- OpenAI API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
POSTGRES_PORT=5432
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

## Development

### Running the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

Using Docker:

```bash
npm run docker:compose
```

### Running Tests

```bash
npm run test
```

## API Documentation

Once the application is running, access the Swagger documentation at:

```bash
http://localhost:5000/api-docs
```

## Security Features

- JWT Authentication
- Rate Limiting
- Helmet Protection
- Password Hashing
- CORS Configuration
- Input Validation
- Error Handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Implement your feature
4. Ensure tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License.
