# superpathjoin

path.join on steroïds.

## Usage

```
import { superpathjoin } from 'superpathjoin';
superpathjoin('path', 'to', 'assets');

=> "path/to/assets"
```

## Tests results

```
superpathjoin
  ✓ should join parts
  ✓ should cast parts to string
  ✓ should join with deduplicate slashes
  ✓ should keep the last slash
  ✓ should return an absolute path if the last arg is true
  ✓ should remove the first slash if the last arg is false
  ✓ should filter empty values
  ✓ should trim args
  ✓ should handle "../" relative parts
  ✓ should not replace "://"
```

