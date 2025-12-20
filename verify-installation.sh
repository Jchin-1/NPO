#!/bin/bash

# NPO Website Installation Verification Script
# This script checks that all necessary files and configurations are in place

echo "🔍 NPO Website Installation Verification"
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0
SUCCESS=0

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} Missing: $1"
        ((ERRORS++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1/"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} Missing: $1/"
        ((ERRORS++))
    fi
}

# Function to check file contains text
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 contains '$2'"
        ((SUCCESS++))
    else
        echo -e "${YELLOW}⚠${NC} $1 missing '$2'"
        ((WARNINGS++))
    fi
}

echo "📁 Checking directory structure..."
check_dir "src"
check_dir "src/app"
check_dir "src/components"
check_dir "supabase"
check_dir "supabase/migrations"
echo ""

echo "📄 Checking configuration files..."
check_file "package.json"
check_file "tsconfig.json"
check_file "next.config.js"
check_file "tailwind.config.ts"
check_file "postcss.config.js"
check_file ".eslintrc.json"
echo ""

echo "🌐 Checking page files..."
check_file "src/app/layout.tsx"
check_file "src/app/page.tsx"
check_file "src/app/globals.css"
check_file "src/app/activities/page.tsx"
check_file "src/app/contact/page.tsx"
check_file "src/app/snow-pickup/page.tsx"
echo ""

echo "🔧 Checking component files..."
check_file "src/components/Navbar.tsx"
check_file "src/components/Footer.tsx"
echo ""

echo "📡 Checking API and server actions..."
check_file "src/app/api/snow-requests/route.ts"
check_file "src/app/actions/snow-requests.ts"
echo ""

echo "🗄️ Checking database files..."
check_file "supabase/migrations/001_init_schema.sql"
echo ""

echo "📚 Checking documentation..."
check_file "README.md"
check_file "SETUP_GUIDE.md"
check_file "SUPABASE_SETUP.md"
check_file "DEPLOYMENT_CHECKLIST.md"
check_file "TESTING_GUIDE.md"
check_file "QUICK_REFERENCE.md"
check_file "BUILD_SUMMARY.md"
echo ""

echo "⚙️ Checking environment setup..."
check_file ".env.example"
check_file ".env.local"
check_content ".env.example" "NEXT_PUBLIC_SUPABASE_URL"
echo ""

echo "📋 Checking dependencies..."
check_content "package.json" "next"
check_content "package.json" "react"
check_content "package.json" "tailwindcss"
check_content "package.json" "lucide-react"
check_content "package.json" "@supabase/supabase-js"
echo ""

echo "🛡️ Checking security files..."
check_file ".gitignore"
echo ""

echo "========================================"
echo "📊 Verification Summary"
echo "========================================"
echo -e "${GREEN}✓ Passed: $SUCCESS${NC}"
echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
echo -e "${RED}✗ Errors: $ERRORS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Your installation is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. npm install              # Install dependencies"
    echo "2. Set up Supabase account"
    echo "3. Run SQL schema in Supabase"
    echo "4. Update .env.local with credentials"
    echo "5. npm run dev              # Start development server"
    exit 0
else
    echo -e "${RED}❌ Installation incomplete. Please fix the errors above.${NC}"
    echo ""
    echo "Check BUILD_SUMMARY.md or SETUP_GUIDE.md for more information."
    exit 1
fi
