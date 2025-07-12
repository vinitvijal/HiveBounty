# HiveBounty 🐝💰

A decentralized platform that bridges GitHub open source contributions with Hive blockchain rewards. Connect your development skills with cryptocurrency earnings by solving issues and claiming bounties.

## 🌟 What We Built

**HiveBounty** is a Next.js application that creates a seamless bridge between GitHub's open source ecosystem and the Hive blockchain. It allows developers to:

- **Create Bounties**: Link GitHub issues with HIVE token rewards
- **Solve Issues**: Work on open source problems and submit solutions
- **Earn Rewards**: Get paid in cryptocurrency for successful contributions
- **Verify Work**: Automated verification through GitHub API integration

## 🚀 Key Features

### For Bounty Creators
- **Easy Bounty Creation**: Link any GitHub issue with a HIVE reward
- **Escrow System**: Secure funds are locked until issue resolution
- **Automated Verification**: GitHub API integration validates completed work
- **Transparent Process**: All transactions recorded on the Hive blockchain

### For Developers
- **Browse Available Bounties**: Search and filter by language, amount, and status
- **Submit Solutions**: Link pull requests to claim bounties
- **Instant Payments**: Receive HIVE tokens directly to your wallet
- **Portfolio Tracking**: Monitor your earnings and contribution history

### Technical Features
- **Hive Keychain Integration**: Secure wallet connection and transactions
- **GitHub API Integration**: Real-time issue and PR verification
- **Smart Contract Logic**: Automated bounty verification and payment
- **Modern UI/UX**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with GitHub OAuth
- **Blockchain**: Hive blockchain integration via DHive
- **Wallet**: Hive Keychain extension
- **APIs**: GitHub REST API, Hive RPC API

## 📋 Prerequisites

Before running this application, you'll need:

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database
3. **Hive Keychain** browser extension
4. **GitHub account** for OAuth authentication
5. **Hive account** for blockchain interactions

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hive-bounty.git
cd hive-bounty
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hive_bounty"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Hive Configuration
HIVE_NODE_URL="https://api.hive.blog"
CONTRACT_ACCOUNT="your-contract-account"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 How It Works

### 1. Bounty Creation Flow
1. User connects Hive Keychain wallet
2. Links a GitHub issue with a HIVE reward amount
3. Funds are transferred to contract account (escrow)
4. Bounty is published and visible to all developers

### 2. Bounty Claiming Flow
1. Developer finds an interesting bounty
2. Works on the GitHub issue and creates a pull request
3. Submits claim with PR URL through the platform
4. System verifies:
   - Issue is closed
   - PR is merged
   - PR references the issue
   - PR creator matches claimer
5. Upon verification, funds are released to the developer

### 3. Smart Contract Integration
- Uses Hive's custom_json operations for bounty data
- Leverages Hive Keychain for secure transactions
- Implements escrow system for fund security
- Records all activities on the blockchain

## 🏗️ Project Structure

```
hive-bounty/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── api/              # API routes
│   ├── bounty/           # Bounty pages
│   ├── contracts/        # Smart contract logic
│   ├── dashboard/        # User dashboard
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── components/           # Reusable UI components
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Reporting Bugs
1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information

### 💡 Suggesting Features
1. Open a feature request issue
2. Describe the use case and benefits
3. Include mockups or examples if applicable

### 🔧 Code Contributions

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed
4. **Commit your changes**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### 📝 Development Guidelines

- **Code Style**: Use TypeScript, follow ESLint rules
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README and code comments
- **Commits**: Use conventional commit messages
- **PRs**: Include description of changes and testing steps

### 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Run tests (when available)
npm test
```

## 🔒 Security

- All blockchain transactions require user approval via Hive Keychain
- GitHub OAuth ensures secure authentication
- Database queries use Prisma ORM for SQL injection protection
- Environment variables protect sensitive configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hive Community** for blockchain infrastructure
- **GitHub** for open source platform
- **Next.js Team** for the amazing framework
- **All Contributors** who help improve this project

## 📞 Support

- **Discord**: Join our community server
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Check our wiki for detailed guides

---

**Made with ❤️ by the HiveBounty Team**
**Developers:** [Vinit Vijal](https://github.com/vinitvijal), [Sharma Anurag](https://github.com/Anu9969)


*Empowering open source development through blockchain rewards*
