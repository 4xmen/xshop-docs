# Project Upgrade Guide

The upgrade process depends on whether you have modified the original project source code.

There are two types of installations:

- **Consumer:** Uses the project without modifying its original source code.
- **Developer:** Extends the project, adds custom functionality, or modifies the source code to meet specific business or client requirements.

The official GitHub repository is the source of truth for all official releases.

## 1\. Upgrading a Consumer Installation

If you are using the original project without custom code changes, you can upgrade according to the instructions provided for the new release.

Before upgrading:

- Back up your database and important files.
- Review the release notes and any potential breaking changes.
- Read the upgrade instructions for the target version.

If the release instructions permit it, run the following commands:



```bash
git pull
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize:clear
php artisn client
pnpm build
```

**Note:** In production, `composer install` is generally preferred because it installs dependencies according to `composer.lock`. Running `composer update` may change dependency versions and should not be used as the default upgrade method.

Some releases may require additional steps. Always follow the instructions provided for the specific release.

## 2\. Upgrading a Developer Installation

If you have modified the project source code or added custom functionality, you must integrate your changes with the new official release.

Examples of customizations include:

- Custom product pricing logic or observers.
- Additional modules, such as automated birthday greetings for customers.
- Custom admin panel or storefront themes.
- Additional languages or modifications to existing translation files.
- Changes to models, controllers, services, views, or migrations.
- Custom features or integrations developed for a specific client.

In these cases, running `git pull` alone may not be sufficient to upgrade your installation.

### Step 1: Fork the Official Repository

Create a fork of the official project repository on GitHub and clone your fork:



```bash
git clone https://github.com/YOUR_USERNAME/PROJECT.git
cd PROJECT
```

Replace the example URL with your actual fork URL.

### Step 2: Configure the Official Repository as Upstream

Run the following commands from your project directory:


```bash
git remote add upstream https://github.com/4xmen/xshop.git
git remote -v
```

Your remotes should be configured as follows:

- `origin`: Your fork on GitHub.
- `upstream`: The official project repository.

### Step 3: Keep Custom Changes in a Separate Branch

We recommend keeping your custom changes in a separate branch and using `master` to track the official project.

For example:

```text
master    # Official project code
custom    # Your custom changes
```

Commit your custom changes and push them to your fork:


```bash
git switch -c custom
git add .
git commit -m "Add custom functionality"
git push -u origin custom
```

#### Already working on `master`?

If you have been developing directly on your `master` branch, you do not need to start over or lose your existing changes.

Before proceeding, inspect your repository and choose the appropriate option.

**Option A: Create a new branch (recommended)**

If your current `master` contains custom changes and has not yet been synchronized with a new official release, create a new branch from its current state:



```bash
git switch master
git switch -c custom
git push -u origin custom
```

Your existing changes will be preserved in `custom`, allowing you to continue development there.

**Option B: Rename your branch**

If your current `master` contains your custom implementation and you no longer intend to use it to track the official project, you can rename it:



```bash
git branch -m master custom
git push -u origin custom
```

This renames your local branch and pushes the renamed branch to your fork. Additional steps may be necessary to update your GitHub repository settings or production server configuration.

**Important:** Do not run these commands without checking your repository first. If your `master` already contains newer official changes, or a `custom` branch already exists, inspect your branches and changes before proceeding. Do not delete your previous branch until you have verified that your custom work is safely preserved.

If you have already made extensive changes, review your Git history and current branch state before reorganizing your branches. Creating a new branch does not automatically separate existing custom commits from official commits.

### Step 4: Fetch the Latest Official Release

Before upgrading, make sure all your custom changes are committed and that you have backed up important data.

Fetch the latest official changes:



```bash
git fetch upstream
```

Synchronize your local `master` branch with the latest official release:



```bash
git switch master
git merge upstream/master
```

**Important:** Use `upstream/master` for regular upgrades. The `dev` branch may contain changes that have not yet been reviewed and released.

### Step 5: Merge the Official Updates into Your Custom Branch

After updating `master`, merge it into your custom branch:



```bash
git switch custom
git merge master
```

