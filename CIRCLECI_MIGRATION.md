# CircleCI to GitHub Actions Migration Guide

This guide explains how to migrate from CircleCI to GitHub Actions for the Hyouji project.

## Overview

The project has been migrated from CircleCI to GitHub Actions to provide:

- Better integration with GitHub repository features
- Simplified configuration and maintenance
- Automated npm publishing on releases
- Modern Node.js version support (Node.js 22)
- Enhanced security with GitHub secrets

## Comparison: CircleCI vs GitHub Actions

### CircleCI Configuration (Old)

- **File**: `.circleci/config.yml`
- **Node.js Versions**: 10, 12, latest (outdated versions)
- **Triggers**: All commits and PRs
- **Features**:
  - Multi-version Node.js testing
  - Dependency caching
  - Test execution with coverage
  - Coverage reporting to external service

### GitHub Actions Configuration (New)

- **Files**:
  - `.github/workflows/ci.yml` (Continuous Integration)
  - `.github/workflows/publish.yml` (Continuous Deployment)
- **Node.js Version**: 22 (current LTS)
- **Triggers**:
  - CI: Push and pull requests
  - CD: Release publication
- **Features**:
  - Modern Node.js version
  - Dependency caching
  - Comprehensive testing and linting
  - Automated npm publishing
  - Build verification
  - Security-focused design

## Migration Steps

### Step 1: Verify GitHub Actions Setup

Ensure the following files exist and are properly configured:

1. **CI Workflow**: `.github/workflows/ci.yml`
2. **CD Workflow**: `.github/workflows/publish.yml`
3. **NPM Token**: Repository secret `NPM_TOKEN` configured

### Step 2: Test GitHub Actions Workflows

Before disabling CircleCI, verify GitHub Actions work correctly:

1. **Test CI Workflow**:

   ```bash
   # Create a test branch and push changes
   git checkout -b test-github-actions
   git commit --allow-empty -m "Test GitHub Actions CI"
   git push origin test-github-actions
   ```

   - Verify the CI workflow runs successfully
   - Check that all tests pass
   - Confirm build verification works

2. **Test CD Workflow** (optional):

   ```bash
   # Create a test release (can be deleted later)
   git tag v1.0.0-test
   git push origin v1.0.0-test
   # Create release from GitHub UI or CLI
   ```

   - Verify the publish workflow triggers
   - Check npm authentication works
   - Confirm package builds successfully

### Step 3: Disable CircleCI

Once GitHub Actions are verified to work correctly:

1. **Stop Following Project in CircleCI**:
   - Go to [CircleCI Dashboard](https://app.circleci.com/)
   - Navigate to your project
   - Click "Project Settings"
   - Select "Stop Building" or "Unfollow Project"

2. **Remove CircleCI Configuration** (optional):

   ```bash
   # Remove CircleCI configuration directory
   rm -rf .circleci

   # Commit the removal
   git add .
   git commit -m "Remove CircleCI configuration - migrated to GitHub Actions"
   git push origin main
   ```

### Step 4: Update Repository Settings

1. **Branch Protection Rules**:
   - Go to repository Settings → Branches
   - Update branch protection rules to require GitHub Actions status checks
   - Remove any CircleCI status check requirements

2. **Repository Badges**:
   - Update README.md badges to point to GitHub Actions (already done)
   - Remove any CircleCI badges from documentation

## Feature Mapping

| CircleCI Feature      | GitHub Actions Equivalent   | Notes                        |
| --------------------- | --------------------------- | ---------------------------- |
| Multi-version testing | Single version (Node.js 22) | Simplified to current LTS    |
| `npm test`            | `npm test`                  | Same test execution          |
| `npm run cov:send`    | Built-in coverage           | Coverage handled by workflow |
| `npm run cov:check`   | Coverage validation         | Integrated into CI           |
| Dependency caching    | `actions/setup-node` cache  | Automatic npm cache          |
| Manual triggers       | `workflow_dispatch`         | Manual workflow execution    |
| N/A                   | Automated publishing        | New CD capability            |

## Key Improvements

### 1. Simplified Node.js Strategy

- **Before**: Testing on Node.js 10, 12, and latest
- **After**: Single Node.js 22 version for consistency and modern features

### 2. Enhanced Security

- **Before**: No automated publishing
- **After**: Secure npm token management with GitHub secrets

### 3. Better Integration

- **Before**: External CI service
- **After**: Native GitHub integration with status checks and PR comments

### 4. Automated Publishing

- **Before**: Manual npm publishing
- **After**: Automatic publishing on GitHub releases

## Rollback Procedures

If issues arise with GitHub Actions, you can quickly rollback:

### Emergency Rollback

1. **Re-enable CircleCI**:

   ```bash
   # Restore CircleCI configuration
   git checkout HEAD~1 -- .circleci/
   git commit -m "Emergency rollback: restore CircleCI"
   git push origin main
   ```

2. **Follow Project in CircleCI**:
   - Go to CircleCI dashboard
   - Add project back
   - Verify builds are working

### Gradual Rollback

1. **Run Both Systems in Parallel**:
   - Keep both CircleCI and GitHub Actions active
   - Compare results between systems
   - Gradually shift confidence to the working system

2. **Update Branch Protection**:
   - Require both CircleCI and GitHub Actions status checks
   - Remove the failing system once the other is stable

## Troubleshooting

### GitHub Actions Not Running

- Check workflow file syntax with GitHub's workflow validator
- Verify repository permissions for Actions
- Check if Actions are enabled in repository settings

### NPM Publishing Failures

- Verify NPM_TOKEN secret is correctly configured
- Check token permissions and expiration
- See [NPM_TOKEN_SETUP.md](./NPM_TOKEN_SETUP.md) for detailed troubleshooting

### Test Failures

- Compare test results between CircleCI and GitHub Actions
- Check for Node.js version-specific issues
- Verify all dependencies are properly installed

## Benefits of Migration

1. **Cost Efficiency**: GitHub Actions included with GitHub repositories
2. **Better Integration**: Native GitHub features and UI integration
3. **Modern Tooling**: Latest Node.js versions and GitHub features
4. **Automated Publishing**: Streamlined release process
5. **Enhanced Security**: Built-in secret management
6. **Simplified Maintenance**: Single platform for code and CI/CD

## Support

If you encounter issues during migration:

- Check GitHub Actions documentation: https://docs.github.com/en/actions
- Review workflow logs in the Actions tab
- Compare with working examples in the repository
- Consider running both systems in parallel during transition

## Post-Migration Checklist

- [ ] GitHub Actions CI workflow running successfully
- [ ] GitHub Actions CD workflow tested (if applicable)
- [ ] NPM_TOKEN secret configured and working
- [ ] Branch protection rules updated
- [ ] CircleCI project stopped/unfollowed
- [ ] CircleCI configuration removed (optional)
- [ ] Documentation updated
- [ ] Team notified of the change
