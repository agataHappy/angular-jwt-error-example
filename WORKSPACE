# WARNING: This file is generated and it's not meant to be edited.
# Before making any changes, please read Bazel documentation.
# https://docs.bazel.build/versions/master/be/workspace.html
# The WORKSPACE file tells Bazel that this directory is a "workspace", which is like a project root.
# The content of this file specifies all the external dependencies Bazel needs to perform a build.

####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(
    name = "project",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "f9e7b9f42ae202cc2d2ce6d698ccb49a9f7f7ea572a78fd451696d03ef2ee116",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.6.0/rules_nodejs-1.6.0.tar.gz"],
)

# Rules for compiling sass
http_archive(
    name = "io_bazel_rules_sass",
    sha256 = "c78be58f5e0a29a04686b628cf54faaee0094322ae0ac99da5a8a8afca59a647",
    strip_prefix = "rules_sass-1.25.0",
    urls = [
        "https://github.com/bazelbuild/rules_sass/archive/1.25.0.zip",
        "https://mirror.bazel.build/github.com/bazelbuild/rules_sass/archive/1.25.0.zip",
    ],
)

####################################
# Load and install our dependencies downloaded above.

load("@build_bazel_rules_nodejs//:index.bzl", "check_bazel_version", "node_repositories",
    "yarn_install")
check_bazel_version(
    message = """
You no longer need to install Bazel on your machine.
Your project should have a dependency on the @bazel/bazel package which supplies it.
Try running `yarn bazel` instead.
    (If you did run that, check that you've got a fresh `yarn install`)

""",
    minimum_bazel_version = "0.27.0",
)

# Setup the Node repositories. We need a NodeJS version that is more recent than v10.15.0
# because "selenium-webdriver" which is required for "ng e2e" cannot be installed.
# TODO: remove the custom repositories once "rules_nodejs" supports v12.14.1 by default.
node_repositories(
    node_repositories = {
        "12.14.1-darwin_amd64": ("node-v12.14.1-darwin-x64.tar.gz", "node-v12.14.1-darwin-x64", "0be10a28737527a1e5e3784d3ad844d742fe8b0718acd701fd48f718fd3af78f"),
        "12.14.1-linux_amd64": ("node-v12.14.1-linux-x64.tar.xz", "node-v12.14.1-linux-x64", "07cfcaa0aa9d0fcb6e99725408d9e0b07be03b844701588e3ab5dbc395b98e1b"),
        "12.14.1-windows_amd64": ("node-v12.14.1-win-x64.zip", "node-v12.14.1-win-x64", "1f96ccce3ba045ecea3f458e189500adb90b8bc1a34de5d82fc10a5bf66ce7e3"),
    },
    node_version = "12.14.1",
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

load("@npm_bazel_protractor//:package.bzl", "npm_bazel_protractor_dependencies")
npm_bazel_protractor_dependencies()

load("@npm_bazel_karma//:package.bzl", "npm_bazel_karma_dependencies")
npm_bazel_karma_dependencies()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")
web_test_repositories()

load("@io_bazel_rules_webtesting//web/versioned:browsers-0.3.2.bzl", "browser_repositories")
browser_repositories(chromium = True)

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()

load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
sass_repositories()