If there are no conflicts, Git will complete the merge automatically.

If conflicts occur, inspect each affected file and determine how the official and custom changes should be combined.

After resolving the conflicts, check the repository status:



```bash
git status
```

If the merge is still in progress, stage the resolved files and create the merge commit:



```bash
git add .
git commit -m "Merge upstream updates"
```

If Git has already completed the merge and created the commit automatically, you do not need to create another commit.

**Do not proceed to deployment until the merge has completed successfully and any remaining issues have been resolved.**

### Step 6: Review and Test Your Changes

After merging, review and test your application:



```bash
composer install
php artisan test
```

If automated tests are unavailable, manually verify the application's critical functionality.

Also check the following:

- Compatibility of custom modules, observers, and integrations.
- Custom translation files and themes.
- New migrations and database schema changes.
- Dependency updates and configuration requirements.
- Core store functionality, including order placement, payments, and product management.

Back up your production database before running migrations, and follow the instructions provided for the new release.

### Step 7: Push the Updated Code to Your GitHub Fork

Once you have verified the merge and tested your changes, push the updated custom branch to your fork:



```bash
git push origin custom
```

Your fork now contains the updated official code together with your custom changes.

### Step 8: Update Your Production Server

Connect to your production server and navigate to your project directory.

The following commands assume that your production server already uses your GitHub fork and deploys from the `custom` branch.

Fetch the latest changes:



```bash
git fetch origin
```

Update the production branch:



```bash
git switch custom
git pull --ff-only origin custom
```

After the code has been updated successfully, install dependencies and run the required migrations according to the release instructions:



```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize:clear
php artisn client
pnpm build
```

Finally, verify that the application and its critical functionality are working correctly. Restart queue workers or manage other related services and caches as required by your deployment process.

**Important:** Pushing changes to GitHub does not automatically update your production server. After successfully pushing your changes, you must also deploy them to production.

These commands describe a straightforward Git-based deployment. If your project uses a different deployment process, adapt the commands accordingly.

## 3\. Important Notes About Customizations

### Custom Changes

Custom changes may conflict with changes introduced in newer releases and may require manual review or adjustments.

However, if you encounter problems while merging or upgrading, you can contact the project team through the project's support channels for assistance.

### Translation Files

Modifying original translation files, such as `fa.json` or `ar.json`, may result in merge conflicts or overwritten changes during an upgrade.

New releases may add translation keys, rename existing keys, or update their values.

Whenever possible, use separate custom translation files or a dedicated translation structure to reduce the need to modify original files directly.

### Custom Themes

If you customize the admin panel or storefront theme, keep your changes separate from the original theme whenever possible.

Updates to views, components, styles, or frontend assets may require adjustments to your custom theme.

### Custom Database Migrations

Do not modify previously released core migrations unless explicitly required by the project's official instructions.

Create separate migrations for custom database changes, and verify compatibility before running new migrations in production.

### Developing New Features

To reduce conflicts in future releases, use independent modules, services, observers, events, and other available extension points whenever possible.

Keeping custom functionality separate from the core project makes future upgrades and maintenance easier.

## 4\. Getting Support

If you encounter problems while upgrading or merging custom changes with a new release, you can open an Issue in the official project repository.

Please include the following information to help us investigate:

- Your current version and target version.
- The commands you executed and the steps you followed.
- The complete error message or details of any merge conflicts.
- A description of the custom changes related to the issue.
- Steps to reproduce the problem, if possible.

The project team will review the issue and provide guidance where possible. Because every customized installation may differ, some problems may require changes to the custom code in that installation.

Never share passwords, API keys, access tokens, or other sensitive information.

## Summary

- **Consumer:** Follow the official upgrade instructions for the new release.
- **Developer:** Maintain custom changes in a fork and a separate branch.
- **Get official updates:** Update `master` from `upstream/master` and merge it into your custom branch.
- **After merging:** Review, test, and push the updated code to your GitHub fork.
- **Final deployment:** Update your production server from your own repository.
- **If you encounter problems:** Open an Issue in the official repository and provide the information needed to investigate.