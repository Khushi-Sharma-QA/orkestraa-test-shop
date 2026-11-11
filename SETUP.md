# Setup for Orkestraa agent testing

1. Create an empty GitHub repo named `orkestraa-test-shop` (private is fine). Do not add a README.
2. From this folder:
   ```bash
   git remote add origin https://github.com/<your-org>/orkestraa-test-shop.git
   git push -u origin main
   git push -u origin feature/order-export
   ```
3. Open a pull request: base `main` ← compare `feature/order-export`, title **"Add admin order export and configurable page size"**. This becomes PR #1 (used by agent S3).
4. Create the 6 seed issues (used by M4, L1, L2). With the GitHub CLI logged in:
   ```bash
   bash scripts/seed_issues.sh <your-org>/orkestraa-test-shop
   ```
   Or create them by hand from `scripts/seed_issues.md`, in the same order, so the issue numbers match.
5. Optional: `npm install && npm test`. The 8 existing tests pass; the planted bugs are not covered by tests on purpose.
