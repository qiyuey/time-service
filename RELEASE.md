# Release Guide

This project uses automated releases via GitHub Actions. When you push a
version tag, the package is automatically published to npm.

## Quick Release

Use the npm scripts for quick releases:

```bash
# Patch release (0.1.1 -> 0.1.2)
npm run release:patch

# Minor release (0.1.1 -> 0.2.0)
npm run release:minor

# Major release (0.1.1 -> 1.0.0)
npm run release:major
```

These commands will:

1. Update the version in `package.json`
2. Create a git commit
3. Create a git tag (e.g., `v0.1.2`)
4. Push the commit and tag to GitHub
5. Trigger GitHub Actions to publish to npm

## Manual Release

If you prefer manual control:

```bash
# 1. Update version
npm version patch  # or minor/major

# 2. Push code and tags
git push
git push --tags

# 3. GitHub Actions will automatically publish to npm
```

## First-time Setup

### Configure NPM_TOKEN

1. Generate an npm access token:
   - Go to <https://www.npmjs.com/settings/YOUR_USERNAME/tokens>
   - Click "Generate New Token" → "Classic Token"
   - Select "Automation" type
   - Copy the token

2. Add token to GitHub:
   - Go to <https://github.com/qiyuey/time-service/settings/secrets/actions>
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: paste your npm token
   - Click "Add secret"

### Verify Setup

After setting up the token, create a test release:

```bash
npm run release:patch
```

Then check:

- GitHub Actions: <https://github.com/qiyuey/time-service/actions>
- npm package: <https://www.npmjs.com/package/@qiyuey/time-service>

## What Happens During Release

When you push a tag (e.g., `v0.1.2`), GitHub Actions will:

1. ✅ Checkout the code
2. ✅ Setup Bun runtime
3. ✅ Install dependencies
4. ✅ Run tests (if available)
5. ✅ Publish to npm with provenance
6. ✅ Create a GitHub Release with auto-generated notes

## Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.1 → 0.1.2): Bug fixes, documentation updates
- **Minor** (0.1.0 → 0.2.0): New features, backward compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes

## Troubleshooting

### Action fails with "401 Unauthorized"

- Check if NPM_TOKEN is correctly set in GitHub Secrets
- Verify the token hasn't expired
- Make sure the token has "Automation" permission

### Action fails with "403 Forbidden"

- Ensure you have publish rights to @qiyuey/time-service on npm
- Verify you're logged in as the correct npm user

### Package version already exists

- You can't republish the same version
- Increment the version and try again
- Check npm to see what versions exist

## Rollback

If you need to rollback a release:

```bash
# Deprecate a specific version on npm
npm deprecate @qiyuey/time-service@0.1.2 "This version has issues, use 0.1.1 instead"

# Or unpublish within 72 hours
npm unpublish @qiyuey/time-service@0.1.2
```

Note: Unpublishing is only allowed within 72 hours of publishing.
