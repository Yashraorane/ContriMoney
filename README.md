# ContriMoney - Simplify Group Expenses

<div align="center">
  <img src="public/icon.svg" alt="ContriMoney Logo" width="100"/>
  <p>Split expenses with friends and family effortlessly</p>
</div>

## App Preview

<div align="center">
  <img src="/app/images/Homepage.png" alt="Home Page" width="600"/>
</div>

## Features

### Group Expense Management
<img src="/app/images/Group expense.PNG" alt="Group and their expenses" width="400" align="right"/>

- Create multiple expense groups
- Add and manage group members
- Track shared expenses
- Automatic expense splitting
- Real-time balance calculations

<br clear="right"/>
<br/>
<br/>

### Smart Dashboard
<img src="/app/images/Add expense.PNG" alt="Add Expense" width="400" align="right"/>

- View spending patterns
- Track outstanding balances
- See who owes who
- Monthly expense summaries
- Export expense reports

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Authentication**: Clerk
- **Database**: PostgreSQL (NeonDB)
- **UI Components**: ShadcnUI
- **Icons**: Lucide Icons

## Quick Start

1. **Clone and Install**
```bash
git clone https://github.com/yourusername/contrimoney.git
cd contrimoney
npm install
```

2. **Set up Environment Variables**
```bash
# Create .env.local and add your credentials
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
DATABASE_URL=your_database_url
```

3. **Run Development Mode**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using ContriMoney!

## More Snapshots

<div align="center">
  <img src="/app/images/Auth management.PNG" alt="User based dashboard" width="200"/>
  <img src="/app/images/Auth-clerk-manage.PNG" alt="Auth clerk management" width="200"/>
  <img src="/app/images/NeonDb Setup.png" alt="Database table" width="200"/>
</div>

## Security

- Secure authentication with Clerk
- Encrypted data transmission
- Regular security updates
- GDPR compliant

