# Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Changed
  * **BREAKING**
    Removed named export that conflicts with default exports in builds.
    See https://github.com/developit/microbundle/issues/306

## [1.3.0] - 2019-01-21

- Add cjsm and esm builds.

## [1.2.1] - 2019-01-21

- Fix tree shaking issue by removing lodash dependency.
  See [#5](https://github.com/cr0cK/superpathjoin/pull/5) for details.

- Fix returned path when no args are passed.

## [1.2.0] - 2019-01-20

### Added

- Rewrite the library in Typescript.
- Add Typescript declarations.
- Add Flow declarations.

## [1.1.1] - 2017-10-22

### Fixed

- Use lodash specific imports.

## [1.1.0] - 2016-06-24

### Added

- Do not replace '://' in urls.

## [1.0.1] - 2016-06-24

### Fixed

- Fix main script export.

## 1.0.0 - 2016-06-24

### Added

- Initial release.
