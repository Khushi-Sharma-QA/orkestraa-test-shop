#!/usr/bin/env bash
# Usage: bash scripts/seed_issues.sh <owner>/<repo>   (requires GitHub CLI: gh auth login)
set -euo pipefail
R="$1"
gh issue create -R "$R" -t "Two coupons get applied on the same order" -b "I applied FEST10 and WELCOME50 at checkout and got both discounts (₹200 off on a ₹1,500 cart). Shouldn't it be one coupon per order?"
gh issue create -R "$R" -t "Order total shows long decimals" -b "Checkout API returned total 1591.9379999999999 for a ₹1,499 cart with a ₹149.90 discount. Expected 1591.94."
gh issue create -R "$R" -t "Feature request: wishlist" -b "Please add a wishlist so I can save products for later."
gh issue create -R "$R" -t "Invoice amount off by a few paise" -b "Customer invoice shows ₹1,591.937 instead of ₹1,591.94; finance says totals don't reconcile."
gh issue create -R "$R" -t "How do I run the tests locally?" -b "New contributor here, what's the command to run tests?"
gh issue create -R "$R" -t "README has wrong port" -b "README says the API runs on port 3000 but it starts on 8080."
echo "Created 6 seed issues in $R"
